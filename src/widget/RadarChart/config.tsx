import React from 'react';
import { Form, Input } from 'antd';

const RadarChartConfig = () => (
  <Form.Item label="标题" name="title" rules={[{required: true}]}>
    <Input />
  </Form.Item>
)

export default RadarChartConfig;
