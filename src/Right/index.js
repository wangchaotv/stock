import React from 'react';

import BaseInfo from './BaseInfo';
import Balancesheet from './Balancesheet';
import FinaMainbz from './FinaMainbz';

import useBaseInfo from '../useData/useBaseInfo';
import useBalancesheet from '../useData/useBalancesheet';

const Right = (props) => {
  const { code } = props;

  const baseInfo = useBaseInfo(code);
  const balancesheet = useBalancesheet(code);

  return (
    <div className="right">
      <BaseInfo baseInfo={baseInfo} />
      <FinaMainbz code={code} />
      <Balancesheet balancesheet={balancesheet} />
    </div>
  );
};

export default Right;
