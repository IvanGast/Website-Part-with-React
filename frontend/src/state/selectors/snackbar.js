import { createSelector } from 'reselect';

export const selectSnackbar = createSelector(
  (state) => state.snackbar.snackbar,
  (snackbar) => snackbar,
);
