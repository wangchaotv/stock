import React from 'react';

const formatNumber = (number) => {
  if (typeof number !== 'number') {
    return number;
  }
  if (number < 10000 && number > -10000) {
    return number;
  } else if (number < 100000000 && number > -100000000) {
    return `${(number / 10000).toFixed(2)}万`;
  } else {
    return `${(number / 100000000).toFixed(2)}亿`;
  }
};

const ShowNumber = (props) => {
  const { number, styles = {} } = props;
  return <span style={styles}>{formatNumber(number)}</span>;
};
export default ShowNumber;
