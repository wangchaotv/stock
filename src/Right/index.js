import React from 'react';

import BaseInfo from './BaseInfo';

import useBaseInfo from '../useData/useBaseInfo';
import FinaMainbz from './FinaMainbz';

const Right = (props) => {
  const { code } = props;

  const baseInfo = useBaseInfo(code);

  return (
    <div className="right">
      <BaseInfo baseInfo={baseInfo} />
      <FinaMainbz code={code} />
    </div>
  );
};

export default Right;
