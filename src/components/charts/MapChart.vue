<template>
  <div ref="myChartsRef" :class="['chart', className]" :options="options" :currentArea="currentArea"></div>
</template>
<script setup lang="ts">
import { ECharts, EChartsOption, init } from 'echarts';
import { GeoComponent } from 'echarts/components';
import * as Charts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
Charts.use([CanvasRenderer, GeoComponent]);
// 定义props
interface Props {
  className?: string;
  width?: string;
  height?: string;
  options: EChartsOption;
  autoHightLight?: boolean;
  currentArea: any;
  name?: string,//全国时，不需要传这个字段
}
const props = withDefaults(defineProps<Props>(), {
  className: 'chart',
  width: '100%',
  height: '100%',
  options: () => ({}),
  autoHightLight: true,
  currentArea: null,
  name: 'china',
});

const myChartsRef = ref<HTMLDivElement>();
let myChart: ECharts;
let timer: number;
const initChart = (): void => {
  if (myChart !== undefined) {
    myChart.dispose();
  }
  myChart = init(myChartsRef.value as HTMLDivElement);
  Charts.registerMap(props.name, (props.currentArea) as any);
  myChart?.setOption(props.options, true);
};

const resizeChart = (): void => {
  timer = setTimeout(() => {
    if (myChart) {
      myChart.resize();
    }
  }, 500);
};

onMounted(() => {
  if (props.currentArea) {
    initChart();
  }
  window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart);
  clearTimeout(timer);
  timer = 0;
});
watch(
  [() => props.options, () => props.currentArea],
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
