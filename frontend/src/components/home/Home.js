import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import FormError from '../components/FormError';
import { findSession } from '../../state/actions/sessions';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const joinSessionError = useSelector((store) => store.questions.joinSessionError);
  const [localError, setLocalError] = React.useState(false);

  const redirect = (id) => {
    history.push(`/questions/${id}`);
  };

  return (
    <Container maxWidth="sm" elevation={4}>
      <Card
        style={{ borderRadius: '20px', padding: '20px', marginBottom: '20px', marginTop: '20px' }}
      >
        <h1 style={{ textAlign: 'center' }}>Join session with code</h1>
        <Formik
          initialValues={{ code: '' }}
          onSubmit={(values) => {
            if (values.code !== '') {
              setLocalError(false);
              dispatch(findSession(values.code, 'unauthorized', redirect));
            } else {
              setLocalError(true);
            }
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                name="code"
                value={values.code}
                variant="outlined"
                placeholder="Session code"
                style={{ marginBottom: '20px', marginTop: '20px' }}
                onChange={handleChange}
              />
              <Button type="submit" fullWidth size="medium" variant="contained" color="primary">
                Join session
              </Button>
              {(joinSessionError || localError) && (
                <FormError Tag={'h2'} message={'Session not found'} />
              )}
            </form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};
export default Home;
