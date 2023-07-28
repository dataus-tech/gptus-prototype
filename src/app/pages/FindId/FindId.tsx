import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { clearMessage } from 'app/slices/message';

import FormField from 'app/components/FormField/FormField';
import 'app/pages/FindId/FindId.css';

interface MessageType {
  message: {
    message: string;
  };
}

const FindId = () => {
  const { message } = useSelector((state: MessageType) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    phoneNumber: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('휴대폰 번호를 입력해주세요.')
      .matches(
        /^(010)[0-9]{3,4}[0-9]{4}$/,
        '유효하지 않은 휴대폰 번호 형식입니다.',
      ),
    password: Yup.string()
      .required('비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 최소 8자리 이상 입력해주세요.')
      .test(
        'password',
        '비밀번호는 문자, 숫자, 특수문자를 모두 포함해야 합니다.',
        (value) => {
          const optionalSpeciesCount = [
            /[A-Z]/.test(value),
            /[a-z]/.test(value),
            /[\u3131-\uD79D]/.test(value),
          ].filter(Boolean)?.length;

          const essentialSpeciesCount = [
            /[@$!%*?&]/.test(value),
            /\d/.test(value),
          ].filter(Boolean)?.length;

          return optionalSpeciesCount >= 1 && essentialSpeciesCount === 2;
        },
      ),
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
            <div className="find-id-container">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h2 className="text-xs-left">휴대폰 번호로 아이디 찾기</h2>
                <FormField
                  label="휴대폰 번호"
                  placeholder="휴대폰 번호를 입력해주세요."
                  name="phoneNumber"
                  type="text"
                  errors={errors}
                  touched={touched}
                />
                <FormField
                  label="비밀번호"
                  placeholder="문자, 숫자, 특수문자를 모두 포함시켜주세요."
                  name="password"
                  type="password"
                  errors={errors}
                  touched={touched}
                />
                <div className="form-group">
                  <button className="btn btn-lg btn-primary pull-xs-right">
                    <span>아이디 찾기</span>
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

export default FindId;
