interface widgetMenusType {
  id: number;
  name: string;
  alias: string;
  hasConfig: boolean;
}

const widgetMenus: Array<widgetMenusType> = [
  {
    id: 1,
    name: 'TopBarTitle',
    alias: '顶栏标题',
    hasConfig: true,
  },
  {
    id: 2,
    name: 'DigitalClock',
    alias: '数字时钟',
    hasConfig: false,
  },
  {
    id: 3,
    name: 'hello3',
    alias: '测试3',
    hasConfig: false,
  },
  {
    id: 4,
    name: 'RadarChart',
    alias: '雷达图',
    hasConfig: true,
  },
  {
    id: 5,
    name: 'RankingList',
    alias: '排行榜',
    hasConfig: true,
  },
];
export default widgetMenus;
