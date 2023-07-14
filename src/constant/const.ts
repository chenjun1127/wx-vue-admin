import * as eCharts from 'echarts/core';
export const extraCssText = 'white-space: normal; word-break: break-all;border-radius: 5px;background: rgba(33, 49, 84, 0.7);color:#fff;padding:5px 12px;border:1px solid rgba(58, 198, 244, 0.3)';
export const chartConfig = {
  borderColor: 'rgba(58, 198, 244, 0.7)',
  borderColorDark: 'rgba(58, 198, 244, 0.2)',
  fontColor: '#4abce5',
  shadowStyle: {
    color: new eCharts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: 'rgba(255, 255, 255, 0)' },
      { offset: 1, color: 'rgba(37, 107, 230, 0.18)' },
    ]),
  },
  regions: [
    {
      name: '南海诸岛',
      itemStyle: {
        opacity: 0, // 为 0 时不绘制该图形
      },
      label: {
        show: false, // 隐藏文字
      },
    },
  ],
  geoStyle: {
    areaColor: '#034D85',
    borderColor: '#009EFA',
    borderWidth: 2,
    color: '#fff',
  },
};
export const regions = {
  //不需要显示的地区
  list: ['南海诸岛', '沿山镇', '下沙镇', '金坑乡', '桂林乡', '肖家坊镇', '和平镇', '大埠岗镇', '大竹镇', '吴家塘镇', '拿口镇', '卫闽镇', '洪墩镇', '水北镇', '张厝乡', '晒口街道'],
  // 将不需要显示的地区透明度设置为0
  getRegions: () => {
    let arr = [];
    for (let i = 0; i < regions.list.length; i++) {
      arr.push({ name: regions.list[i], label: { show: false }, itemStyle: { opacity: 0 } });
    }
    return arr;
  },
  // 直接从geoJson文件过滤出不需要显示的地区
  filterRegions: (res: any, isFilter: boolean = true) => {
    if (isFilter) {
      const list: any[] = res.features;
      const arr = list.filter((e) => regions.list.indexOf(e.properties.name) === -1);
      let obj = { features: [], type: 'FeatureCollection' };
      obj.features = arr;
      return obj;
    } else {
      return res;
    }
  },
};
