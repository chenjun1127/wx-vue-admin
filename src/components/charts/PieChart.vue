<template></template>
<script setup lang="ts">
import useResizeChart from '@/utils/useResizeChart';
import { PieChart } from 'echarts/charts';
import { TitleComponent } from 'echarts/components';
import * as Charts from 'echarts/core';
import type { ZRColor } from 'echarts/types/dist/shared';
import { toRefs, watch } from 'vue';
Charts.use([TitleComponent, PieChart]);

const props = defineProps({
  // 父容器ID 此处为声明所需要的变量
  pid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  data: {
    type: Array as () => any[],
    default: [],
  },
  sequential: {
    type: Number,
    required: true,
  },
  // 饼图 颜色
  color: {
    type: Array as () => ZRColor[],
    default: []
  },
  suffixName: {
    type: String,
    default: ''
  },
  showTitle: {
    type: Boolean,
    default: false,
  },
  legend: {
    type: Object,
    required: false,
    default: {},
  },
  series: {
    type: Object,
    required: false,
    default: {},
  }
});
let { data, color, title, sequential, suffixName, pid, showTitle, series, legend } = toRefs(props);
const extraCssText = 'white-space: normal; word-break: break-all;border-radius: 15px;background: rgba(15, 15, 15,0.7);color:#fff;padding:5px 12px;border:1px solid rgba(58, 198, 244, 0.3)'
watch(data,(a,b)=>{
  initChart();
})
const initChart = () => {
  const container = document.querySelector('#' + props.pid) as HTMLElement;
  if (container) {
    const myChart = Charts.init(container);
    //此处可以根据需要自定义echarts的option类型
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{c}({d}%)',
        extraCssText: extraCssText,
      },
      title: props.showTitle ? [
        {
          text: props.title,
          subtext: props.sequential + '%',
          top: '22%',
          left: 'center',
          textStyle: {
            fontSize: 14,
            color: '#fff',

          },
          subtextStyle: {
            fontSize: 12,
            color: '#fff'
          }
        }
      ] : null,
      color: props.color,
      legend: {
        ...{
          // type: 'scroll',
          icon: 'circle',
          orient: 'vertical',
          top: 'center',
          right: 0,
          formatter: '{name}' + props.suffixName,
          textStyle: {
            color: '#fff'
          },
          selectedMode: false
        }, ...props.legend
      },
      series: [
        {
          ...{
            avoidLabelOverlap: false,
            type: 'pie',
            radius: ['70%', '90%'],
            center: ['40%', '50%'],
            data: props.data,
            animation: false,
            label: {
              show: false,
              position: 'center',
              formatter: '{n2|{b}}' + '\n' + '{n1|{d}%}',  // 设置默认显示值
              rich: {
                n1: {
                  fontSize: 14,
                  color: '#fff',
                  padding: [5, 0]
                },
                n2: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#55FFE7'
                }
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff'
              }
            },
          }, ...props.series
        },
      ]
    };
    myChart.setOption(option);
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: 0,
    })
    myChart.on('mouseover', (e) => {
      if (e.dataIndex == 0) {
        return;
      } else {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: 0,
        })
      }
    })
    myChart.on('mouseout', (e) => {
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 0,
      })
    })
    // 自适应 chart
    useResizeChart(container, myChart);
  }
}

</script>

<style lang="scss" scoped></style>
