import { Divider, Space, Button, Table } from 'antd';
import useFinaMainbz from '../useData/useFinaMainbz';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import ShowNumber from '../components/ShowNumber';
import ShowPercentage from '../components/ShowPercentage';

const FinaMainbz = (props) => {
  const { code } = props;

  const { period, data, contextHolder, toLeft, toRight } = useFinaMainbz(code);

  const columns = [
    {
      title: '主营业务名称',
      key: 'bz_item',
      dataIndex: 'bz_item',
      width: 200,
    },
    {
      title: '营业收入',
      key: 'bz_sales',
      dataIndex: 'bz_sales',
      width: 150,
      render: (text) => {
        return <ShowNumber number={text} />;
      },
    },
    {
      title: '营业成本',
      key: 'bz_cost',
      dataIndex: 'bz_cost',
      width: 150,
      render: (text) => {
        return <ShowNumber number={text} />;
      },
    },
    {
      title: '销售利润(毛利润)',
      key: 'bz_profit',
      dataIndex: 'bz_profit',
      width: 150,
      render: (text) => {
        return <ShowNumber number={text} />;
      },
    },
    {
      title: '毛利率',
      key: 'bz_profit',
      dataIndex: 'bz_profit',
      render: (text, record) => {
        const { bz_profit, bz_sales } = record;
        return <ShowPercentage fenzi={bz_profit} fenmu={bz_sales} />;
      },
    },
  ];

  return (
    <div className="finaMainbz">
      {contextHolder}
      <Divider orientation="left">主营业务构成</Divider>
      <div>
        <Space>
          <Button size="small" icon={<LeftOutlined />} onClick={toLeft} />
          {period}
          <Button size="small" icon={<RightOutlined />} onClick={toRight} />
        </Space>
      </div>
      <br />
      <div>
        <Table
          size="small"
          pagination={false}
          rowKey="bz_item"
          dataSource={data.product}
          columns={columns}
        />
        <br />
        <Table
          size="small"
          pagination={false}
          rowKey="bz_item"
          dataSource={data.industry}
          columns={columns}
        />
        <br />
        <Table
          size="small"
          pagination={false}
          rowKey="bz_item"
          dataSource={data.area}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default FinaMainbz;
