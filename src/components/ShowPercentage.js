import React from 'react';

const ShowPercentage = (props) => {
  const { fenzi, fenmu } = props;
  if (typeof props.fenzi !== 'number' || typeof props.fenmu !== 'number') {
    return <span></span>;
  }

  let percentage = (fenzi / fenmu) * 100;
  percentage = percentage.toFixed(2);
  return <span>{percentage}%</span>;
};

export default ShowPercentage;
