import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILED,
  CHANGE_ANSWERED_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  CHANGE_LIKE_SUCCESS,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILED,
  REMOVE_CREATE_STATUS,
  APPROVE_QUESTION_SUCCESS,
} from '../actionTypes/questions';
import {
  FIND_SESSION,
  FIND_SESSION_SUCCESS,
  FIND_SESSION_FAILED,
  LOCK_SESSION_SUCCESS,
} from '../actionTypes/sessions';
const initialState = {
  roomData: undefined,
  joinSessionError: undefined,
  isLoading: undefined,
  error: undefined,
  createStatus: undefined,
};

const SortByAnswerDesc = (a, b) => {
  if (a === b) {
    return 0;
  } else if (a.isAnswered === b.isAnswered) {
    if (a.rating < b.rating) {
      return 1;
    } else if (a.rating === b.rating) {
      if (a.time < b.time) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return -1;
    }
  } else if (!a.isAnswered) {
    return -1;
  } else {
    return 1;
  }
};

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case LOCK_SESSION_SUCCESS: {
      let data = { ...state.roomData };
      data.isLocked = !data.isLocked;
      return { ...state, roomData: data };
    }
    case FIND_SESSION: {
      return { ...state, joinSessionError: undefined, isLoading: true };
    }
    case FIND_SESSION_FAILED: {
      return { ...state, joinSessionError: true, isLoading: false };
    }
    case FIND_SESSION_SUCCESS: {
      return { ...state, roomData: action.session, isLoading: false };
    }
    case REMOVE_CREATE_STATUS: {
      return { ...state, createStatus: undefined };
    }
    case ADD_QUESTION_SUCCESS: {
      let data = { ...state.roomData };
      data.questions.push(action.newQuestion);
      data.questions.sort(SortByAnswerDesc);
      return { ...state, roomData: data, createStatus: true };
    }
    case ADD_QUESTION_FAILED: {
      return { ...state, createStatus: false };
    }
    case DELETE_QUESTION_SUCCESS: {
      const data = { ...state.roomData };
      let id;
      let incId = 0;
      data.questions.forEach((item) => {
        if (item.id === action.questionId) {
          id = incId;
        } else {
          incId = incId + 1;
        }
      });
      data.questions.splice(id, 1);
      return { ...state, roomData: data };
    }
    case CHANGE_ANSWERED_SUCCESS: {
      const data = { ...state.roomData };
      data.questions.forEach((item) => {
        if (item.id === action.questionId) {
          item.isAnswered = !item.isAnswered;
        }
      });
      data.questions.sort(SortByAnswerDesc);
      return { ...state, roomData: data };
    }
    case CHANGE_LIKE_SUCCESS: {
      const data = { ...state.roomData };
      data.questions.forEach((item) => {
        if (item.id === action.questionId) {
          if (item.isLiked) {
            item.rating = item.rating - 1;
          } else {
            item.rating = item.rating + 1;
          }
          item.isLiked = !item.isLiked;
        }
      });
      data.questions.sort(SortByAnswerDesc);
      return { ...state, roomData: data };
    }
    case GET_QUESTIONS_SUCCESS: {
      action.roomData.questions.sort(SortByAnswerDesc);
      return { ...state, roomData: action.roomData, error: undefined };
    }
    case GET_QUESTIONS_FAILED: {
      return { ...state, error: action.error };
    }
    case APPROVE_QUESTION_SUCCESS: {
      const data = { ...state.roomData };
      data.questions.forEach((item) => {
        if (item.id === action.questionId) {
          item.isApproved = true;
        }
      });
      return { ...state, roomData: data };
    }
    default: {
      return state;
    }
  }
}
