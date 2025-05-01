import { useEffect, useState } from 'react';
import query_tushare from '../utils/query_tushare';

const stock_basic_field = [
  'ts_code',
  'name',
  'symbol',
  'area',
  'industry',
  'fullname',
  'enname',
  'cnspell',
  'market',
  'exchange',
  'curr_type',
  'list_status',
  'list_date',
  'delist_date',
  'is_hs',
  'act_name',
  'act_ent_type',
];

const stock_company_field = [
  'ts_code',
  'com_name',
  'com_id',
  'chairman',
  'manager',
  'secretary',
  'reg_capital',
  'setup_date',
  'province',
  'city',
  'introduction',
  'website',
  'email',
  'office',
  'business_scope',
  'employees',
  'main_business',
  'exchange',
  'ann_date',
];

const index_member_all_field = [
  'l1_code',
  'l1_name',
  'l2_code',
  'l2_name',
  'l3_code',
  'l3_name',
  'ts_code',
  'name',
  'in_date',
  'out_date',
  'is_new',
];

let _code = '';

const useBaseInfo = (code) => {
  const [stockList, setStockList] = useState([]);

  const query = async () => {
    const [res1, res2, res3] = await Promise.all([
      query_tushare('stock_basic', stock_basic_field, { ts_code: code }),
      query_tushare('stock_company', stock_company_field, { ts_code: code }),
      query_tushare('index_member_all', index_member_all_field, {
        ts_code: code,
      }),
    ]);

    setStockList({ ...res1[0], ...res2[0], ...res3[0] });
  };

  useEffect(() => {
    if (!code || code === _code) {
      return;
    }
    _code = code;
    query();
  }, [code]);

  return stockList;
};

export default useBaseInfo;
