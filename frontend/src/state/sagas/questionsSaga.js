import { put, all, takeLatest } from 'redux-saga/effects';

import {
  GET_QUESTIONS_FAILED,
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  CHANGE_LIKE,
  CHANGE_ANSWERED_SUCCESS,
  CHANGE_ANSWERED,
  CHANGE_LIKE_SUCCESS,
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  ADD_QUESTION,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILED,
  APPROVE_QUESTION,
  APPROVE_QUESTION_SUCCESS,
} from '../actionTypes/questions';

import { SHOW_SNACKBAR } from '../actionTypes/snackbar';

import { RESPONSE_STATUS, getRequest, postRequest } from '../../common/ApiRequests';

function* getQuestions(action) {
  const { status, data } = yield getRequest(`rooms/${action.roomId}`);
  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: GET_QUESTIONS_SUCCESS, roomData: data });
      break;
    case RESPONSE_STATUS.BAD_RESPONSE:
      yield put({ type: GET_QUESTIONS_FAILED, error: 'There are no rooms for this name' });
      break;
    default:
      yield put({ type: GET_QUESTIONS_FAILED, error: 'Could not connect to server' });
  }
}

function* changeLike(action) {
  const { status } = yield postRequest(
    `rooms/${action.roomId}/questions/${action.questionId}/like`,
  );

  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: CHANGE_LIKE_SUCCESS, questionId: action.questionId });
      break;
    case RESPONSE_STATUS.BAD_RESPONSE:
      yield put({ type: SHOW_SNACKBAR, message: `Couldn't change like of this question` });
      break;
    default:
      yield put({ type: SHOW_SNACKBAR, message: `Couldn't connect to server` });
  }
}

function* changeAnswered(action) {
  const { status } = yield postRequest(
    `rooms/${action.roomId}/questions/${action.questionId}/answered`,
  );

  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: CHANGE_ANSWERED_SUCCESS, questionId: action.questionId });
      break;
    case RESPONSE_STATUS.BAD_RESPONSE:
      yield put({ type: SHOW_SNACKBAR, message: `Couldn't change answered of this question` });
      break;
    default:
      yield put({ type: SHOW_SNACKBAR, message: `Couldn't connect to server` });
  }
}

function* addQuestion(action) {
  const { status, data } = yield postRequest(
    `rooms/${action.roomId}/create-question`,
    action.formData,
  );

  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: ADD_QUESTION_SUCCESS, newQuestion: data });
      break;
    default:
      yield put({ type: ADD_QUESTION_FAILED });
  }
}

function* approveQuestion(action) {
  const { status } = yield postRequest(
    `rooms/${action.roomId}/questions/${action.questionId}/approve`,
  );
  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: APPROVE_QUESTION_SUCCESS, questionId: action.questionId });
      break;
    case RESPONSE_STATUS.BAD_RESPONSE:
      yield put({ type: SHOW_SNACKBAR, message: `Couldn't approve this question` });
      break;
    default:
      yield put({ type: SHOW_SNACKBAR, message: `Couldn't connect to server` });
  }
}

function* deleteQuestion(action) {
  const { status } = yield postRequest(
    `rooms/${action.roomId}/questions/${action.questionId}/delete`,
  );
  switch (status) {
    case RESPONSE_STATUS.OK:
      yield put({ type: DELETE_QUESTION_SUCCESS, questionId: action.questionId });
      break;
    case RESPONSE_STATUS.BAD_RESPONSE:
      yield put({ type: SHOW_SNACKBAR, message: `Couldn't delete this question` });
      break;
    default:
      yield put({ type: SHOW_SNACKBAR, message: `Couldn't connect to server` });
  }
}

function* actionWatcher() {
  yield takeLatest(GET_QUESTIONS, getQuestions);
  yield takeLatest(DELETE_QUESTION, deleteQuestion);
  yield takeLatest(CHANGE_LIKE, changeLike);
  yield takeLatest(CHANGE_ANSWERED, changeAnswered);
  yield takeLatest(ADD_QUESTION, addQuestion);
  yield takeLatest(APPROVE_QUESTION, approveQuestion);
}

export function* questionsSaga() {
  yield all([actionWatcher()]);
}
