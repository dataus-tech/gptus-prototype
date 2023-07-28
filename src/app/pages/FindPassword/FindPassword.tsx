import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { clearMessage } from 'app/slices/message';

import FormField from 'app/components/FormField/FormField';
import 'app/pages/FindPassword/FindPassword.css';

interface MessageType {
  message: {
    message: string;
  };
}

const FindPassword = () => {
  const { message } = useSelector((state: MessageType) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    phoneNumber: '',
    email: '',
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('휴대폰 번호를 입력해주세요.')
      .matches(
        /^(010)[0-9]{3,4}[0-9]{4}$/,
        '유효하지 않은 휴대폰 번호 형식입니다.',
      ),
    email: Yup.string()
      .email('이메일 형식에 맞지 않습니다.')
      .required('이메일을 입력해주세요.'),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={() => {}}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="find-pw-container">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h2 className="text-xs-left">휴대폰 번호로 비밀번호 찾기</h2>
                <FormField
                  label="휴대폰 번호"
                  placeholder="휴대폰 번호를 입력해주세요."
                  name="phoneNumber"
                  type="text"
                  errors={errors}
                  touched={touched}
                />
                <div className="form-group">
                  <button className="btn btn-lg btn-primary pull-xs-right">
                    <span>비밀번호 찾기</span>
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={() => {}}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="find-pw-container second">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h2 className="text-xs-left">이메일로 비밀번호 찾기</h2>
                <FormField
                  label="이메일"
                  placeholder="이메일을 입력해주세요."
                  name="email"
                  type="text"
                  errors={errors}
                  touched={touched}
                />
                <div className="form-group">
                  <button className="btn btn-lg btn-primary pull-xs-right">
                    <span>비밀번호 찾기</span>
                  </button>
                </div>
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
  );
};

export default FindPassword;
