<template>
  <div class="no-data">
    <img src="../assets/images/no-data.png" alt="暂无数据" />
    <p>暂无数据</p>
  </div>
</template>
<style scoped lang="scss">
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  height: 100%;
  width: 100%;
  img {
    display: block;
    width: 44px;
    margin-bottom: 8px;
  }
  p {
    font-size: 12px;
  }
}
</style>
