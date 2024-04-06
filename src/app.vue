<template>
  <!-- 放在顶级页面 -->
  <NuxtPage />
</template>

<script lang="ts" setup>
// console.log("app.vue setup");
useHead({
  title: 'Hank 幸运选择器'
})
</script>

<style lang="scss">
@import './styles/index';

html, body {
  width: 100%;
  height: 100%;

  > div:first-child {
    width: 100%;
    height: 100%;
  }
}
</style>