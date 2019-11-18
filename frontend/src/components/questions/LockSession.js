import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';

import { lockSession } from '../../state/actions/sessions';

const LockSession = ({ roomId }) => {
  const isLocked = useSelector((store) => store.questions.roomData.isLocked);
  const dispatch = useDispatch();

  const handleSwitchChange = () => {
    console.log(isLocked);
    dispatch(lockSession(roomId));
  };

  return (
    <Card style={{ padding: '20px', marginBottom: '20px' }} elevation={4}>
      <FormControlLabel
        control={<Switch checked={isLocked} onChange={handleSwitchChange} color="primary" />}
        labelPlacement="start"
        label="Lock Session: "
      />
    </Card>
  );
};

LockSession.propTypes = {
  roomId: PropTypes.string.isRequired,
};
export default LockSession;
