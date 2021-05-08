import React, { useEffect, useState, Suspense, ReactNode } from "react";
import { Tooltip, Spin, Modal, Menu, Dropdown } from "antd";
import { useParams, connect, Dispatch, Prompt, Link } from "umi";
import { DraggableData, Rnd } from "react-rnd";
import {
  PlusOutlined,
  CloudUploadOutlined,
  RollbackOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  DeleteOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { DashboardEditModelState } from "./models";
import { DashboardEditConnectState } from "./data";
import { DashboardConfigItem } from "@/global";
import classNames from "classnames";

import AddModal from "./components/AddModal";
import styles from "./index.less";
import WidgetTitle from "@/components/WidgetTitle";
import ErrorBoundaries from "@/components/ErrorBoundaries";

interface DashboardEditProps {
  dispatch: Dispatch;
  dvaData: DashboardEditModelState;
}

/*引入动态组件*/
const renderMode = (config: DashboardConfigItem): ReactNode => {
  const Component = React.lazy(() =>
    import(`@/widget/${config._mode}/index.tsx`)
  );
  return (
    <ErrorBoundaries>
      <Component config={config} />
    </ErrorBoundaries>
  );
};

const { confirm } = Modal;

const DashboardEdit: React.FC<DashboardEditProps> = props => {
  /*声明组*/
  const { dispatch, dvaData } = props;
  const { dashboardConfig, dashboardRange } = dvaData;
  const routerParams = useParams();
  const { id: dashboardId } = routerParams as { id: string };
  const [isChange, setIsChange] = useState(false);

  /*dispatch组*/
  const onOk = async (values: object) => {
    await dispatch({
      type: "dashboardEdit/add",
      payload: values
    });
    setIsChange(true);
  };
  const onEdit = async (values: object, id?: string) => {
    await dispatch({
      type: "dashboardEdit/edit",
      payload: {
        id,
        value: values
      }
    });
    setIsChange(true);
  };
  const onDelete = async (id: string) => {
    await dispatch({
      type: "dashboardEdit/deleteOnly",
      payload: id
    });
    setIsChange(true);
  };
  const onResizeStop = async (item: string, ref: HTMLElement) => {
    await dispatch({
      type: "dashboardEdit/edit",
      payload: {
        id: item,
        value: {
          _w: ref.style.width,
          _h: ref.style.height
        }
      }
    });
    setIsChange(true);
  };
  const onDragStop = (item: string, d: DraggableData) => {
    dispatch({
      type: "dashboardEdit/edit",
      payload: {
        id: item,
        value: {
          _x: d.x,
          _y: d.y
        }
      }
    });
    setIsChange(true);
  };
  const onPublishOk = async () => {
    await dispatch({
      type: "dashboardEdit/publish",
      payload: {
        dashboardId,
        dashboardConfig
      }
    });
    //TODO message状态
    setIsChange(false);
  };

  /*使用组*/
  const onPublish = (id: number | string) => {
    confirm({
      title: `确定要发布到${id}上吗`,
      okText: "确认",
      cancelText: "取消",
      icon: <QuestionCircleOutlined />,
      onOk: onPublishOk
    });
  };
  const onMenu = (e: any, id: string) => {
    const { key } = e;
    if (key === "delete") {
      confirm({
        title: `确定要移除该小部件吗`,
        okText: "确认",
        cancelText: "取消",
        icon: <QuestionCircleOutlined />,
        onOk: () => onDelete(id)
      });
    }
  };

  const menu = (item: string) => (
    <Menu className="cancel" onClick={(e) => onMenu(e, item)}>
      <Menu.Item key="setting">
        <AddModal title="编辑小部件" id={item} data={dashboardConfig[item]} onOk={onEdit}>
          <SettingOutlined /> 编辑
        </AddModal>
      </Menu.Item>
      <Menu.Item key="delete">
        <div>
          <DeleteOutlined /> 删除
        </div>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "dashboardEdit/getDashboardById",
        payload: dashboardId
      });
    }
    return () => {
      dispatch({
        type: "dashboardEdit/clear"
      });
    };
  }, [dashboardId]);

  return (
    <div className={styles.editRoot}>
      <Prompt when={isChange} message="页面尚未发布，你确定要离开么？" />
      <div className={styles.top}>
        <div className={styles.setting}>
          <AddModal title="添加小部件" onOk={onOk}>
            <Tooltip title="添加">
              <PlusOutlined />
            </Tooltip>
          </AddModal>
          <div onClick={() => onPublish(dashboardId)}>
            <Tooltip title="发布">
              <CloudUploadOutlined />
            </Tooltip>
          </div>
          <div>
            <Link to={`/dashboard/${dashboardId}/show`} target="_blank">
              <Tooltip title="预览">
                <EyeOutlined />
              </Tooltip>
            </Link>
          </div>
          <div>
            <Link to="/home">
              <Tooltip title="返回">
                <RollbackOutlined />
              </Tooltip>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.rangeDiv}
             style={{ width: dashboardRange[0] + "px", height: dashboardRange[1] + "px" }}>
          {Object.keys(dashboardConfig).map(item => (
            <Rnd
              key={item}
              size={{
                width: dashboardConfig[item]._w,
                height: dashboardConfig[item]._h
              }}
              position={{
                x: dashboardConfig[item]._x,
                y: dashboardConfig[item]._y
              }}
              style={{
                zIndex: dashboardConfig[item]._z
              }}
              minWidth={100}
              minHeight={30}
              onResizeStop={(e, direction, ref) => onResizeStop(item, ref)}
              onDragStop={(e, d) => onDragStop(item, d)}
              bounds="parent"
              cancel=".cancel,.ant-modal-root"
              enableResizing={{
                top: false,
                right: false,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: true,
                bottomLeft: false,
                topLeft: false
              }}
              resizeHandleWrapperClass={styles.resizeWrapper}
              resizeHandleComponent={{
                bottomRight: <span className={styles.resizeStyle}></span>
              }}
              className={styles.resizeHover}
            >
              <div className={classNames({ cancel: dashboardConfig[item]._showTitle }, styles.rndSetting)}>
                <Dropdown overlay={() => menu(item)} trigger={["click"]} placement="bottomCenter">
                  <SettingOutlined />
                </Dropdown>
              </div>
              <div style={{ height: "100%" }}>
                {dashboardConfig[item]._showTitle ? (
                  <WidgetTitle title={dashboardConfig[item]._title} />
                ) : null}
                <Suspense
                  fallback={
                    <div className={styles.spin}>
                      <Spin />
                    </div>
                  }
                >
                  <div
                    className={classNames("cancel", {
                      [styles.widgetBorder]: dashboardConfig[item]._showBorder
                    })}
                    style={{
                      height: dashboardConfig[item]._showTitle ? "calc(100% - 46px)" : "100%",
                      cursor: "default"
                    }}>
                    {renderMode(dashboardConfig[item])}
                  </div>
                </Suspense>
              </div>
            </Rnd>
          ))}
        </div>
      </div>
    </div>
  );
};

export default connect(({ dashboardEdit }: DashboardEditConnectState) => ({
  dvaData: dashboardEdit
}))(DashboardEdit);
