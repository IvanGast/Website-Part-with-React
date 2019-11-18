import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  closeButton: {
    position: 'absolute',
    right: '8px',
    top: '8px',
  },
});

const ConfirmDialog = ({ open, onClose, children }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>
        <span>Confirm session close</span>
        <IconButton onClick={() => onClose(false)} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(true)}>CONFIRM</Button>
        <Button onClick={() => onClose(false)}>CANCEL</Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object,
};

export default ConfirmDialog;
