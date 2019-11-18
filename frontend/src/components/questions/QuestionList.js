import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';

import { getQuestions } from '../../state/actions/questions';
import CreateQuestionForm from '../create-question/CreateQuestionForm';
import ErrorBox from '../components/BoxErrorMessage';
import QuestionListItem from './QuestionListItem';
import AdminActions from './AdminActions';
import LockSession from './LockSession';

let QuestionList = () => {
  const roomData = useSelector((store) => store.questions.roomData);
  const error = useSelector((store) => store.questions.error);
  const user = useSelector((store) => store.user.user);
  const isAdmin = useSelector((store) => store.user.isAdmin);
  const isLoading = useSelector((store) => store.questions.isLoading);
  let { roomId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  if (!user && !isLoading) {
    history.push('/sign-in');
  }

  useEffect(() => {
    if (user !== 'unauthorized') {
      dispatch(getQuestions(roomId));
    }
  }, [roomId, dispatch, user]);

  if (error) {
    return (
      <Container maxWidth="md">
        <ErrorBox text={error} />
      </Container>
    );
  }

  if (roomData === undefined) {
    return null;
  }

  return (
    <>
      <Container maxWidth="md">
        <h1 style={{ textAlign: 'center' }}>{roomData.title}</h1>
        {isAdmin && <LockSession roomId={roomId} />}
        {!roomData.isLocked && <CreateQuestionForm roomId={roomId} />}
        {isAdmin && <AdminActions sessionId={roomData.id} />}
        <List>
          {roomData.questions.map((item) => {
            return (
              <QuestionListItem
                question={item}
                key={item.id}
                isAdminView={isAdmin}
                roomId={roomId}
              />
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default QuestionList;
