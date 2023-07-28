import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './DummyLoginModal.css';
import { clearMessage } from 'app/slices/message';
import FormField from '../FormField/FormField';
import { Form, Formik } from 'formik';
import { login, socialLogin } from 'app/slices/auth';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { AppDispatch } from 'app/store';

interface LoginModalProps {
  isOpen: boolean;
  setIsDummyLoggedIn: Dispatch<SetStateAction<boolean>>;
  close: () => void;
}

interface MessageType {
  message: {
    message: string;
  };
}

const DummyLoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  close,
  setIsDummyLoggedIn,
}) => {
  const navigate = useNavigate();

  const searchParams = useLocation().search;
  const query = qs.parse(searchParams);
  const {
    accessToken: accessTokenFromSocialLogin,
    refreshToken: refreshTokenFromSocialLogin,
  } = query;

  const { message } = useSelector((state: MessageType) => state.message);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(clearMessage());
    if (query.accessToken) {
      localStorage.setItem('accessToken', accessTokenFromSocialLogin as string);
      localStorage.setItem(
        'refreshToken',
        refreshTokenFromSocialLogin as string,
      );
      dispatch(socialLogin(query.accessToken));
    }
  }, [
    dispatch,
    accessTokenFromSocialLogin,
    refreshTokenFromSocialLogin,
    query.accessToken,
  ]);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('이메일을 입력해주세요.'),
    password: Yup.string()
      .required('비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 최소 8자리 이상 입력해주세요.')
      .test(
        'password',
        '비밀번호는 문자, 숫자, 특수문자를 모두 포함해야 합니다.',
        (value: string) => {
          const optionalSpeciesCount = [
            /[A-Z]/.test(value),
            /[a-z]/.test(value),
            /[\u3131-\uD79D]/.test(value),
          ].filter(Boolean).length;

          const essentialSpeciesCount = [
            /[@$!%*?&]/.test(value),
            /\d/.test(value),
          ].filter(Boolean).length;

          return optionalSpeciesCount >= 1 && essentialSpeciesCount === 2;
        },
      ),
  });

  const isObjectEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  function hasEmptyString(obj: any) {
    for (const key in obj) {
      if (obj.prototype?.hasOwnProperty.call(key) && obj[key] === '') {
        return true;
      }
    }
    return false;
  }

  const handleLogin = (
    formValue: { email: string; password: string },
    errors: any,
  ) => {
    setIsDummyLoggedIn(true);
    navigate('/');
    close();
    // const { email, password } = formValue;
    // if (!isObjectEmpty(errors) && !hasEmptyString(formValue)) {
    //   dispatch(login({ email, password }))
    //     .unwrap()
    //     .then(() => {
    //       navigate('/');
    //       close();
    //     })
    //     .catch((err: any) => console.log(err));
    // }
  };

  return (
    <>
      {isOpen ? (
        <div className="modal">
          <div className="loginModal">
            <span className="close" onClick={close}>
              &times;
            </span>
            <div className="modalContents">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ values, errors, touched }) => (
                  <Form>
                    <div className="login-container">
                      <h1>로그인하기</h1>
                      <FormField
                        placeholder="아이디"
                        name="email"
                        type="text"
                        errors={errors}
                        touched={touched}
                      />
                      <FormField
                        placeholder="비밀번호"
                        name="password"
                        type="password"
                        errors={errors}
                        touched={touched}
                      />
                    </div>

                    <div className="loginMid">
                      <label className="saveId" htmlFor="hint">
                        <input type="checkbox" id="saveId" /> 아이디 저장
                      </label>
                      <div className="text-xs-center find">
                        <Link to="/findId" onClick={close}>
                          아이디 찾기
                        </Link>
                        <div className="middleLine">|</div>
                        <Link to="/findPw" onClick={close}>
                          비밀번호 찾기
                        </Link>
                      </div>
                    </div>

                    <div className="loginRegisterBox">
                      <button
                        onClick={() => handleLogin(values, errors)}
                        className="form-group btn btn-lg btn-primary pull-xs-right loginBtn"
                      >
                        <span>로그인하기</span>
                      </button>
                      <p className="text-xs-center register">
                        <Link to="/register" onClick={close}>
                          회원가입하기
                        </Link>
                      </p>
                    </div>

                    <div className="socialBox">
                      <div className="socialHeader">
                        <div className="line"></div>
                        <div className="socialText">간편 SNS 로그인하기</div>
                        <div className="line"></div>
                      </div>
                      <div className="kakao">
                        <img
                          className="kakaoLogo"
                          src="/images/kakao.png"
                          alt="kakao Logo"
                        />
                        <div className="kakaoText">카카오로 시작하기</div>
                      </div>
                      <div className="google">
                        <img
                          className="googleLogo"
                          src="/images/google.png"
                          alt="Google Logo"
                        />
                        <div className="googleText">Sign in with Google</div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DummyLoginModal;
