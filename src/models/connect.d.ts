import { LoginModelState } from './login';
import { UserModelState } from './user';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    login?: boolean;
    user?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  login: LoginModelState;
  user: UserModelState;
}
