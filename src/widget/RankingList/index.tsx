import React from 'react';
import { DashboardConfigItem } from '@/global';
import styles from './index.less';

interface RankingListProps extends DashboardConfigItem {
  config: {
    column: [
      {
        key: string;
        value: string;
      },
    ];
  };
}

const RankingList: React.FC<RankingListProps> = props => {
  const { config, data } = props;
  const { column } = config;

  return (
    <div className={styles.content}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>排名</th>
            {column?.map(({ key }: { key: string }) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data?.map((item: any, index: number) => (
            <tr>
              <td>第{index + 1}名</td>
              {column?.map(({ value }: { value: string }) => (
                <td>{item[value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingList;
