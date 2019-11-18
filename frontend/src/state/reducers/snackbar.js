import { SHOW_SNACKBAR, CLOSE_SNACKBAR } from '../actionTypes/snackbar';

const initialState = {
  open: false,
  message: '',
};

export default function snackbarReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_SNACKBAR: {
      return { ...state, open: true, message: action.message };
    }
    case CLOSE_SNACKBAR: {
      return { ...state, open: false, message: '' };
    }
    default: {
      return state;
    }
  }
}
