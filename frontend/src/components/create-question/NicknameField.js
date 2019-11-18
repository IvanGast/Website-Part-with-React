import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const NicknameField = ({ onChange, style }) => {
  return (
    <div style={style}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your nickname (optional)"
        helperText="Maximum 20 characters"
        onInput={(e) => {
          e.persist();
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

NicknameField.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};
export default NicknameField;
