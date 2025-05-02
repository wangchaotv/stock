import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { message } from 'antd';
import query_tushare from '../utils/query_tushare';

const params = [
  'ts_code',
  'end_date',
  'bz_item',
  'bz_code',
  'bz_sales',
  'bz_profit',
  'bz_cost',
  'update_flag',
  'curr_type',
];

let _code = '';

const preQuarterEnd = (d) => {
  return dayjs(d).subtract(1, 'quarter').endOf('quarter').format('YYYYMMDD');
};

const nextQuarterEnd = (d) => {
  return dayjs(d).add(1, 'quarter').endOf('quarter').format('YYYYMMDD');
};

const useFinaMainbz = (code) => {
  const [period, setPeriod] = useState();
  const [data, setData] = useState({ product: [], industry: [], area: [] });
  const [messageApi, contextHolder] = message.useMessage();

  const query = async (p, isLeft) => {
    if (dayjs(p).isAfter(dayjs())) {
      messageApi.info('没有更新的数据了......');
      return null;
    }

    const res = await query_tushare('fina_mainbz', params, {
      ts_code: code,
      period: p,
    });

    if (res?.length === 0) {
      if (isLeft) {
        await query(nextQuarterEnd(p), true);
      } else {
        await query(preQuarterEnd(p));
      }
    } else {
      setPeriod(p);
      const product = [];
      const industry = [];
      const area = [];
      res
        .sort((a, b) => b.update_flag - a.update_flag)
        .forEach((item) => {
          if (
            item.bz_code === 'P' &&
            !product.find((i) => i.bz_item === item.bz_item)
          ) {
            product.push(item);
          } else if (
            item.bz_code === 'D' &&
            !area.find((i) => i.bz_item === item.bz_item)
          ) {
            area.push(item);
          } else if (
            item.bz_code === 'I' &&
            !industry.find((i) => i.bz_item === item.bz_item)
          ) {
            industry.push(item);
          }
        });
      product.sort((a, b) => b.bz_profit - a.bz_profit);
      industry.sort((a, b) => b.bz_profit - a.bz_profit);
      area.sort((a, b) => b.bz_profit - a.bz_profit);
      setData({ product, industry, area });
    }
  };

  useEffect(() => {
    if (!code || code === _code) {
      return;
    }
    _code = code;
    query(preQuarterEnd(Date.now()));
  }, [code]);

  return {
    period,
    data,
    contextHolder,
    toLeft: async () => {
      await query(nextQuarterEnd(period), true);
    },
    toRight: async () => {
      await query(preQuarterEnd(period));
    },
  };
};

export default useFinaMainbz;
