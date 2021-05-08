import React, { useState, MouseEvent, Suspense } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Spin,
  Space,
  Switch,
  InputNumber
} from "antd";
import { DashboardConfigItem } from "@/global";
import styles from "./index.less";

import widgetMenus from "@/widget/widgetMenus";
import ErrorBoundaries from "@/components/ErrorBoundaries";

const { Option } = Select;

export interface AddModalProps {
  title: string;
  onOk: (obj: object, id?: string) => void;
  id?: string;
  data?: DashboardConfigItem;
}

const AddModal: React.FC<AddModalProps> = props => {
  const { children, title, onOk, id, data } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [requiredTitle, setRequiredTitle] = useState<boolean>(true);
  const [selectMode, setSelectMode] = useState<string>("");
  const [SelectComponent, setSelectComponent] = useState<React.FC>(() => <></>);
  const [form] = Form.useForm();

  const dynamicImport = (e: string) => {
    const Component: React.FC = React.lazy(() =>
      import(`@/widget/${e}/config.tsx`)
    );
    setSelectComponent(Component);
  };

  const showModelHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    form.setFieldsValue({
      ...data,
      _mode: data ? data._mode : undefined,
      _title: data ? data._title : "",
      _w: data ? data._w : 100,
      _h: data ? data._h : 30,
      _x: data ? data._x : 0,
      _y: data ? data._y : 0,
      _z: data ? data._z : 0,
      _showTitle: data ? data._showTitle : true,
      _showBorder: data ? data._showBorder : true
    });
    setVisible(true);
    if (data) {
      const selectItem = widgetMenus.filter(item => item.name === data._mode);
      const { hasConfig } = selectItem[0];
      if (hasConfig) {
        setSelectMode(data ? data._mode : "");
        dynamicImport(data ? data._mode : "");
      }
      setRequiredTitle(data ? data._showTitle : true);
    }
  };
  const hideModelHandler = () => {
    setVisible(false);
    setLoading(false);
    setSelectMode("");
    setSelectComponent(() => <></>);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (id) {
        onOk(values, id);
      } else {
        onOk(values);
      }
      hideModelHandler();
    });
  };

  const changeMode = (e: string) => {
    const selectItem = widgetMenus.filter(item => item.name === e);
    const { hasConfig } = selectItem[0];
    if (hasConfig) {
      setSelectMode(e);
      dynamicImport(e);
    }
  };

  const changeShowTitle = (checked: boolean) => {
    setRequiredTitle(checked);
  };

  return (
    <>
      <div onClick={showModelHandler}>{children}</div>
      <Modal
        title={title}
        visible={visible}
        onCancel={hideModelHandler}
        onOk={handleOk}
        confirmLoading={loading}
        maskClosable={false}
        destroyOnClose
        okText='确认'
        cancelText='取消'
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item label="标题" name="_title" rules={[{ required: requiredTitle }]}>
            <Input placeholder="请输入..." />
          </Form.Item>
          <Space className={styles.config} align="baseline">
            <Form.Item label="宽度" name="_w">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="请输入..."
                min={100}
              />
            </Form.Item>
            <Form.Item label="高度" name="_h">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="请输入..."
                min={30}
              />
            </Form.Item>
          </Space>
          <Space className={styles.config} align="baseline">
            <Form.Item label="水平位置" name="_x">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="请输入..."
                min={0}
              />
            </Form.Item>
            <Form.Item label="垂直位置" name="_y">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="请输入..."
                min={0}
              />
            </Form.Item>
            <Form.Item label="层级" name="_z">
              <InputNumber style={{ width: "100%" }} placeholder="请输入..." />
            </Form.Item>
          </Space>
          <Space className={styles.config} align="baseline">
            <Form.Item
              label="是否显示标题"
              name="_showTitle"
              valuePropName="checked"
            >
              <Switch checkedChildren="显示" unCheckedChildren="隐藏" onChange={changeShowTitle} />
            </Form.Item>
            <Form.Item
              label="是否显示边框"
              name="_showBorder"
              valuePropName="checked"
            >
              <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
            </Form.Item>
          </Space>
          <Form.Item label="选择组件" name="_mode" rules={[{ required: true }]}>
            <Select placeholder="请选择..." onChange={changeMode}>
              {widgetMenus.map(item => (
                <Option key={item.id} value={item.name}>
                  {item.alias}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Suspense
            fallback={
              <div className={styles.spin}>
                <Spin />
              </div>
            }
          >
            <ErrorBoundaries>
              {selectMode ? <SelectComponent /> : null}
            </ErrorBoundaries>
          </Suspense>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
