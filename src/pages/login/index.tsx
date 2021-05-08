import { Alert } from 'antd';
import React from 'react';
import { connect, Dispatch } from 'umi';
import { LoginModelState } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginForm from './components/Login';

import styles from './index.less';

const { Tenant, UserName, Password, Submit } = LoginForm;

interface LoginProps {
  dispatch: Dispatch;
  userLogin: LoginModelState;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = props => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };
  return (
    <div className={styles.main}>
      <LoginForm onSubmit={handleSubmit}>
        <>
          {status === 'error' && !submitting && (
            <LoginMessage content="账户或密码错误" />
          )}
          <Tenant
            name="tenant"
            placeholder="租户名"
            rules={[
              {
                required: true,
                message: '请输入租户名',
              },
            ]}
          />
          <UserName
            name="userName"
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </>

        <div>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
