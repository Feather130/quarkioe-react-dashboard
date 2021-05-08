import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

interface TitleProp extends React.AllHTMLAttributes<any> {
  title: string;
  extra?: React.ReactNode;
}

const WidgetTitle: React.FC<TitleProp> = (props) => {
  return (
    <div className={classNames(styles.titleContent, props.className)}>
      <div className={styles.title}>
        <span className={styles.dot} />
        <span>{props.title}</span>
        <span className={styles.dot} />
      </div>
      <div>{props.extra}</div>
    </div>
  );
};

export default WidgetTitle;
