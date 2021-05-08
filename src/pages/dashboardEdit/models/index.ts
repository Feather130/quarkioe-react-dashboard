import { Reducer, Effect } from 'umi';
import { DashboardConfig } from '@/global';
import { getDashboard, sendDashboard } from '../services';
import { randomWord } from '@/utils/utils';

export interface DashboardEditModelState {
  dashboardConfig: DashboardConfig;
  dashboardRange: [number, number]
}

export interface DashboardEditModelType {
  namespace: 'dashboardEdit';
  state: DashboardEditModelState;
  effects: {
    getDashboardById: Effect;
    add: Effect;
    edit: Effect;
    publish: Effect;
    clear: Effect;
    deleteOnly: Effect;
  };
  reducers: {
    saveDashboardContent: Reducer<DashboardEditModelState>;
    saveOnlyReducers: Reducer<DashboardEditModelState>;
    editOnly: Reducer<DashboardEditModelState>;
    clearDashboardContent: Reducer<DashboardEditModelState>;
    deleteOnlyWidget: Reducer<DashboardEditModelState>;
  };
}

const Model: DashboardEditModelType = {
  namespace: 'dashboardEdit',
  state: {
    dashboardConfig: {},
    dashboardRange: [0, 0],
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
    * add({ payload }, { put }) {
      const key = randomWord(16);
      yield put({
        type: 'saveDashboardContent',
        payload: {
          data: {
            [key]: payload,
          },
        },
      });
    },
    * edit({ payload }, { put }) {
      yield put({
        type: 'editOnly',
        payload: {
          data: payload,
        },
      });
    },
    * clear(_, { put }) {
      yield put({
        type: 'clearDashboardContent',
      });
    },
    * deleteOnly({ payload }, { put }) {
      yield put({
        type: 'deleteOnlyWidget',
        payload: {
          data: payload,
        },
      });
    },
    * publish({ payload }, { call }) {
      const response = yield call(sendDashboard, payload.dashboardId, {
        qk_dashboardConfig: payload.dashboardConfig,
      });
      if (response.data) {
        return true;
      }
      return false;
    },
  },
  reducers: {
    saveDashboardContent(state, { payload }) {
      return {
        ...(state as DashboardEditModelState),
        dashboardConfig: {
          ...state?.dashboardConfig,
          ...payload.data,
        },
      };
    },
    clearDashboardContent(state) {
      return {
        ...(state as DashboardEditModelState),
        dashboardConfig: {},
        dashboardRange: [0, 0],
      };
    },
    saveOnlyReducers(state, { payload }) {
      return {
        ...(state as DashboardEditModelState),
        dashboardConfig: { ...payload.data.qk_dashboardConfig },
        dashboardRange: payload.data.qk_dashboardRange,
      };
    },
    editOnly(state, { payload }) {
      return {
        ...(state as DashboardEditModelState),
        dashboardConfig: {
          ...state?.dashboardConfig,
          [payload.data.id]: {
            ...state?.dashboardConfig[payload.data.id],
            ...payload.data.value,
          },
        },
      };
    },
    deleteOnlyWidget(state, { payload }) {
      const dashboardConfig = { ...state?.dashboardConfig };
      Reflect.deleteProperty(dashboardConfig, payload.data);
      return {
        ...(state as DashboardEditModelState),
        dashboardConfig,
      };
    },
  },
};

export default Model;
