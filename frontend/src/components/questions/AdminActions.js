import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardActions, Button, CardContent, Typography, CardHeader } from '@material-ui/core';

import { closeSession, getSessions } from '../../state/actions/sessions';

import ConfirmDialog from '../components/ConfirmDialog';
import TimeFormatter from '../components/TimeFormatter';

const AdminActions = ({ sessionId }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const session = useSelector((store) => {
    return store.sessions.sessionArray.rooms.find((session) => session.id === sessionId);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!session) {
      dispatch(getSessions());
    }
  });

  const closeConfirmDialog = (confirmed) => {
    if (confirmed) {
      dispatch(closeSession(sessionId));
    }

    setConfirmDialogOpen(false);
  };
  if (session) {
    return (
      <>
        <ConfirmDialog open={confirmDialogOpen} onClose={closeConfirmDialog}>
          <p>
            Session <b>{session.title}</b> will be closed.
            <br /> Users will not be able to access this session anymore
          </p>
        </ConfirmDialog>

        <Card style={{ marginTop: '24px' }} elevation={4}>
          <CardHeader title={'Session Management'} />
          <CardContent>
            <Typography variant="body1">Status: {session.status}</Typography>
            <Typography variant="body1">Session Type: {session.type}</Typography>
            <Typography variant="body1">
              {'Session Started: '}
              <TimeFormatter time={session.time} />
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => setConfirmDialogOpen(true)}>CLOSE SESSION</Button>
          </CardActions>
        </Card>
      </>
    );
  }
  return null;
};

AdminActions.propTypes = {
  sessionId: PropTypes.number.isRequired,
};

export default AdminActions;
