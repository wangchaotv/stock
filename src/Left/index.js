import React from 'react';
import { Select } from 'antd';

const Left = (props) => {
  const { stock1, stock2, setStock1, setStock2 } = props;
  return (
    <div className="left">
      <div style={{ padding: '15px 10px' }}>
        <Select
          allowClear
          placeholder="默认"
          value={stock1}
          style={{ width: '100%', marginBottom: '10px' }}
          onChange={(value) => {
            setStock1(value);
          }}
          options={[
            { value: 'sh', label: '上海' },
            { value: 'sz', label: '深圳' },
          ]}
        />
        <Select
          allowClear
          placeholder="对比"
          value={stock2}
          style={{ width: '100%' }}
          onChange={(value) => {
            setStock2(value);
          }}
          options={[
            { value: 'sh', label: '上海' },
            { value: 'sz', label: '深圳' },
          ]}
        />
      </div>
    </div>
  );
};

export default Left;
