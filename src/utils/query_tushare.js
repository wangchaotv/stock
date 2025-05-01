import { round } from 'mathjs';

// query_tushare 方法的配套
const trans = (data) => {
  const yi = [];
  const wan = ['circ_mv', 'total_mv'];

  const { fields, items } = data;
  return items.map((item) => {
    const obj = {};
    item.forEach((value, index) => {
      const key = fields[index];
      if (value !== null) {
        if (yi.includes(key)) {
          // 处理成以亿为单位
          obj[key] = round(value / 100000000, 0);
        } else if (wan.includes(key)) {
          // 处理成以万为单位
          obj[key] = round(value / 10000, 0);
        } else if (typeof value === 'number') {
          obj[key] = round(value, 1);
        } else {
          obj[key] = value;
        }
      }
    });
    return obj;
  });
};

//  查询tushare，入参和返回值格式固定，返回值处理后 return
/**
 * @param {*} api_name
 * @param {*} fields ['ts_code', 'end_date', '']
 * @param {*} params { ts_code: '', }
 * @returns [{ ts_code: '', end_date: '' }, { ... }, { ... }]
 */
export default async (api_name, fields, params) => {
  return fetch(`${window.location.protocol}//api.tushare.pro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_name,
      fields,
      params,
      token: 'fe77ac557743da478707c151abbe7b8f2dbdee278c983b2c82907827',
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      const data = response.data;
      if (!data) {
        throw new Error(response?.msg);
      }
      const items = data.items;
      if (Array.isArray(items)) {
        return trans(data);
      } else {
        throw new Error(`items type is ${typeof items}`);
      }
    })
    .catch((error) => {
      const hint = `catch fetch(${api_name}，${params.ts_code}) error：${error.message}`;
      console.error(hint);
      return null;
    });
};
