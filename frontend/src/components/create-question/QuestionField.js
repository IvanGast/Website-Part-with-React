import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const QuestionField = ({ onChange, style }) => {
  return (
    <div style={style}>
      <TextField
        fullWidth
        multiline
        variant="outlined"
        placeholder="Type your question"
        helperText="Maximum 360 and minimum 10 characters"
        onInput={(e) => {
          e.persist();
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

QuestionField.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};
export default QuestionField;
