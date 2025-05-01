import { useEffect, useState } from 'react';
import query_tushare from '../utils/query_tushare';

let lock = false;

const useStockList = () => {
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    if (lock) {
      return;
    }
    lock = true;
    query_tushare('stock_basic', ['ts_code', 'name'], {}).then((data) => {
      setStockList(
        data.map((item) => {
          return {
            label: item.name,
            value: item.ts_code,
          };
        })
      );
    });
  }, []);

  return stockList;
};

export default useStockList;
