import React from 'react';
import { DashboardConfigItem } from '@/global';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/radar';

interface RadarChartProps extends DashboardConfigItem {
  config: {
    title: string
  }
}

const RadarChart: React.FC<RadarChartProps> = props => {
  const { config } = props;
  const { title } = config;

  const option = {
    title: {
      text: title,
      textStyle: {
        color: '#fff'
      },
      left: 'center',
      top: '10%'
    },
    tooltip: {},
    color: ['#11CEDA'],
    radar: {
      name: {
        textStyle: {
          color: '#999FA4'
        }
      },
      center: ['50%', '60%'],
      radius: '60%',
      axisLine: {
        lineStyle: {
          color: '#1C518A'
        }
      },
      splitArea: {
        areaStyle: {
          color: ['transparent', '#0E6D84']
        }
      },
      splitLine: {
        lineStyle: {
          color: '#1C518A'
        }
      },
      indicator: [
        { name: '未激活', max: 100},
        { name: '已激活', max: 100},
        { name: '已销户', max: 100},
        { name: '已暂停', max: 100},
        { name: '测试期', max: 100},
      ]
    },
    series: [{
      type: 'radar',
      data: [{
          value: [30, 10, 20, 30, 50],
          name: '预算分配（Allocated Budget）'
      }],
      areaStyle: {
        color: 'rgba(17, 206, 218, 0.4)'
      }
    }]
  }

  return (
    <ReactEchartsCore echarts={echarts} option={option} style={{height: '100%'}} />
  )
}

export default RadarChart;
