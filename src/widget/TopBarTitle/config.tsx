import React from 'react';
import { Form, Input } from 'antd';

const TopBarTitleConfig = () => {
  return (
    <Form.Item label="标题" name="title" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  );
};

export default TopBarTitleConfig;
