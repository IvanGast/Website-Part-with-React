import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';
import { CardContent, Typography, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import TimeAgo from '../components/TimeAgo.js';
import { changeAnswered, deleteQuestion, changeLike } from '../../state/actions/questions';

const useStyles = makeStyles({
  card: {
    margin: '16px 0px',
  },
  answerded: {
    backgroundColor: '#aad688',
  },
  cardContent: {
    paddingBottom: '0px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  time: {
    marginLeft: '8px',
  },
  author: {
    fontWeight: 'bold',
  },
  question: {
    fontSize: '1.25em',
  },
  likeButton: {
    justifyContent: 'left',
  },
  likeIcon: {
    margin: '0px 5px',
  },
  answeredButton: {
    textTransform: 'none',
    marginLeft: '16px',
  },
  deleteButton: {
    margin: '-10px',
    height: '48px',
  },
  liked: {
    color: '#1976d2',
  },
});

const QuestionListItem = ({ roomId, question, isAdminView }) => {
  const classes = useStyles();
  const isLocked = useSelector((store) => store.questions.roomData.isLocked);
  const dispatch = useDispatch();
  const isAdmin = useSelector((store) => store.user.isAdmin);

  const onClickLike = () => {
    dispatch(changeLike(roomId, question.id));
  };

  const onClickAnswered = () => {
    dispatch(changeAnswered(roomId, question.id));
  };

  const onClickDelete = () => {
    dispatch(deleteQuestion(roomId, question.id));
  };

  return (
    <Card className={`${classes.card} ${question.isAnswered && classes.answerded}`} elevation={4}>
      <CardContent className={classes.cardContent}>
        <div>
          <Typography className={classes.author} variant="body1" gutterBottom>
            {question.author}

            <Typography
              className={classes.time}
              variant="body2"
              component="span"
              color="textSecondary"
            >
              {typeof question.time === 'number' && <TimeAgo time={question.time} />}
            </Typography>
          </Typography>

          <Typography className={classes.question} variant="body1">
            {question.question}
          </Typography>
        </div>

        {isAdminView && (
          <IconButton
            className={classes.deleteButton}
            disabled={isLocked && !isAdmin}
            onClick={onClickDelete}
            aria-label="Delete"
          >
            <CloseIcon />
          </IconButton>
        )}
      </CardContent>

      <CardActions>
        <Button
          className={classes.likeButton}
          disabled={question.isAnswered || (isLocked && !isAdmin)}
          onClick={onClickLike}
          startIcon={
            <ThumbUpIcon
              className={`${classes.likeIcon} ${question.isLiked &&
                !question.isAnswered &&
                classes.liked}`}
              onClick={onClickLike}
              aria-labelledby="Like"
            />
          }
        >
          {question.rating}
        </Button>

        {isAdminView && (
          <Button
            className={classes.answeredButton}
            onClick={onClickAnswered}
            disabled={isLocked && !isAdmin}
            startIcon={question.isAnswered ? <CloseIcon /> : <DoneIcon />}
            disableTouchRipple
          >
            Answered
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

QuestionListItem.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    isAnswered: PropTypes.bool.isRequired,
    isRemoved: PropTypes.bool.isRequired,
    isLiked: PropTypes.bool.isRequired,
  }),
  isAdminView: PropTypes.bool,
  roomId: PropTypes.string.isRequired,
};

export default QuestionListItem;
