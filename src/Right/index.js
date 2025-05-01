import React from 'react';

import BaseInfo from './BaseInfo';

import useBaseInfo from '../useData/useBaseInfo';

const Right = (props) => {
  const { code } = props;

  const baseInfo = useBaseInfo(code);

  return (
    <div className="right">
      <BaseInfo baseInfo={baseInfo} />
    </div>
  );
};

export default Right;
