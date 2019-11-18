import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormError from '../components/FormError';

const SubmitQuestionButton = ({ verifyForm, style }) => {
  const [isVerified, setVerified] = React.useState(true);

  return (
    <div style={style}>
      <Button
        fullWidth
        size="medium"
        variant="contained"
        color="primary"
        onClick={() => {
          setVerified(verifyForm());
        }}
      >
        SUBMIT
      </Button>
      {!isVerified && (
        <FormError Tag={'h2'} message={'Please correct any invalid fields and try again'} />
      )}
    </div>
  );
};

SubmitQuestionButton.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
  verifyForm: PropTypes.func.isRequired,
};
export default SubmitQuestionButton;
