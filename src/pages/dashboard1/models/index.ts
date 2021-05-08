import { Reducer, Effect } from 'umi';
import { Dashboard } from '@/global';
import { getDashboard } from '../services';

export interface Dashboard1ModelState {
  dashboardObj: Dashboard
}

export interface Dashboard1ModelType {
  namespace: 'dashboard1';
  state: Dashboard1ModelState;
  effects: {
    getDashboardById: Effect;
  };
  reducers: {
    saveOnlyReducers: Reducer<Dashboard1ModelState>;
  };
}

const Model: Dashboard1ModelType = {
  namespace: 'dashboard1',
  state: {
    dashboardObj: {} as Dashboard,
  },
  effects: {
    * getDashboardById({ payload }, { call, put }) {
      const response = yield call(getDashboard, payload);
      if (response.data) {
        yield put({
          type: 'saveOnlyReducers',
          payload: {
            data: response.data,
          },
        });
      }
    },
  },
  reducers: {
    saveOnlyReducers(state, { payload }) {
      return {
        ...(state as Dashboard1ModelState),
        dashboardObj: { ...payload.data },
      };
    },
  },
};

export default Model;
