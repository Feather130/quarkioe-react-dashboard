import React, { Suspense, ReactNode, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { Dashboard, DashboardConfigItem } from '@/global';
import WidgetTitle from '@/components/WidgetTitle';
import classNames from 'classnames';
import ErrorBoundaries from '@/components/ErrorBoundaries';

import styles from './index.less';

interface DashboardShowProps {
  config: Dashboard;
}

/*引入动态组件*/
const renderMode = (config: DashboardConfigItem): ReactNode => {
  const Component = React.lazy(() =>
    import(`@/widget/${config._mode}/index.tsx`),
  );
  return (
    <ErrorBoundaries>
      <Component config={config} />
    </ErrorBoundaries>
  );
};

const DashboardShow: React.FC<DashboardShowProps> = props => {
  /*声明组*/
  const { config } = props;
  const { clientWidth, clientHeight } = document.body;
  const { qk_dashboardConfig, qk_dashboardRange } = config;
  if (!qk_dashboardRange) {
    return <></>;
  }
  const [scaleWidth, setScaleWidth] = useState(
    clientWidth / qk_dashboardRange[0],
  );
  const [scaleHeight, setScaleHeight] = useState(
    clientHeight / qk_dashboardRange[1],
  );

  const handleResize = () => {
    const { clientWidth, clientHeight } = document.body;
    setScaleWidth(clientWidth / qk_dashboardRange[0]);
    setScaleHeight(clientHeight / qk_dashboardRange[1]);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {qk_dashboardConfig ? (
        <div
          style={{
            width: `${qk_dashboardRange[0]}px`,
            height: `${qk_dashboardRange[1]}px`,
            transformOrigin: 'left top',
            transform: `scale(${scaleWidth},${scaleHeight})`,
            backgroundColor: '#00111c',
          }}
        >
          {Object.keys(qk_dashboardConfig).map(item => (
            <div
              key={item}
              style={{
                zIndex: qk_dashboardConfig[item]._z,
                transform: `translate(${qk_dashboardConfig[item]._x}px, ${qk_dashboardConfig[item]._y}px)`,
                width: qk_dashboardConfig[item]._w,
                height: qk_dashboardConfig[item]._h,
                display: 'inline-block',
                position: 'absolute',
                userSelect: 'auto',
                top: 0,
                left: 0,
                cursor: 'move',
                boxSizing: 'border-box',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  height: '100%',
                }}
              >
                {qk_dashboardConfig[item]._showTitle ? (
                  <WidgetTitle title={qk_dashboardConfig[item]._title} />
                ) : null}
                <Suspense
                  fallback={
                    <div className={styles.spin}>
                      <Spin />
                    </div>
                  }
                >
                  <div
                    className={classNames({
                      [styles.widgetBorder]:
                        qk_dashboardConfig[item]._showBorder,
                    })}
                    style={{
                      height: qk_dashboardConfig[item]._showTitle
                        ? 'calc(100% - 46px)'
                        : '100%',
                      cursor: 'default',
                    }}
                  >
                    {renderMode(qk_dashboardConfig[item])}
                  </div>
                </Suspense>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default DashboardShow;
