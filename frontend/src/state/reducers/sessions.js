import {
  SESSION_CREATE_FAILED,
  SESSION_CREATE_SUCCESS,
  SESSIONS_RECEIVED,
  SESSIONS_FAILED,
  REMOVE_CREATE_STATUS,
  SESSION_CLOSE_SUCCESS,
} from '../actionTypes/sessions';

import { SESSION_STATUS } from '../constants/sessions';

const initialState = {
  sessionArray: { rooms: [] },
  error: undefined,
  createStatus: undefined,
};

export default function sessionsReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_CREATE_STATUS: {
      return { ...state, createStatus: undefined };
    }
    case SESSION_CREATE_FAILED: {
      return { ...state, createStatus: false };
    }
    case SESSION_CREATE_SUCCESS: {
      let data = state.sessionArray;
      data.sessionArray.rooms.push(action.newSession);
      return { ...state, sessionArray: data, createStatus: true };
    }
    case SESSIONS_RECEIVED: {
      action.sessionArray.rooms.sort((a, b) => b.time - a.time);
      return {
        ...state,
        sessionArray: action.sessionArray,
        error: undefined,
        createStatus: undefined,
      };
    }
    case SESSIONS_FAILED: {
      return { ...state, error: action.error };
    }
    case SESSION_CLOSE_SUCCESS: {
      return {
        ...state,
        sessionArray: {
          rooms: state.sessionArray.rooms.map((session) => {
            if (session.id === action.sessionId) {
              return { ...session, status: SESSION_STATUS.COMPLETED };
            }
            return session;
          }),
        },
      };
    }
    default: {
      return state;
    }
  }
}
