import { history, Reducer, Effect } from 'umi';
import { stringify } from 'querystring';

import { accountLogin } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { setAuthority, clearAuthority } from '@/utils/authority';

export interface LoginModelState {
  status?: 'ok' | 'error';
}

export interface LoginModelType {
  namespace: string;
  state: LoginModelState;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<LoginModelState>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if (response.data) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        yield put({
          type: 'changeLoginStatus',
          payload: {
            token: payload,
            status: 'ok',
          },
        });
        history.replace(redirect || '/');
      }
    },
    logout(_, { put }) {
      const { redirect } = getPageQuery();
      clearAuthority();
      window.location.reload();
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.status === 'ok') {
        setAuthority(payload.token);
      }
      return { ...state, status: payload.status };
    },
  },
};

export default Model;
