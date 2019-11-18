import { Link } from 'react-router-dom';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  functionsButton: {
    backgroundColor: 'transparent',
    color: '#1D73AD',
    '&:hover': {
      color: '#000000',
    },
    '&:focus': {
      color: '#000000',
    },
  },
  functionsBar: {
    display: 'inline-block',
    width: '100%',
    padding: '15px 30px 15px 30px',
    backgroundColor: '#ffffff',
    boxShadow: '0 3px 3px -2px gray',
    marginTop: '-4px',
  },
});

const FunctionsNavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.functionsBar}>
      <Container maxWidth="md">
        <Link to="/questions/0">
          <Button className={classes.functionsButton}>Questions</Button>
        </Link>
      </Container>
    </div>
  );
};
export default FunctionsNavBar;
