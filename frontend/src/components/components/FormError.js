import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({ message, Tag }) => {
  return <Tag style={{ color: 'red', textAlign: 'center', marginBottom: '0px' }}>{message}</Tag>;
};

FormError.propTypes = {
  message: PropTypes.string.isRequired,
  Tag: PropTypes.string,
};
FormError.defaultProps = {
  Tag: 'p',
};

export default FormError;
