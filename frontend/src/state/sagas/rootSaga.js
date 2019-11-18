import { all, fork } from 'redux-saga/effects';

import { userSaga } from './userSaga';
import { questionsSaga } from './questionsSaga';
import { sessionsSaga } from './sessionsSaga';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(questionsSaga), fork(sessionsSaga)]);
}
