import { createSelector } from 'reselect';

export const selectQuestions = createSelector(
  (state) => state.questions.questions,
  (questions) => questions,
);
