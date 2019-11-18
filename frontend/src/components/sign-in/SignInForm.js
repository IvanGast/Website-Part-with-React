import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Formik } from 'formik';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { verifyUser, verifyEmail } from '../../state/actions/user';
import { passwordValidation, emailValidation } from '../../common/TextFieldValidation';
import FormError from '../components/FormError';

const SignInForm = () => {
  const [localSignInError, setLocalSignInError] = React.useState(false);
  const [localEmailError, setLocalEmailError] = React.useState(false);
  const restorePasswordSuccess = useSelector((store) => store.user.restorePasswordSuccess);
  const emailError = useSelector((store) => store.user.emailError);
  const signInError = useSelector((store) => store.user.signInError);
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push('/questions/0');
    }
  }, [history, user]);

  const verifyForm = (email, password) => {
    if (emailValidation(email) && passwordValidation(password)) {
      setLocalSignInError(false);
      setLocalEmailError(false);
      submit();
    } else {
      setLocalSignInError(true);
      setLocalEmailError(false);
    }
  };

  const verifyEmailForm = (email) => {
    if (emailValidation(email)) {
      setLocalSignInError(false);
      setLocalEmailError(false);
      submitEmail(email);
    } else {
      setLocalSignInError(false);
      setLocalEmailError(true);
    }
  };

  const submitEmail = (email) => {
    dispatch(verifyEmail(email));
  };

  const redirect = () => {
    history.push('/qa-sessions');
  };

  const submit = (email, password) => {
    const formData = {
      email,
      password,
    };
    dispatch(verifyUser(formData, redirect));
  };

  return (
    <Container maxWidth="sm">
      <Card
        style={{ borderRadius: '20px', padding: '20px', marginBottom: '20px', marginTop: '20px' }}
      >
        <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>Sign in</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            verifyForm(values.email, values.password);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                name="email"
                variant="outlined"
                placeholder="Email"
                value={values.email}
                style={{ marginBottom: '20px', marginTop: '20px' }}
                onChange={handleChange}
              />
              <TextField
                required
                fullWidth
                name="password"
                variant="outlined"
                placeholder="Password"
                type="password"
                value={values.password}
                style={{ marginBottom: '20px' }}
                onChange={handleChange}
              />
              <Button type="submit" fullWidth size="medium" variant="contained" color="primary">
                SIGN IN
              </Button>
              {(signInError || localSignInError) && (
                <FormError Tag={'h2'} message={'Sign in failed'} />
              )}
              <Button
                style={{ marginTop: '20px' }}
                fullWidth
                size="medium"
                variant="contained"
                color="primary"
                onClick={() => {
                  if (values.email !== '') {
                    verifyEmailForm(values.email);
                  } else {
                    setLocalEmailError(true);
                  }
                }}
              >
                FORGOT YOUR PASSWORD?
              </Button>
            </form>
          )}
        </Formik>
        {(emailError || localEmailError) && (
          <FormError Tag={'h2'} message={'Email must be valid'} />
        )}
        {restorePasswordSuccess && (
          <h2 style={{ color: 'green', textAlign: 'center', marginBottom: '0px' }}>
            Email has been sent
          </h2>
        )}
      </Card>
    </Container>
  );
};

export default SignInForm;
