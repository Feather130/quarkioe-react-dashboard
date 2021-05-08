import React, { useState, MouseEvent } from 'react';
import { Modal, Form, Input, Select, InputNumber, Space } from 'antd';
import { Dashboard, DashboardType } from '@/global';
import styles from './index.less';

const { Option } = Select;

export interface AddDashboardProps {
  title: string;
  onOk: (obj: object, fn: () => void) => void;
}

const AddDashboardModal: React.FC<AddDashboardProps> = props => {
  const { children, title, onOk } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectType, setSelectType] = useState<string>('name');
  const [form] = Form.useForm();

  const showModelHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setVisible(true);
    form.resetFields();
  };
  const hideModelHandler = () => {
    setVisible(false);
    setLoading(false);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const obj: Dashboard = {
        name: values.name,
        qk_symbol: {
          type: values.mode,
          value: values[values.mode],
        },
        c8y_Global: {},
        qk_dashboardRange: [values.w, values.h],
        type: 'qk_dashboard',
        qk_dashboardConfig: {},
      };
      setLoading(true);
      onOk(obj, hideModelHandler);
    });
  };

  const changeType = (v: DashboardType) => {
    setSelectType(v);
  };

  return (
    <>
      <span onClick={showModelHandler}>{children}</span>
      <Modal
        title={title}
        visible={visible}
        onCancel={hideModelHandler}
        onOk={handleOk}
        confirmLoading={loading}
        maskClosable={false}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            mode: selectType,
            w: 1920,
            h: 1080,
          }}
        >
          <Form.Item label="名称" name="name" rules={[{ required: true }]}>
            <Input placeholder="请输入..." />
          </Form.Item>
          <Space className={styles.config} align="baseline">
            <Form.Item label="页面宽度" name="w">
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入..."
                min={1024}
              />
            </Form.Item>
            <Form.Item label="页面高度" name="h">
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入..."
                min={768}
              />
            </Form.Item>
          </Space>
          <Form.Item label="创建方式" name="mode" rules={[{ required: true }]}>
            <Select placeholder="请选择..." onChange={changeType}>
              <Option value="name">按名称创建</Option>
              <Option value="type">按类型创建</Option>
              <Option value="id">按ID创建</Option>
            </Select>
          </Form.Item>
          {selectType === 'type' ? (
            <Form.Item label="类型" name="type" rules={[{ required: true }]}>
              <Input placeholder="请输入..." />
            </Form.Item>
          ) : null}
          {selectType === 'id' ? (
            <Form.Item label="ID" name="id" rules={[{ required: true }]}>
              <InputNumber placeholder="请输入..." style={{ width: '100%' }} />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </>
  );
};

export default AddDashboardModal;
