import { Divider } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import ShowNumber from '../components/ShowNumber';
import ShowPercentage from '../components/ShowPercentage';

const TR = (props) => {
  const { name, data, valueKey, fenmu = 'total_assets' } = props;
  return (
    <tr>
      <td>{name}</td>
      {data.map((item) => {
        return (
          <td key={item.end_date}>
            <ShowNumber number={item[valueKey]} />
          </td>
        );
      })}
      <td>
        {fenmu && (
          <ShowPercentage
            fenzi={data?.at(-1)?.[valueKey]}
            fenmu={data?.at(-1)?.[fenmu]}
          />
        )}
      </td>
    </tr>
  );
};

const Balancesheet = (props) => {
  const [showCount, setShowCount] = useState(8);
  const balancesheet = props.balancesheet || {};
  console.log(balancesheet);

  let data = balancesheet?.yearData?.slice(0, showCount) || [];

  data = data.sort((a, b) => a.end_date - b.end_date);

  return (
    <div>
      <Divider orientation="left">资产负债表</Divider>
      <table className="my-table">
        <thead>
          <tr>
            <th>科目</th>
            {data.map((item, index) => {
              return (
                <th
                  key={item.end_date}
                  colSpan={index === data.length - 1 ? 2 : 1}
                >
                  {dayjs(item.end_date).format('YYYY')}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <TR name="资产总计" data={data} valueKey="total_assets" />
          <TR name="流动资产合计" data={data} valueKey="total_cur_assets" />
          <TR name="非流动资产合计" data={data} valueKey="total_nca" />
          <tr>
            <td colSpan={showCount + 2}>&nbsp;</td>
          </tr>
          <TR
            name="股东权益合计"
            data={data}
            valueKey="total_hldr_eqy_inc_min_int"
          />
          <TR name="负债合计" data={data} valueKey="total_liab" />
          <TR name="流动负债合计" data={data} valueKey="total_cur_liab" />
          <TR name="非流动负债合计" data={data} valueKey="total_ncl" />
          <tr>
            <td colSpan={showCount + 2}>&nbsp;</td>
          </tr>
          <tr>
            <td colSpan={showCount + 2} className="td-title">
              流动资产
            </td>
          </tr>
          <TR name="货币资金" data={data} valueKey="money_cap" />
          <TR name="应收票据" data={data} valueKey="notes_receiv" />
          <TR name="应收账款" data={data} valueKey="accounts_receiv" />
          <TR name="应收款项融资" data={data} valueKey="receiv_financing" />
          <TR name="预付款项" data={data} valueKey="prepayment" />
          <TR name="应收利息" data={data} valueKey="int_receiv" />
          <TR name="应收股利" data={data} valueKey="div_receiv" />
          <TR name="其他应收款" data={data} valueKey="oth_receiv" />
          <TR name="存货" data={data} valueKey="inventories" />
          <TR name="持有待售的资产" data={data} valueKey="hfs_assets" />
          <TR
            name="一年内到期的非流动资产"
            data={data}
            valueKey="nca_within_1y"
          />
          <TR name="其他流动资产" data={data} valueKey="oth_cur_assets" />
          <tr>
            <td colSpan={showCount + 2}>&nbsp;</td>
          </tr>
          <tr>
            <td colSpan={showCount + 2} className="td-title">
              固定资产
            </td>
          </tr>
          <TR name="固定资产" data={data} valueKey="fix_assets" />
        </tbody>
      </table>
    </div>
  );
};

export default Balancesheet;
