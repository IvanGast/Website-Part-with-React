import {
  GET_SESSIONS,
  ADD_SESSION,
  SESSION_CLOSE,
  REMOVE_CREATE_STATUS,
  FIND_SESSION,
  LOCK_SESSION,
} from '../actionTypes/sessions';

export const lockSession = (sessionId) => ({
  type: LOCK_SESSION,
  sessionId,
});

export const getSessions = () => ({
  type: GET_SESSIONS,
});
export const addSession = (formData) => ({
  type: ADD_SESSION,
  formData,
});
export const findSession = (code, user, callback) => ({
  type: FIND_SESSION,
  code,
  user,
  callback,
});
export const removeCreateStatus = () => ({
  type: REMOVE_CREATE_STATUS,
});

export const closeSession = (sessionId) => ({
  type: SESSION_CLOSE,
  sessionId,
});
