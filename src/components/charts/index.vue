<template>
  <div ref="myChartsRef" :class="['chart', className]" :options="options"></div>
</template>

<script setup lang="ts">
import { ECharts, EChartsOption, init } from 'echarts';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

// 定义props
interface Props {
  className?: string;
  width?: string;
  height?: string;
  options: EChartsOption;
  autoHightLight?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  className: 'chart',
  width: '100%',
  height: '100%',
  options: () => ({}),
  autoHightLight: true,
});

const myChartsRef = ref<HTMLDivElement>();
let myChart: ECharts;
let timer: number;

const initChart = (): void => {
  if (myChart !== undefined) {
    myChart.dispose();
  }
  myChart = init(myChartsRef.value as HTMLDivElement);
  myChart?.setOption(props.options, true);
  if (props.autoHightLight) {
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: 0,
    });
    myChart.on('mouseover', (e) => {
      if (e.dataIndex == 0) {
        return;
      } else {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: 0,
        });
      }
    });
    myChart.on('mouseout', (e) => {
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 0,
      });
    });
  }
};

const resizeChart = (): void => {
  timer = setTimeout(() => {
    if (myChart) {
      myChart.resize();
    }
  }, 0);
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart);
  clearTimeout(timer);
  timer = 0;
});

watch(
  props.options,
  () => {
    initChart();
  },
  {
    deep: true,
  }
);
</script>

<style lang="css" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
