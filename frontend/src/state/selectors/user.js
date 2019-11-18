import { createSelector } from 'reselect';

export const selectUser = createSelector(
  (state) => state.user.user,
  (user) => user,
);
