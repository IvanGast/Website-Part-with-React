import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';

import { addQuestion, removeCreateStatus } from '../../state/actions/questions';
import QuestionField from './QuestionField';
import NicknameField from './NicknameField';
import SubmitQuestionButton from './SubmitQuestionButton';

const maximumQuestionLength = 360;
const minimumQuestionLength = 10;
const maximumNicknameLength = 20;

const CreateQuestionForm = ({ roomId }) => {
  const createStatus = useSelector((store) => store.questions.createStatus);
  const [verifyStatus, setVerifyStatus] = React.useState(true);
  const [userNickname, setUserNickname] = React.useState('');
  const [questionText, setQuestionText] = React.useState('');
  const dispatch = useDispatch();

  const isQuestionTooLong = () => {
    return questionText.trim().length >= maximumQuestionLength;
  };

  const isQuestionTooShort = () => {
    return questionText.trim().length < minimumQuestionLength;
  };

  const isNicknameTooLong = () => {
    return userNickname.trim().length > maximumNicknameLength;
  };

  const getQuestionError = () => {
    if (!verifyStatus && isQuestionTooShort()) {
      return (
        <p style={{ color: 'red' }}>Question must be at least {minimumQuestionLength} characters</p>
      );
    }
    if (!verifyStatus && isQuestionTooLong()) {
      return (
        <p style={{ color: 'red' }}>
          Question must be less than {maximumQuestionLength} characters
        </p>
      );
    }
  };

  const getNicknameError = () => {
    if (!verifyStatus && isNicknameTooLong()) {
      return (
        <p style={{ color: 'red' }}>
          Nickname can be maximally {maximumNicknameLength} characters long
        </p>
      );
    }
  };

  const status = () => {
    if (createStatus === undefined) {
      return null;
    }
    if (createStatus === false) {
      return <p style={{ color: 'red' }}>An error occured</p>;
    }
    return <p style={{ color: 'green' }}>Question created</p>;
  };

  const verify = () => {
    const isValid = !isQuestionTooShort() && !isQuestionTooLong() && !isNicknameTooLong();
    if (isValid) {
      submit();
    } else {
      dispatch(removeCreateStatus());
    }
    setVerifyStatus(isValid);
    return isValid;
  };

  const submit = () => {
    const trimmedQuestionText = questionText.trim();
    const trimmedUserNickname = userNickname.trim();
    const formData = {
      trimmedQuestionText,
      trimmedUserNickname,
    };
    dispatch(addQuestion(roomId, formData));
  };

  return (
    <Card style={{ borderRadius: '30px' }} elevation={4}>
      <div
        style={{
          position: 'relative',
          fontFamily: 'Arial',
          fontWeight: 'Bold',
          padding: '20px',
          marginBottom: '10px',
        }}
        align="center"
      >
        <h2>Create new question</h2>
        <QuestionField onChange={setQuestionText} style={{ marginTop: '20px' }} />
        {getQuestionError()}
        <NicknameField onChange={setUserNickname} style={{ marginTop: '20px' }} />
        {getNicknameError()}
        <SubmitQuestionButton verifyForm={verify} style={{ marginTop: '20px' }} />
        {status()}
      </div>
    </Card>
  );
};
CreateQuestionForm.propTypes = {
  roomId: PropTypes.string.isRequired,
};
export default CreateQuestionForm;
