import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import UserInfo from './UserInfo';
import { signOut } from '../../state/actions/user';

const useStyles = makeStyles({
  rightButton: {
    height: '50px',
    color: '#ffffff',
    fontSize: '20px',
    float: 'right',
    marginLeft: '20px',
    textTransform: 'none',
    '&:hover': {
      color: '#000000',
    },
    '&:focus': {
      color: '#000000',
    },
  },
  leftButton: {
    height: '50px',
    color: '#ffffff',
    fontSize: '20px',
    float: 'left',
    textTransform: 'none',
    '&:hover': {
      color: '#000000',
    },
    '&:focus': {
      color: '#000000',
    },
  },
  userBar: {
    height: '80px',
    backgroundColor: '#1D73AD',
    display: 'inline-block',
    width: '100%',
    padding: '15px 100px 15px 100px',
  },
});

const UserNavBar = () => {
  const classes = useStyles();
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  return (
    <div className={classes.userBar}>
      {user && <UserInfo status={'Admin'} nickname={'Blackend'} />}
      <Link to="/">
        <Button className={classes.leftButton}>Home</Button>
      </Link>
      {!user && (
        <Link to="/sign-up">
          <Button className={classes.rightButton}>Sign up</Button>
        </Link>
      )}
      <Link to="/sign-in">
        <Button
          className={classes.rightButton}
          onClick={() => {
            if (user) {
              dispatch(signOut());
            }
          }}
        >
          {user ? 'Sign out' : 'Sign in'}
        </Button>
      </Link>
    </div>
  );
};

export default UserNavBar;
