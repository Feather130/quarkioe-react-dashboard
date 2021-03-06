import { Input, Form } from 'antd';
import React, { useState } from 'react';
import { FormItemProps } from 'antd/es/form/FormItem';

import ItemMap from './map';
import LoginContext from './LoginContext';

export type WrappedLoginItemProps = LoginItemProps;
export type LoginItemKeyType = keyof typeof ItemMap;

export interface LoginItemType {
  Tenant: React.FC<WrappedLoginItemProps>;
  UserName: React.FC<WrappedLoginItemProps>;
  Password: React.FC<WrappedLoginItemProps>;
}

export interface LoginItemProps extends Partial<FormItemProps> {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  buttonText?: React.ReactNode;
  countDown?: number;
  type?: string;
  defaultValue?: string;
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormItem = Form.Item;

const getFormItemOptions = ({
  onChange,
  defaultValue,
  customProps = {},
  rules,
}: LoginItemProps) => {
  const options: {
    rules?: LoginItemProps['rules'];
    onChange?: LoginItemProps['onChange'];
    initialValue?: LoginItemProps['defaultValue'];
  } = {
    rules: rules || (customProps.rules as LoginItemProps['rules']),
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  return options;
};

const LoginItem: React.FC<LoginItemProps> = props => {
  const [count, setCount] = useState<number>(props.countDown || 0);
  // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
  const {
    onChange,
    customProps,
    defaultValue,
    rules,
    name,
    type,
    ...restProps
  } = props;

  if (!name) {
    return null;
  }
  // get getFieldDecorator props
  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  return (
    <FormItem name={name} {...options}>
      <Input {...customProps} {...otherProps} />
    </FormItem>
  );
};

const LoginItems: Partial<LoginItemType> = {};

Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItems[key] = (props: LoginItemProps) => (
    <LoginContext.Consumer>
      {context => (
        <LoginItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItems as LoginItemType;
