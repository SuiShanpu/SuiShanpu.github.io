<!--
  创建时间: 2026-01-07 17:37:25
  作者: Shanpu
  功能: Home 首页面
-->

<script setup>
import shanpuImg from '@/assets/shanpu-logo.png';
import regexpImg from '@/assets/regexp.png';

import ItemBox from "./ItemBox.vue";


const studys_list = [
  // {name: "常用汉字 3000 字，分类总结", iconSrc: shanpuImg},
  {name: "稀土掘金文章", iconSrc: shanpuImg, linkUrl: "https://juejin.cn/user/2089515413410056/posts"},
];

const tools_list = [
  {name: "RGBA转为RGB", iconSrc: shanpuImg, linkUrl: "https://codepen.io/SuiShanpu/pen/JoKGNvV"},
  {name: "色值转换", iconSrc: shanpuImg, routerPath: "/tools/colortrans"},
  {name: "正则解析器", iconSrc: regexpImg, routerPath: "/tools/regular"},
];
</script> 

<template>
  <div class="home">
    <aside class="aside"></aside>
    <main class="main">
      <a-card title="学习">
        <div class="list-wrap">
          <ItemBox v-for="item in studys_list" :data-source="item"></ItemBox>
        </div>
      </a-card>
      <a-card title="小工具">
        <div class="list-wrap">
          <ItemBox v-for="item in tools_list" :data-source="item"></ItemBox>
        </div>
      </a-card>
    </main>
  </div>
</template>

<style lang='less' scoped>
// @sideWidth: 240px;
@sideWidth: 0px;

.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  .aside {
    width: @sideWidth;
    height: 100%;
    background-color: #eef9f4;
  }
  .main {
    width: calc(100% - @sideWidth);
    height: 100%;
    padding: 24px;

    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }
}

.list-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
</style>