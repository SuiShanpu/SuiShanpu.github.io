<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const DAYJS_FORMAT_TIME = "YYYY-MM-DD HH:mm:ss";

const dateNow = ref(dayjs().format(DAYJS_FORMAT_TIME));
// const localNow = "asdg";
// fetch('https://ipapi.co/json/')
//   .then(response => response.json())
//   .then(data => {
//     console.log("当前城市名称:", data);
//   })
//   .catch(error => console.log("无法获取城市名称", error));
// ;

setInterval(() => {
  dateNow.value = dayjs().format(DAYJS_FORMAT_TIME);
}, 1000)


/**
 * 返回首页
 */
function backHome() {
  router.push("/");
}
</script>

<template>
  <div class="sp-layout">
    <nav class="nav">
      <div class="common">
        <HomeFilled  @click="backHome"/>
        <span>{{ dateNow }}</span>
      </div>
      <div class="profile">
        <span class="name">山璞</span>
        <img class="logo" src="../assets/shanpu-logo.png" />
      </div>
    </nav>
    <div class="content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
@navHeight: 60px;

.sp-layout {
  height: 100%;
  width: 100%;

  .nav {
    height: @navHeight;
    width: 100%;
    // background-color: #4b5168;
    background-color: #7bcda8;
    padding: 0 var(--size-page-space);

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > div {
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      font-family: "隶书", "楷书";

      display: flex;
      align-items: center;
      column-gap: var(--size-box-gap);
    }
    .logo {
      width: 44px;
      height: 44px;
      background-color: #fff;
      border-radius: 25%;
    }
  }
  .content {
    width: 100%;
    height: calc(100% - @navHeight);
    overflow-y: auto;
  }
}
</style>