<template>
  <el-table class="common-table" :data="tableData" style="width: 100%" :height="height" empty-text="暂无数据"
    @selection-change="handleSelectionChange" @row-click="handleRowClick"
    :header-cell-style="{ background: '#222d32', color: '#fff' }" tooltip-effect="dark"
    :row-class-name="tableRowClassName">
    <el-table-column type="selection" width="55" v-if="isShowSelection"></el-table-column>
    <el-table-column type="index" label="序号" width="60" v-if="isOrdered"></el-table-column>
    <el-table-column :show-overflow-tooltip="item.tooltip" v-for="(item, index) in tableCol" :key="index"
      :prop="item.prop" :width="item.width" :label="item.label"
      :align="index === tableCol.length - 1 ? 'right' : 'center'">
      <template #default="scope">
        <!-- 具名插槽 -->
        <slot v-if="item.slot" :name="item.prop" :info="(scope as any).row"></slot>
        <span v-else>{{ getText((scope as any).row[item.prop]) }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
const tableRowClassName = ({ rowIndex }: any) => {
  return `tr-${rowIndex}`;
};
const emits = defineEmits(['handleSelectionChange', 'handleRowClick']);
const handleSelectionChange = (rows: any) => {
  emits('handleSelectionChange', rows);
};
const handleRowClick = (row: any) => {
  emits('handleRowClick', row);
};
defineProps({
  isOrdered: {
    default: false,
    type: Boolean,
  },
  isShowSelection: {
    default: false,
    type: Boolean,
  },
  tableCol: {
    default: () => [],
    type: Array<any>,
  },
  tableData: {
    default: () => [],
    type: Array<any>,
  },
  height: {
    default: 'auto',
    type: String,
  },
});

const getText = (val: any) => {
  if (val === null || val === undefined) return '-';
  if (!isNaN(val)) return val;
  return val;
};
</script>
