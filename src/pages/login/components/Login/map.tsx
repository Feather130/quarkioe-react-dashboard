import { LockTwoTone, UserOutlined, TeamOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.less';

export default {
  Tenant: {
    props: {
      size: 'large',
      id: 'tenant',
      prefix: <TeamOutlined className={styles.prefixIcon} />,
      placeholder: 'tenant',
    },
    rules: [
      {
        required: true,
        message: 'Please enter tenant!',
      },
    ],
  },
  UserName: {
    props: {
      size: 'large',
      id: 'userName',
      prefix: (
        <UserOutlined
          style={{
            color: '#1890ff',
          }}
          className={styles.prefixIcon}
        />
      ),
      placeholder: 'userName',
    },
    rules: [
      {
        required: true,
        message: 'Please enter username!',
      },
    ],
  },
  Password: {
    props: {
      size: 'large',
      prefix: <LockTwoTone className={styles.prefixIcon} />,
      type: 'password',
      id: 'password',
      placeholder: 'password',
    },
    rules: [
      {
        required: true,
        message: 'Please enter password!',
      },
    ],
  },
};
