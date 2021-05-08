import React, { useEffect } from 'react';
import { useParams } from 'umi';
import { connect, Dispatch } from 'umi';
import { Dashboard1ModelState } from './models';
import { Dashboard1ConnectState } from './data';
import DashboardShow from '@/components/DashboardShow';

interface Dashboard1Props {
  dispatch: Dispatch;
  dvaData: Dashboard1ModelState;
}

const Dashboard1: React.FC<Dashboard1Props> = props => {
  const { dispatch, dvaData } = props;
  const { dashboardObj } = dvaData;
  const routerParams = useParams();
  const { id: dashboardId } = routerParams as { id: string };

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'dashboard1/getDashboardById',
        payload: dashboardId,
      });
    }
  }, [dashboardId]);

  return <DashboardShow config={dashboardObj} />;
};

export default connect(({ dashboard1 }: Dashboard1ConnectState) => ({
  dvaData: dashboard1,
}))(Dashboard1);
