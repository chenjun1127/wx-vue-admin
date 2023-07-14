<template>
  <header class="top-menu">
    <div class="left">
      <!-- <div class="icon-toggle" @click="toggleMenu">
        <el-icon color="#4abce5" :size="22">
          <template v-if="menuShow">
            <Fold />
          </template>
          <template v-else>
            <Expand />
          </template>
        </el-icon>
      </div> -->
      <p>数据汇聚平台</p>
    </div>
    <div class="right">
      <!-- <el-popover placement="left" :width="300" trigger="click" popper-class="el-popover-search">
        <template #reference>
          <el-icon color="#4abce5" :size="24">
            <Search />
          </el-icon>
        </template>
        <el-input v-model="input3" maxlength="18" placeholder="请输入人员姓名/手机号/证件号" class="input-with-select menu-input">
          <template #append>
            <el-button class="menu-input-button">搜索</el-button>
          </template>
        </el-input>
      </el-popover> -->
      <el-popover placement="bottom" :width="502" trigger="click">
        <template #reference>
      11111
        </template>
        <div class="area-select-container">
          11111
        </div>
      </el-popover>
      <el-popover placement="bottom" :width="80" trigger="click">
        <template #reference>
          <el-icon color="#4abce5" :size="24">
            <Setting />
          </el-icon>
        </template>
        <ul class="setting-ul">
          <li>
            <RouterLink to="/system">
              <el-icon color="#4abce5" :size="16">
                <Grid />
              </el-icon>
              <span>系统管理</span>
            </RouterLink>
          </li>
          <li>
            <el-icon color="#4abce5" :size="16">
              <SwitchButton />
            </el-icon>
            <span>退出登录</span>
          </li>
        </ul>
      </el-popover>
    </div>
  </header>
</template>
<style lang="scss" scoped>
.top-menu {
  background: #fff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
  height: 50px;
}
</style>