import { put, call, all, takeLatest } from 'redux-saga/effects';

import {
  VERIFY_USER,
  VERIFY_USER_FAILED,
  VERIFY_USER_SUCCESS,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILED,
  SUBMIT_PASSWORD,
  SUBMIT_PASSWORD_SUCCESS,
  SUBMIT_PASSWORD_FAILED,
  CREATE_USER,
  CREATE_USER_FAILED,
  CREATE_USER_SUCCESS,
} from '../actionTypes/user';

import { RESPONSE_STATUS, postRequest } from '../../common/ApiRequests';

function* verifyUser(action) {
  const { status, data } = yield postRequest('users', action.user);
  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: VERIFY_USER_SUCCESS, user: data });
      yield call(action.callback);
      break;
    default:
      yield put({ type: VERIFY_USER_FAILED });
  }
}

function* verifyEmail(action) {
  const { status } = yield postRequest('users/email', action.email);
  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: VERIFY_EMAIL_SUCCESS });
      break;
    default:
      yield put({ type: VERIFY_EMAIL_FAILED });
  }
}

function* submitPassword(action) {
  const { status, data } = yield postRequest('users/password', action.password);
  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: SUBMIT_PASSWORD_SUCCESS, user: data });
      break;
    default:
      yield put({ type: SUBMIT_PASSWORD_FAILED });
  }
}

function* createUser(action) {
  const { status, data } = yield postRequest('users', action.user);
  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: CREATE_USER_SUCCESS, user: data });
      yield call(action.callback);
      break;
    default:
      yield put({ type: CREATE_USER_FAILED });
  }
}

function* actionWatcher() {
  yield takeLatest(VERIFY_USER, verifyUser);
  yield takeLatest(VERIFY_EMAIL, verifyEmail);
  yield takeLatest(SUBMIT_PASSWORD, submitPassword);
  yield takeLatest(CREATE_USER, createUser);
}

export function* userSaga() {
  yield all([actionWatcher()]);
}
