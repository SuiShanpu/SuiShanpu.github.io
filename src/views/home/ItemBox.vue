<!--
  创建时间: 2026-01-08 14:14:44
  作者: Shanpu
  功能: ItemBox 展示项盒子
-->

<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

/**
 * 父类的属性
 */
const _props = defineProps({
  dataSource: {
    type: Object,
    default: () => ({})
  },
});

/**
 * 点击卡片
 */
function onClick() {
  // 先看 link，打开一个新的页面
  if (_props.dataSource.linkUrl) {
    window.open(_props.dataSource.linkUrl);
    return;
  }
  // 再看 router，路由跳转
  if (_props.dataSource.routerPath) {
    router.push(_props.dataSource.routerPath);
    return;
  }
}
</script> 

<template>
  <div class="home-item-box" @click="onClick">
    <span class="icon"><img :src="dataSource.iconSrc" alt="xx"/></span>
    <span class="name">{{ dataSource.name }}</span>
  </div>
</template>

<style lang='less' scoped>
.home-item-box {
  width: calc(25% - 12px);
  height: 50px;
  margin: 6px;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: #F5F5FB;
  cursor: pointer;

  display: flex;
  align-items: center;
  column-gap: 8px;

  .icon {
    flex: 0 0 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      border-radius: 25%;
    }
  }
  .name {
    flex-grow: 1;
  }
}
</style>