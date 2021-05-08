import { Layout, Tooltip, Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { CurrentUser } from '@/models/user';
import { ConnectState } from '@/models/connect';
import { HomeModelState } from './models/home';
import { HomeConnectState } from './data';

import styles from './index.less';
import CardItem from './components/CardItem';

const { Header, Content } = Layout;

interface HomeProps {
  dispatch: Dispatch;
  currentUser: CurrentUser;
  dvaData: HomeModelState;
}

const Home: React.FC<HomeProps> = props => {
  const { dispatch, currentUser, dvaData } = props;
  const { dashboardList } = dvaData;
  const { tenant, id } = currentUser;

  const logout = () => {
    if (dispatch) {
      dispatch({
        type: 'login/logout',
      });
    }
  };

  const onOk = (values: object, hideFun: () => void): void => {
    dispatch({
      type: 'home/createOnly',
      payload: values,
    }).then(() => {
      if (hideFun && typeof hideFun === 'function') {
        hideFun();
      }
    });
  };

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/currentUserEffect',
      });
      dispatch({
        type: 'home/getDashboardList',
      });
    }
  }, []);
  return (
    <Layout className={styles.Layout}>
      <Header className={styles.header}>
        <div className={styles.logoText}>Dashboard 工作台</div>
        <div className={styles.rightContent}>
          <span className={styles.action}>
            {tenant}/{id}
          </span>
          <Tooltip
            placement="bottom"
            title="退出登陆"
            className={styles.action}
          >
            <Button type="text" onClick={logout}>
              <PoweroffOutlined />
            </Button>
          </Tooltip>
        </div>
      </Header>
      <Content className={styles.content}>
        <CardItem dashboardList={dashboardList} onOk={onOk} />
      </Content>
    </Layout>
  );
};

export default connect(
  ({ user, home, loading }: ConnectState & HomeConnectState) => ({
    currentUser: user.currentUser,
    dvaData: home,
    loading: loading.effects['user/currentUserEffect'],
  }),
)(Home);
