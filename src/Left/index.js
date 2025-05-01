import React from 'react';
import { Select } from 'antd';

import useStockList from '../useData/useStockList';

const Left = (props) => {
  const { stock1, stock2, setStock1, setStock2 } = props;
  const stockList = useStockList();

  return (
    <div className="left">
      <div style={{ padding: '15px 10px' }}>
        <Select
          allowClear
          showSearch
          optionFilterProp="label"
          placeholder="默认"
          value={stock1}
          style={{ width: '100%', marginBottom: '10px' }}
          onChange={(value) => {
            setStock1(value);
          }}
          options={stockList}
        />
        <Select
          allowClear
          showSearch
          optionFilterProp="label"
          placeholder="对比"
          value={stock2}
          style={{ width: '100%' }}
          onChange={(value) => {
            setStock2(value);
          }}
          options={stockList}
        />
      </div>
    </div>
  );
};

export default Left;
