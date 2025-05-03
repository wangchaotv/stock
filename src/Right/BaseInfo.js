import { Divider, Descriptions, Button } from 'antd';
import dayjs from 'dayjs';

const exchangeMap = {
  SSE: '上交所',
  SZSE: '深交所',
  HKEX: '港交所',
};

const BaseInfo = (props) => {
  const {
    ts_code: code,
    name,
    website,
    employees,
    manager,
    market,
    exchange,
    list_date,
    setup_date,
    act_name,
    act_ent_type,
    province,
    city,
    main_business,
    l1_name,
    l2_name,
    l3_name,
  } = props.baseInfo;

  const items = [
    {
      key: 'name',
      label: '名称',
      children: (
        <span>
          {name}&nbsp;{code}
        </span>
      ),
    },
    {
      key: 'setup_date',
      label: '注册日期',
      children: <span>{dayjs(setup_date).format('YYYY年M月DD日')}</span>,
    },
    {
      key: 'list_date',
      label: '上市日期',
      children: <span>{dayjs(list_date).format('YYYY年M月DD日')}</span>,
    },
    {
      key: 'exchange',
      label: '交易所代码',
      children: (
        <span>
          {exchangeMap[exchange]}-{market}
        </span>
      ),
    },
    {
      key: 'manager',
      label: '总经理',
      children: <span>{manager}</span>,
    },
    {
      key: 'employees',
      label: '员工人数',
      children: (
        <span>{employees >= 10000 ? `${employees / 10000}万` : employees}</span>
      ),
    },
    {
      key: 'area',
      label: '地域',
      children: (
        <span>
          {province}-{city}
        </span>
      ),
    },
    {
      key: 'industry',
      label: '行业',
      children: (
        <span>
          {l1_name}-{l2_name}-{l3_name}
        </span>
      ),
      span: 2,
    },
    {
      key: 'act_ent_type',
      label: <div style={{ minWidth: '98px' }}>实控人企业性质</div>,
      children: <span>{act_ent_type || '无'}</span>,
    },
    {
      key: 'act_name',
      label: '实控人名称',
      children: <span>{act_name || '无实际控制人'}</span>,
      span: 2,
    },
    {
      key: 'main_business',
      label: '主要业务及产品',
      children: <span style={{ letterSpacing: '0.8px' }}>{main_business}</span>,
      span: 3,
    },
    {
      key: 'act_ent_type',
      label: '相关网站',
      span: 3,
      children: (
        <div>
          <Button
            type="link"
            href={`//${website}`}
            target="_blank"
            rel="noreferrer"
          >
            官方网站
          </Button>
          <Button
            type="link"
            onClick={() => {
              const [codeNumber, ex] = code.split('.');
              const code_for_dongcai = `${ex}${codeNumber}`;
              window.open(
                `https://emweb.securities.eastmoney.com/pc_hsf10/pages/index.html?type=web&code=${code_for_dongcai}&color=b#/cpbd`
              );
            }}
          >
            东财
          </Button>
          <Button
            type="link"
            href={`https://wangchaotv.github.io/month-k/?code=${code}&name=${name}`}
            target="_blank"
            rel="noreferrer"
          >
            KLine
          </Button>
          <Button
            type="link"
            href={`https://www.cninfo.com.cn/new/fulltextSearch?notautosubmit=&keyWord=${name}`}
            target="_blank"
            rel="noreferrer"
          >
            巨潮
          </Button>
          <Button
            type="link"
            href={`https://data.eastmoney.com/report/singlestock.jshtml?stockcode=${
              code.split('.')[0]
            }`}
            target="_blank"
            rel="noreferrer"
          >
            研报
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Divider orientation="left">基本信息</Divider>
      <Descriptions bordered items={items} size="small" />
    </div>
  );
};

export default BaseInfo;
