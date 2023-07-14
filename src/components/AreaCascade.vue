<template>
  <div class="area-cascader">
    <div class="area-cascader-title">
      <template v-for="(item, index) in obj.selectedList" :key="index">
        <span @click="handleClickTitle(item, index)">{{ item.split(',')[0] }}</span>
        <em v-if="index < obj.selectedList.length - 1">>></em>
      </template>
    </div>
    <div class="area-cascader-content">
      <template v-for="(item, index) in obj.list" :key="item.id">
        <div class="area-cascader-list" v-if="item.data.length">
          <div class="desc">{{ item.name }}</div>
          <div class="li">
            <span v-for="(e, i) in item.data" :key="e" @click="handleClickArea(e)">
              {{ e.query_name }}
            </span>
          </div>
        </div>
        <div v-if="noAreaData" :class="`area-no-data-${index}`">暂无数据</div>
      </template>
    </div>
    <div class="area-cascader-footer">
      <button @click="cancel">取消</button>
      <button @click="enter">确认</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import api from '@/api';
import { useAreaSelectStore } from '@/stores/areaSelect';
import { getDefaultParamsByLevel, getParamsByLevel, getParamsObj } from '@/utils/utils';
import { ElMessage } from 'element-plus';
import { computed, onMounted, reactive } from 'vue';
const { area, isPublicNet } = window.config;
const areaSelect = useAreaSelectStore();
const obj = reactive({
  list: [
    {
      name: 'A-G',
      data: [] as any[],
    },
    {
      name: 'H-N',
      data: [] as any[],
    },
    {
      name: 'O-T',
      data: [] as any[],
    },
    {
      name: 'U-Z',
      data: [] as any[],
    },
  ] as any[],
  level: 3,
  selectedList: (isPublicNet ? [`${area.defaultName},${area.defaultCode}`] : [`${area.privateName},${area.privateCode}`]) as string[],
});
const letters = ['ABCDEFG', 'HIJKLMN', 'OPQRST', 'UVWXYZ'];
const noAreaData = computed(() => {
  let list = obj.list.map((e) => e.data);
  return !list.flat().length;
});
onMounted(async () => {
  await queryArea(getParamsObj({ ...getDefaultParamsByLevel(areaSelect.currentArea.data.level, areaSelect.currentArea.data.code), timestamp: Date.now() }));
});

const queryArea = async (params: any) => {
  const { data } = await api.getArea(params);
  const arr: any[] = data.sort((a: any, b: any) => a.head_char.localeCompare(b.head_char));
  if (arr.length) {
    for (let k = 0; k < letters.length; k++) {
      obj.list[k].data = [];
    }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < letters.length; j++) {
        if (letters[j].indexOf(arr[i].head_char) > -1) {
          obj.list[j].data.push(arr[i]);
        }
      }
    }
  } else {
    obj.list[0].data = [];
    obj.list[1].data = [];
    obj.list[2].data = [];
    obj.list[3].data = [];
  }
};
const handleClickArea = (item: any) => {
  obj.level = item.level;
  var str = item.query_name + ',' + item.code;
  if (obj.selectedList.indexOf(str) === -1) {
    obj.selectedList.push(str);
  }
  if (area.privateLevel != 3) {
    obj.selectedList.unshift('' + ',' + area.privateProvinceCode)
  }
  const provence_code = isPublicNet ? area.defaultProvinceCode : area.privateProvinceCode;
  queryArea(getParamsObj({ ...getParamsByLevel(item.level, item.code), provence_code, timestamp: Date.now() }));
};
const handleClickTitle = (item: any, index: number) => {
  if (index === 0) {
    obj.level = 3;
  } else if (index === 1) {
    obj.level = 4;
  } else if (index === 2) {
    obj.level = 5;
  } else if (index === 3) {
    obj.level = 6;
  } else if (index === 4) {
    obj.level = 7;
  }
  const [name, code] = item.split(',');
  obj.selectedList = obj.selectedList.slice(0, index + 1);
  const provence_code = isPublicNet ? area.defaultProvinceCode : area.privateProvinceCode;
  console.log(obj.level, code)
  queryArea(getParamsObj({ ...getParamsByLevel(obj.level, code), provence_code, timestamp: Date.now() }));
};
const cancel = () => {
  document.body.click();
};

const enter = () => {
  let currentArea: string = obj.selectedList[obj.selectedList.length - 1];
  const name = currentArea.split(',')[0];
  const code = parseInt(currentArea.split(',')[1]).toString();
  const areaObj = { code, name, level: obj.level };
  areaSelect.updateCurrentArea(areaObj);
  setCurrentAreaList(obj.list);
  setCurrentSelectedList(obj.selectedList);
  ElMessage({
    showClose: false,
    message: `区域切换成功！`,
    type: 'success',
    duration: 1500,
  });
  cancel();
};
//更新当前行政区子列表
const setCurrentAreaList = async (list: any) => {
  if (list.length) {
    let arr = list.map((item: any) => item.data);
    // areaSelect.$patch((state) => {
    //   state.currentArea.list = arr.flat();
    // });
  }
};
const setCurrentSelectedList = (list: string[]) => {
  areaSelect.$patch((state) => {
    state.currentArea.selectedList = list;
  });
};
</script>
<style lang="scss" scoped>
.area-cascader {
  &-title {
    border-bottom: 1px solid #69c5ea;
    padding: 12px 12px;

    span {
      cursor: pointer;
      display: inline-block;
      padding: 0 12px;
      height: 28px;
      line-height: 28px;

      &:hover {
        background-color: rgba(58, 198, 244, 0.2);
        border-radius: 30px;
      }
    }

    em {
      font-style: normal;
    }
  }

  &-content {
    padding: 20px;
    padding-bottom: 0;
    border-bottom: 1px solid #69c5ea;

    .area-cascader-list {
      display: flex;
      margin-bottom: 10px;
      align-items: center;

      .desc {
        width: 50px;
        margin-bottom: 10px;
      }

      .li {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 60px);

        span {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          height: 30px;
          line-height: 30px;
          margin: 0 10px 10px 0;
          min-width: 60px;
          padding: 0 10px;
          border-radius: 4px;
          border: 1px solid #69c5ea;

          &:hover {
            background: rgba($color: #69c5ea, $alpha: 1);
            color: #fff;
          }
        }
      }
    }

    [class^='area-no-data'] {
      text-align: center;
      padding: 20px 0 40px 0;
    }

    [class^='area-no-data']:not(:first-child) {
      display: none;
    }

  }

  &-footer {
    padding: 15px;
    text-align: center;

    button {
      display: inline-block;
      margin: 0 15px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #69c5ea;
      border: 1px solid #69c5ea;
      background: rgba(105, 197, 234, 0.26);
      padding: 0 20px;

      &:hover {
        background: rgba(105, 197, 234, 0.4);
      }

      &:last-child {
        background: #69c5ea;
        color: #fff;

        &:hover {
          background: rgba($color: #69c5ea, $alpha: 0.8);
        }
      }
    }
  }
}
</style>
