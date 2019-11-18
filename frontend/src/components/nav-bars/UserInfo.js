import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
  icon: {
    color: '#ffffff',
    width: '20px',
    float: 'left',
    marginRight: '5px',
  },
  nickname: {
    float: 'right',
    width: '150px',
    color: '#ffffff',
    paddingTop: '3px',
    marginTop: '2px',
    marginBottom: '0px',
    fontWeight: 'bold',
  },
  status: { float: 'left', width: '100%', color: '#ffffff', marginTop: '3px', marginBottom: '3px' },
});

const UserInfo = ({ status, nickname }) => {
  const classes = useStyles();
  return (
    <div style={{ width: '180px', display: 'flex-vertical', float: 'left' }}>
      <div style={{ float: 'right' }}>
        <p className={classes.nickname}>{nickname}</p>
        <PersonIcon className={classes.icon} />
      </div>
      <p className={classes.status}>Status: {status}</p>
    </div>
  );
};

UserInfo.propTypes = {
  status: PropTypes.string,
  nickname: PropTypes.string,
};

export default UserInfo;
