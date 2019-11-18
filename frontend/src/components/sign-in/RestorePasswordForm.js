import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Formik } from 'formik';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormError from '../components/FormError';
import { submitPassword } from '../../state/actions/user';
import {
  passwordValidation,
  passwordsMatchValidation,
  whitespaceValidation,
  passwordLengthValidation,
  passwordContainValidation,
} from '../../common/TextFieldValidation';

const RestorePasswordForm = () => {
  const [localError, setLocalError] = React.useState(false);
  const passwordError = useSelector((store) => store.user.passwordError);
  const dispatch = useDispatch();
  const history = useHistory();

  const verifyPassword = (firstPassword, secondPassword) => {
    if (
      passwordValidation(firstPassword) &&
      passwordsMatchValidation(firstPassword, secondPassword)
    ) {
      setLocalError(false);
      submit(firstPassword);
    } else {
      setLocalError(true);
    }
  };

  function redirect() {
    history.push('/questions/0');
  }

  const submit = (password) => {
    dispatch(submitPassword(password, redirect));
  };

  const firstPasswordError = (firstPassword) => {
    if (!passwordContainValidation(firstPassword)) {
      return <FormError message={'Password must contain at least 1 letter and 1 number'} />;
    }
    if (!whitespaceValidation(firstPassword)) {
      return <FormError message={'Whitespaces are not allowed'} />;
    }
    if (!passwordLengthValidation(firstPassword)) {
      return <FormError message={'Must be at least 8 characters long'} />;
    }
  };

  const secondPasswordError = (firstPassword, secondPassword) => {
    if (!passwordsMatchValidation(firstPassword, secondPassword)) {
      return <FormError message={'Passwords must match'} />;
    }
  };

  return (
    <Container maxWidth="sm">
      <Card
        style={{ borderRadius: '20px', padding: '20px', marginTop: '20px', marginBottom: '20px' }}
      >
        <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>
          Restore password
        </h1>
        <Formik
          initialValues={{ passwordOne: '', passwordTwo: '' }}
          onSubmit={(values) => {
            verifyPassword(values.passwordOne, values.passwordTwo);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                name="passwordOne"
                variant="outlined"
                placeholder="Password"
                helperText="Minimum 8 characters long"
                type="password"
                value={values.passwordOne}
                onChange={handleChange}
              />
              {localError && firstPasswordError(values.passwordOne)}
              <TextField
                fullWidth
                required
                name="passwordTwo"
                variant="outlined"
                placeholder="Repeat password"
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
                SUBMIT
              </Button>
              {localError && (
                <FormError Tag={'h2'} message={'Please correct all incorrect fields'} />
              )}
              {passwordError && <FormError Tag={'h2'} message={`Couldn't connect to server`} />}
            </form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};
export default RestorePasswordForm;
