import {
  GET_QUESTIONS,
  CHANGE_ANSWERED,
  DELETE_QUESTION,
  CHANGE_LIKE,
  ADD_QUESTION,
  REMOVE_CREATE_STATUS,
  APPROVE_QUESTION,
} from '../actionTypes/questions';

export const getQuestions = (roomId) => ({
  type: GET_QUESTIONS,
  roomId,
});
export const changeAnswered = (roomId, questionId) => ({
  type: CHANGE_ANSWERED,
  roomId,
  questionId,
});
export const deleteQuestion = (roomId, questionId) => ({
  type: DELETE_QUESTION,
  roomId,
  questionId,
});
export const approveQuestion = (roomId, questionId) => ({
  type: APPROVE_QUESTION,
  roomId,
  questionId,
});
export const changeLike = (roomId, questionId) => ({
  type: CHANGE_LIKE,
  roomId,
  questionId,
});
export const addQuestion = (roomId, formData) => ({
  type: ADD_QUESTION,
  roomId,
  formData,
});
export const removeCreateStatus = () => ({
  type: REMOVE_CREATE_STATUS,
});
