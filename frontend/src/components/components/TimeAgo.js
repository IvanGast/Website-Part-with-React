import React from 'react';
import PropTypes from 'prop-types';

const TimeAgo = ({ time }) => {
  const getTime = () => {
    const formattedTime = Math.round((Date.now() - time) / 1000);
    const date = new Date(time);
    if (formattedTime < 60) {
      return 'Just now';
    } else if (formattedTime >= 60 && formattedTime < 120) {
      return '1 minute ago';
    } else if (formattedTime >= 120 && formattedTime < 3600) {
      return Math.floor(formattedTime / 60) + ' minutes ago';
    } else if (formattedTime >= 3600 && formattedTime < 7200) {
      return '1 hour ago';
    } else if (formattedTime >= 7200 && formattedTime < 21600) {
      return Math.floor(formattedTime / 3600) + ' hours ago';
    } else {
      let dateDay = date.getDate();
      if (dateDay <= 9) dateDay = '0' + dateDay;
      return (
        dateDay +
        '-' +
        date.toLocaleString('default', { month: 'short' }) +
        '-' +
        date.getFullYear()
      );
    }
  };

  return <span>{getTime()}</span>;
};

TimeAgo.propTypes = {
  time: PropTypes.number.isRequired,
};

export default TimeAgo;
