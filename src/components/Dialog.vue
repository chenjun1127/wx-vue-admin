<template>
  <el-dialog :width="width" class="el-dialog-common" :title="title" :model-value="visible" :before-close="handleClose"
    append-to-body :close-on-click-modal="true">
    <slot v-if="visibleSlot" name="content"></slot>
    <div slot="footer" class="dialog-footer" v-if="!noFooter">
      <div class="el-dialog-footer">
        <el-button @click="cancel"> 取 消 </el-button>
        <el-button @click="confirm"> 确 定 </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
const emits = defineEmits(['handleClose', 'handleCancel']);
defineProps({
  width: {
    default: '50%',
    type: String || Number,
  },
  title: {
    default: 'title',
    type: String,
  },
  visible: {
    default: false,
    type: Boolean,
  },
  visibleSlot: {
    default: true,
    type: Boolean,
  },
  noFooter: {
    default: false,
    type: Boolean,
  },
  handleClose: {
    type: Function,
    default: () => { },
  },
  handleCancel: {
    type: Function,
    default: () => { },
  },
});

const handleClose = (_done: () => void) => {
  emits('handleClose');
};
const cancel = () => {
  emits('handleCancel');
};
const confirm = () => {
  emits('handleClose');
};
</script>
<style scoped>
.el-dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>