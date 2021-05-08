import { Form } from 'antd';
import React from 'react';
import classNames from 'classnames';
import { FormInstance } from 'antd/es/form';
import { LoginParamsType } from '@/services/login';

import LoginContext from './LoginContext';
import LoginItem, { LoginItemProps } from './LoginItem';
import LoginSubmit from './LoginSubmit';
import styles from './index.less';

export interface LoginProps {
  style?: React.CSSProperties;
  onSubmit?: (values: LoginParamsType) => void;
  className?: string;
  from?: FormInstance;
  children: React.ReactElement<unknown>[];
}

interface LoginType extends React.FC<LoginProps> {
  Submit: typeof LoginSubmit;
  Tenant: React.FunctionComponent<LoginItemProps>;
  UserName: React.FunctionComponent<LoginItemProps>;
  Password: React.FunctionComponent<LoginItemProps>;
}

const Login: LoginType = props => {
  const { className } = props;
  const otherChildren: React.ReactElement<unknown>[] = [];
  React.Children.forEach(
    props.children,
    (child: React.ReactElement<unknown>) => {
      if (!child) {
        return;
      }
      otherChildren.push(child);
    },
  );
  return (
    <LoginContext.Provider value={{}}>
      <div className={classNames(className, styles.login)}>
        <Form
          form={props.from}
          onFinish={values => {
            if (props.onSubmit) {
              props.onSubmit(values as LoginParamsType);
            }
          }}
        >
          <React.Fragment>{otherChildren}</React.Fragment>
        </Form>
      </div>
    </LoginContext.Provider>
  );
};

Login.Submit = LoginSubmit;

Login.Tenant = LoginItem.Tenant;
Login.UserName = LoginItem.UserName;
Login.Password = LoginItem.Password;

export default Login;
