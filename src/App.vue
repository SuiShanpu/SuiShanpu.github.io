<script setup>
import Layout from "./views/Layout.vue";

const antdTheme = {
  token: {
    // colorPrimary: '#2f9eff', // 蓝色
    colorPrimary: '#00b96b', // 绿色
  },
};
</script>

<template>
  <a-config-provider :theme="antdTheme">
    <Layout></Layout>
  </a-config-provider>
</template>

<style scoped>
</style>
