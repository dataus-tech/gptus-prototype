import React, { useState, useEffect } from 'react';
import UserService from 'app/services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { reset } from 'app/slices/auth';

import FormField from 'app/components/FormField/FormField';

import { editProfile } from 'app/slices/auth';
import { clearMessage } from 'app/slices/message';

import 'app/pages/Settings/Settings.css';

const Settings = () => {
  const accessToken = localStorage.getItem('accessToken');
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken && isLoggedIn) {
      UserService.getUserProfile(accessToken).catch(() => {
        window.location.reload();
      });
    }
  }, [isLoggedIn, accessToken]);

  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const email = user?.email;
  const username = user?.username;
  const name = user?.name;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && !accessToken) {
      dispatch(reset());
    }
  }, [dispatch, isLoggedIn, accessToken]);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    profileImg: '',
    username: username || name,
    shortBio: '',
    email,
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  });

  const handleEditProfile = (formValue) => {
    const { username, password } = formValue;

    setLoading(true);

    dispatch(editProfile({ username, password, accessToken }))
      .unwrap()
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (!isLoggedIn && !accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="settings-container">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleEditProfile}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group">
                    <FormField
                      placeholder="Profile Image"
                      name="profileImg"
                      type="text"
                      errors={errors}
                      touched={touched}
                      disabled
                    />

                    <FormField
                      placeholder="Username"
                      name="username"
                      type="text"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      placeholder="Short bio about you"
                      name="shortBio"
                      type="text"
                      errors={errors}
                      touched={touched}
                      disabled
                      as="textarea"
                    />
                    <FormField
                      placeholder="Email"
                      name="email"
                      type="text"
                      errors={errors}
                      touched={touched}
                      disabled
                    />
                    <FormField
                      placeholder="Password"
                      name="password"
                      type="password"
                      errors={errors}
                      touched={touched}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={loading}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Update Settings</span>
                    </button>
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
    </div>
  );
};

export default Settings;
