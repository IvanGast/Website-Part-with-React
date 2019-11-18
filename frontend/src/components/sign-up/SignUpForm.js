import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Formik } from 'formik';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createUser, hideSignUpError } from '../../state/actions/user';
import {
  passwordValidation,
  emailValidation,
  nicknameValidation,
  nicknameLengthValidation,
  emailTypeValidation,
  whitespaceValidation,
  passwordLengthValidation,
  passwordsMatchValidation,
  passwordContainValidation,
} from '../../common/TextFieldValidation';
import FormError from '../components/FormError';

const SignUpForm = () => {
  const [localError, setLocalError] = React.useState(false);
  const error = useSelector((store) => store.user.signUpError);
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    if (user) {
      history.push('/questions/1');
    }
  }, [history, user]);

  const verifyForm = (nickname, email, passwordOne, passwordTwo) => {
    if (
      nicknameValidation(nickname) &&
      emailValidation(email) &&
      passwordValidation(passwordOne) &&
      passwordsMatchValidation(passwordOne, passwordTwo)
    ) {
      setLocalError(false);
      submit(nickname, email, passwordOne);
    } else {
      if (error) {
        dispatch(hideSignUpError());
      }
      setLocalError(true);
    }
  };

  const redirect = () => {
    history.push('/questions/1');
  };

  const submit = (nickname, email, password) => {
    const formData = {
      nickname,
      email,
      password,
    };
    dispatch(createUser(formData, redirect));
  };

  const nicknameError = (nickname) => {
    if (!whitespaceValidation(nickname)) {
      return <FormError message={'Whitespaces are not allowed'} />;
    }
    if (!nicknameLengthValidation(nickname)) {
      return <FormError message={'Must be at least 5 characters long'} />;
    }
  };

  const emailError = (email) => {
    if (!whitespaceValidation(email)) {
      return <FormError message={'Whitespaces are not allowed'} />;
    }
    if (!emailTypeValidation(email)) {
      return <FormError message={'Must be a valid email'} />;
    }
  };

  const firstPasswordError = (password) => {
    if (!passwordContainValidation(password)) {
      return <FormError message={'Password must contain at least 1 letter and 1 number'} />;
    }
    if (!whitespaceValidation(password)) {
      return <FormError message={'Whitespaces are not allowed'} />;
    }
    if (!passwordLengthValidation(password)) {
      return <FormError message={'Must be at least 8 characters long'} />;
    }
  };

  const secondPasswordError = (passwordOne, passwordTwo) => {
    if (!passwordsMatchValidation(passwordOne, passwordTwo)) {
      return <FormError message={'Passwords must match'} />;
    }
  };

  return (
    <Container maxWidth="sm">
      <Card
        style={{ borderRadius: '20px', padding: '20px', marginBottom: '20px', marginTop: '20px' }}
      >
        <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>Sign up</h1>
        <Formik
          initialValues={{ nickname: '', email: '', passwordOne: '', passwordTwo: '' }}
          onSubmit={(values) => {
            verifyForm(values.nickname, values.email, values.passwordOne, values.passwordTwo);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                name="nickname"
                variant="outlined"
                placeholder="Nickname *"
                helperText="Minimum 5 characters"
                style={{ marginTop: '20px' }}
                value={values.nickname}
                onChange={handleChange}
              />
              {localError && nicknameError(values.nickname)}
              <TextField
                required
                name="email"
                fullWidth
                variant="outlined"
                placeholder="Email *"
                helperText="Must be not already in use"
                style={{ marginTop: '20px' }}
                value={values.email}
                onChange={handleChange}
              />
              {localError && emailError(values.email)}
              <TextField
                required
                fullWidth
                name="passwordOne"
                variant="outlined"
                placeholder="Password *"
                type="password"
                helperText="Minimum 8 characters"
                style={{ marginTop: '20px' }}
                value={values.passwordOne}
                onChange={handleChange}
              />
              {localError && firstPasswordError(values.passwordOne)}
              <TextField
                required
                fullWidth
                name="passwordTwo"
                variant="outlined"
                placeholder="Repeat password *"
                type="password"
                style={{ marginTop: '20px' }}
                value={values.passwordTwo}
                onChange={handleChange}
              />
              {localError && secondPasswordError(values.passwordOne, values.passwordTwo)}
              <Button
                type="submit"
                style={{ marginTop: '20px' }}
                fullWidth
                size="medium"
                variant="contained"
                color="primary"
              >
                SIGN UP
              </Button>
              {localError && (
                <FormError Tag={'h2'} message={'Please correct any invalid fields and try again'} />
              )}
              {error && <FormError Tag={'h2'} message={'Sign up failed'} />}
            </form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};
export default SignUpForm;
