<template>
  <div class="pagination">
    <el-pagination background :layout="layout" :pager-count="pagerCount" :page-sizes="pageSizes" :page-size="pageSize" :total="pageTotal" v-model:currentPage="currentPage" @size-change="sizeChange" @current-change="current" @prev-click="prev" @next-click="next">
      <slot>
        <div class="pagination-slot">
          <span>前往<el-input style="width: 50px" v-model.trim="currentPage" @input="handleChange" />页</span>
          <span>共{{ pageTotal }}条</span>
        </div>
      </slot>
    </el-pagination>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
const props = defineProps({
  pageTotal: {
    type: Number,
    default: 0, //总页数
  },
  pagerCount: {
    type: Number,
    default: 5, //如果页数很多大概展示的页码
  },
  layout: {
    type: String,
    default: 'prev, pager, next, ->, slot', //分页组件会展示的功能项
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [10, 20, 30, 40, 50, 100]; //指定分页展示条数
    },
  },
  currentPage: {
    type: Number,
    default: 1, //指定跳转到多少页
  },
  pageSize: {
    type: Number,
    default: 10, //每页展示的条数，根据自己实际，且会带入请求
  },
  pageNum: {
    type: Number,
    default: 1, //第几页数据，根据自己实际，且会带入请求
  },
});

const currentPage = ref<number>(props.currentPage);
let pageData = reactive({
  pageSize: props.pageSize,
  pageNum: props.pageNum,
});

const emit = defineEmits<{
  (e: 'pageFunc', pageData: any): void
  (e: 'handleChange', curPage: number): void
}>()

//选择每页显示数量 Change page size
const sizeChange = (val: number) => {
  pageData.pageSize = val;
  emit('pageFunc', pageData);
};
//选择某一页
const current = (val: number) => {
  pageData.pageNum = currentPage.value;
  emit('pageFunc', pageData);
};
//上一页
const prev = () => {
  pageData.pageNum = pageData.pageNum - 1;
  emit('pageFunc', pageData);
};
//下一页
const next = () => {
  pageData.pageNum = pageData.pageNum + 1;
  emit('pageFunc', pageData);
};
const handleChange = (value: any) => {
  let curPage = value.replace(/[^\d]/g, '');
  if (curPage.length > 1 && curPage.charAt(0) === '0') {
    // 排除首字母为0的数
    curPage = curPage.slice(1);
  }
  //有几页
  const pageNum = Math.ceil(props.pageTotal / props.pageSize);
  if (curPage <= 0) {
    curPage = 1;
  } else if (curPage >= pageNum) {
    curPage = pageNum;
  }
  currentPage.value = parseInt(curPage);
  emit('handleChange', currentPage.value);
};
watch(
  () => props.currentPage,
  (newVal) => {
     console.log(newVal);
  },
  {  deep: true }
);
</script>

<style scoped lang="scss">
.pagination {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .pagination-slot {
    margin-left: 15px;

    span {
      &:first-child {
        margin-right: 15px;
      }

      .el-input {
        margin: 0 10px;
      }
    }
  }
}
</style>
