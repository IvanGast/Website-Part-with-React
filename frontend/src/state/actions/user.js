import {
  VERIFY_USER,
  SIGN_OUT,
  VERIFY_EMAIL,
  SUBMIT_PASSWORD,
  CREATE_USER,
  HIDE_SIGNUP_ERROR,
} from '../actionTypes/user';

export const verifyUser = (user, callback) => ({
  type: VERIFY_USER,
  user,
  callback,
});
export const hideSignUpError = () => ({
  type: HIDE_SIGNUP_ERROR,
});
export const createUser = (user, callback) => ({
  type: CREATE_USER,
  user,
  callback,
});
export const signOut = () => ({
  type: SIGN_OUT,
});
export const verifyEmail = (email) => ({
  type: VERIFY_EMAIL,
  email,
});
export const submitPassword = (password, callbackAction) => ({
  type: SUBMIT_PASSWORD,
  password,
  callbackAction,
});
