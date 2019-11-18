import { SHOW_SNACKBAR, CLOSE_SNACKBAR } from '../actionTypes/snackbar';

export const showSnackbar = (message) => ({
  type: SHOW_SNACKBAR,
  message: message,
});
export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});
