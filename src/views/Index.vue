<template>
  <main class="main">
    <aside>
      <TopMenu></TopMenu>
    </aside>
    <section>
      <RouterView></RouterView>
    </section>
  </main>
</template>
 
<script lang="ts" setup>
import TopMenu from '../components/TopMenu.vue';
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  width: 100%;
  flex-direction: row;
  height: 100vh;

  aside {
    width: 230px;
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
    height: 100vh;
    background-color: #222d32;
  }

  section {
    flex: auto;
  }
}
</style>