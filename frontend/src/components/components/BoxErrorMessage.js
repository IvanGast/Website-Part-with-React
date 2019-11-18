import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const BoxErrorMessage = ({ text }) => {
  const classes = useStyles();
  return (
    <SnackbarContent
      className={(classes, classes.error)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <ErrorIcon className={(classes.icon, classes.iconVariant)} />
          {text}
        </span>
      }
    />
  );
};

BoxErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
};
export default BoxErrorMessage;
