import { Reducer, Effect } from 'umi';
import { Dashboard } from '@/global';
import { buildQuery } from '@/utils/utils';
import { queryDashboardList, addDashboard } from '../services/home';

export interface HomeModelState {
  dashboardList: Array<Dashboard>;
}

export interface HomeModelType {
  namespace: 'home';
  state: HomeModelState;
  effects: {
    getDashboardList: Effect;
    createOnly: Effect;
  };
  reducers: {
    saveDashboardList: Reducer<HomeModelState>;
    saveOnlyReducers: Reducer<HomeModelState>;
  };
}

const Model: HomeModelType = {
  namespace: 'home',
  state: {
    dashboardList: [],
  },
  effects: {
    *getDashboardList(_, { call, put }) {
      const response = yield call(queryDashboardList, {
        query: buildQuery({
          __filter: {
            type: 'qk_dashboard',
          },
        }),
        fields: 'id,c8y_Global,type,name,qk_dashboardConfig,qk_dashboardRange,qk_symbol',
        pageSize: 50,
      });
      if (response.data) {
        yield put({
          type: 'saveDashboardList',
          payload: response.data.managedObjects,
        });
      }
    },
    *createOnly({ payload }, { call, put }) {
      const response = yield call(addDashboard, payload);
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
    saveDashboardList(state, { payload }) {
      return {
        ...(state as HomeModelState),
        dashboardList: [...payload],
      };
    },
    saveOnlyReducers(state = { dashboardList: [] }, { payload }) {
      return {
        ...(state as HomeModelState),
        dashboardList: [payload.data, ...state.dashboardList],
      };
    },
  },
};

export default Model;
