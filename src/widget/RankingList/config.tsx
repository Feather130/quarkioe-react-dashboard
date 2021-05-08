import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const RankingListConfig = () => {
  return (
    <Form.List name="column">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Space
              key={field.key}
              style={{ display: 'flex', marginBottom: 5 }}
              align="baseline"
            >
              <Form.Item
                {...field}
                name={[field.name, 'key']}
                fieldKey={[field.fieldKey, 'key']}
                rules={[{ required: true, message: '请输入表头' }]}
              >
                <Input placeholder="表头" />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'value']}
                fieldKey={[field.fieldKey, 'value']}
                rules={[{ required: true, message: '请输入表头对应数据' }]}
              >
                <Input placeholder="表头对应数据" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(field.name)} />
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              添加表头
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default RankingListConfig;
