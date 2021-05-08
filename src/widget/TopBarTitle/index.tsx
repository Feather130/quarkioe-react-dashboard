import React from 'react';
import { DashboardConfigItem } from '@/global';
import classNames from 'classnames';
import styles from './index.less';

interface TopBarTitleProps extends DashboardConfigItem {
  config: {
    title: string
  }
}

const TopBarTitle: React.FC<TopBarTitleProps> = props => {
  const { config } = props;
  const { title } = config;
  return (
    <div style={{ height: '100%' }}>
      <div className={styles.titleText}>
        <div className={styles.bgLeft}>
          <div className={styles.bgLeft_1} />
          <div className={styles.bgLeft_2} />
          <div className={styles.bgLeft_3} />
        </div>
        <div className={classNames(styles.textContent, styles.header_title)}>{title}</div>
        <div className={styles.bgRight}>
          <div className={styles.bgRight_2} />
          <div className={styles.bgRight_3} />
          <div className={styles.bgRight_4} />
        </div>
      </div>
    </div>
  );
};

export default TopBarTitle
