import {
  VERIFY_USER,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILED,
  DISPLAY_USER_ERROR,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAILED,
  SIGN_OUT,
  SUBMIT_PASSWORD,
  SUBMIT_PASSWORD_SUCCESS,
  SUBMIT_PASSWORD_FAILED,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  HIDE_SIGNUP_ERROR,
  CREATE_UNAUTHORIZED_USER,
} from '../actionTypes/user';

const initialState = {
  user: undefined,
  signInError: undefined,
  emailError: undefined,
  restorePasswordSuccess: undefined,
  isLoading: undefined,
  passwordError: undefined,
  signUpError: undefined,
  createStatus: undefined,
  isAdmin: undefined,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_UNAUTHORIZED_USER: {
      return { ...state, user: 'unauthorized' };
    }
    case SUBMIT_PASSWORD: {
      return {
        ...state,
        passwordError: undefined,
        isLoading: true,
      };
    }
    case SUBMIT_PASSWORD_FAILED: {
      return {
        ...state,
        passwordError: true,
        isLoading: undefined,
      };
    }
    case SUBMIT_PASSWORD_SUCCESS: {
      return {
        ...state,
        user: 'tempUser',
        isLoading: undefined,
      };
    }
    case VERIFY_USER: {
      return {
        ...state,
        emailError: undefined,
        signInError: undefined,
        restorePassword: undefined,
      };
    }
    case VERIFY_USER_SUCCESS: {
      return {
        ...state,
        user: 'tempAdmin',
        isAdmin: true,
        signInError: undefined,
        emailError: undefined,
      };
    }
    case VERIFY_USER_FAILED: {
      return { ...state, signInError: true, isLoading: undefined };
    }

    case HIDE_SIGNUP_ERROR: {
      return { ...state, signUpError: undefined };
    }
    case CREATE_USER: {
      return { ...state, isLoading: true, signUpError: undefined };
    }

    case VERIFY_EMAIL: {
      return {
        ...state,
        emailError: undefined,
        signInError: undefined,
        restorePasswordSuccess: undefined,
      };
    }

    case VERIFY_EMAIL_SUCCESS: {
      return { ...state, restorePasswordSuccess: true };
    }

    case VERIFY_EMAIL_FAILED: {
      return { ...state, emailError: true };
    }

    case DISPLAY_USER_ERROR: {
      return { ...state, signInError: true };
    }

    case CREATE_USER_SUCCESS: {
      return { ...state, user: 'tempUser', isAdmin: false, signUpError: undefined };
    }

    case CREATE_USER_FAILED: {
      return { ...state, signUpError: true, isLoading: undefined };
    }

    case SIGN_OUT: {
      return {
        ...state,
        user: undefined,
        signInError: undefined,
        emailError: undefined,
        restorePassword: undefined,
        signUpError: undefined,
        isLoading: undefined,
        isAdmin: undefined,
      };
    }

    default: {
      return state;
    }
  }
}
