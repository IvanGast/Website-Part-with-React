import { combineReducers } from 'redux';

import snackbar from './snackbar';
import questions from './questions';
import user from './user';
import sessions from './sessions';

export default combineReducers({
  snackbar,
  questions,
  user,
  sessions,
});
