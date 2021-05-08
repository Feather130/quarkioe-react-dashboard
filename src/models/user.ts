import { Reducer, Effect } from 'umi';

import { queryCurrent } from '@/services/user';

export interface CurrentUser {
  tenant: string;
  id: string;
}

export interface UserModelState {
  currentUser: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    currentUserEffect: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
}

const Model: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {
      tenant: '',
      id: '',
    },
  },
  effects: {
    *currentUserEffect(_, { call, put }) {
      const response = yield call(queryCurrent);
      if (response.data) {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, { payload }) {
      return {
        ...(state as UserModelState),
        currentUser: {
          id: payload.id,
          tenant: payload.self.match(/\/user\/(\w+)\//)[1],
        },
      };
    },
  },
};

export default Model;
