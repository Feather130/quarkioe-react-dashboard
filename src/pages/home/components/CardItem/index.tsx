import React from 'react';
import { Row, Col } from 'antd';
import { history } from 'umi';
import { Dashboard } from '@/global';
import AddDashboardModal from './modal';

import { PlusOutlined } from '@ant-design/icons';

import styles from '../../index.less';

export interface CardItemProps {
  dashboardList: Array<Dashboard>;
  onOk: (obj: object, fn: () => void) => void;
}

const CardItem: React.FC<CardItemProps> = props => {
  const { dashboardList, onOk } = props;

  return (
    <Row gutter={[30, 30]}>
      <Col xs={20} sm={16} md={12} lg={8} xl={4} xxl={4}>
        <AddDashboardModal title="创建Dashboard" onOk={onOk}>
          <div className={styles.addCardItem}>
            <PlusOutlined />
          </div>
        </AddDashboardModal>
      </Col>
      {dashboardList.map(item => (
        <Col key={item.id} xs={20} sm={16} md={12} lg={8} xl={4} xxl={4}>
          <div
            className={styles.cardItemContent}
            onClick={() => history.push(`/dashboard/${item.id}/edit`)}
          >
            <div className={styles.cardItemImg}>{item.id}</div>
            <div className={styles.cardItemName}> {item.name} </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default CardItem;
