import { put, all, takeLatest, call } from 'redux-saga/effects';

import {
  GET_SESSIONS,
  ADD_SESSION,
  SESSION_CREATE_SUCCESS,
  SESSION_CREATE_FAILED,
  SESSIONS_RECEIVED,
  SESSIONS_FAILED,
  FIND_SESSION,
  FIND_SESSION_SUCCESS,
  FIND_SESSION_FAILED,
  SESSION_CLOSE,
  SESSION_CLOSE_SUCCESS,
  LOCK_SESSION,
  LOCK_SESSION_SUCCESS,
} from '../actionTypes/sessions';
import { CREATE_UNAUTHORIZED_USER } from '../actionTypes/user';
import { SHOW_SNACKBAR } from '../actionTypes/snackbar';

import { RESPONSE_STATUS, getRequest, postRequest } from '../../common/ApiRequests';

function* lockSession(action) {
  const { status } = yield postRequest(`lock-session/${action.sessionId}`);
  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: LOCK_SESSION_SUCCESS });
      break;
    case RESPONSE_STATUS.BAD_RESPONSE:
      yield put({ type: SHOW_SNACKBAR, message: `Couldn't lock this session` });
      break;
    default:
      yield put({ type: SHOW_SNACKBAR, message: 'Could not connect to server' });
  }
}

function* getSessions() {
  const { status, data } = yield getRequest('rooms');
  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: SESSIONS_RECEIVED, sessionArray: { rooms: data } });
      break;
    case RESPONSE_STATUS.BAD_RESPONSE:
      yield put({ type: SESSIONS_FAILED, error: 'There are no sessions in the database' });
      break;
    default:
      yield put({ type: SESSIONS_FAILED, error: 'Could not connect to server' });
  }
}

function* addSession(action) {
  const { status } = yield postRequest('create-session', action.formData);
  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: SESSION_CREATE_SUCCESS, createStatus: true });
      break;
    default:
      yield put({ type: SESSION_CREATE_FAILED, createStatus: false });
  }
}

function* findSession(action) {
  try {
    const { status, data } = yield postRequest(`find-session/${action.code}`);
    switch (status) {
      case RESPONSE_STATUS.OK:
        if (action.user === 'unauthorized') {
          yield put({ type: CREATE_UNAUTHORIZED_USER });
        }
        yield put({ type: FIND_SESSION_SUCCESS, session: data });
        yield call(action.callback(data.id));
        break;
      default:
        yield put({ type: FIND_SESSION_FAILED });
    }
  } catch (e) {
    yield put({ type: FIND_SESSION_FAILED });
  }
}
function* closeSession(action) {
  const { status } = yield postRequest(`close-session/${action.sessionId}`);
  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: SESSION_CLOSE_SUCCESS, sessionId: action.sessionId });
      break;
    case RESPONSE_STATUS.BAD_RESPONSE:
      yield put({ type: SHOW_SNACKBAR, message: 'Session does not exist' });
      break;
    default:
      yield put({ type: SHOW_SNACKBAR, message: 'Could not connect to server' });
  }
}

function* actionWatcher() {
  yield takeLatest(GET_SESSIONS, getSessions);
  yield takeLatest(ADD_SESSION, addSession);
  yield takeLatest(FIND_SESSION, findSession);
  yield takeLatest(SESSION_CLOSE, closeSession);
  yield takeLatest(LOCK_SESSION, lockSession);
}

export function* sessionsSaga() {
  yield all([actionWatcher()]);
}
