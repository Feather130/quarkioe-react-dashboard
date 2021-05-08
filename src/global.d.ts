import ex from 'umi/dist';

export type DashboardType = 'name' | 'type' | 'id';

export interface DashboardConfigItem {
  _mode: string;
  _title: string;
  _w: number;
  _h: number;
  _x: number;
  _y: number;
  _z: number;
  _showTitle: boolean;
  _showBorder: boolean;

  [key: string]: any;
}

export interface DashboardConfig {
  [key: string]: DashboardConfigItem;
}

export interface Dashboard {
  readonly id?: number;
  readonly c8y_Global?: {};
  readonly type?: 'qk_dashboard';
  name: string;
  qk_dashboardConfig: DashboardConfig;
  qk_dashboardRange: [number, number];
  qk_symbol: {
    type: DashboardType;
    value: string | number;
  };
}
