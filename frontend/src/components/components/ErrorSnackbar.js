import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { closeSnackbar } from '../../state/actions/snackbar';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

const ErrorSnackbar = () => {
  const classes = useStyles();
  const open = useSelector((store) => store.snackbar.open);
  const message = useSelector((store) => store.snackbar.message);
  const dispatch = useDispatch();

  if (!open) {
    return null;
  }

  const close = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={close}
      message={<span>{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={close}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

export default ErrorSnackbar;
