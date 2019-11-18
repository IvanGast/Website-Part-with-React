import React from 'react';
import PropTypes from 'prop-types';

const TimeFormatter = ({ time }) => {
  const unformattedTime = new Date(parseInt(time));
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return <span>{unformattedTime.toLocaleString('lt-LT', options)}</span>;
};

TimeFormatter.propTypes = {
  time: PropTypes.number.isRequired,
};

export default TimeFormatter;
