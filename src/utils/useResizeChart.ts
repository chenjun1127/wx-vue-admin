// 用于自适应 echarts 图表大小
import type * as Charts from 'echarts/core';
export default function useResizeChart(container: HTMLElement, chart: Charts.ECharts) {
  // 监听容器大小变化
  const resizeObserver = new ResizeObserver(entries => {
    // 重新设置大小
    chart.resize({
      animation: {
        duration: 500
      }
    });
  });

  resizeObserver.observe(container);

  // onBeforeUnmount(() => {
  // 	// 销毁前解除监听
  // 	resizeObserver.unobserve(container);
  // })
}
