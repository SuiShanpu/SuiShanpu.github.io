<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import { Lunar } from 'lunar-javascript';

import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const DAYJS_FORMAT_DATE = "YYYY-MM-DD";
const DAYJS_FORMAT_TIME = "HH:mm:ss";
const DAYJS_FORMAT_WEEk = "dddd";

const dateNow = ref(dayjs().format(DAYJS_FORMAT_DATE)); // 年月日
const timeNow = ref(dayjs().format(DAYJS_FORMAT_TIME)); // 周几
const weekNow = ref(dayjs().format(DAYJS_FORMAT_WEEk)); // 时分秒
const lunarObj = Lunar.fromDate(new Date()); // 农历
const lunarFormat = `${ lunarObj.getYearGan() }${ lunarObj.getYearZhi() }(${lunarObj.getYearShengXiao()})年 ${ lunarObj.getMonthInChinese() }月${ lunarObj.getDayInChinese() }`;

// 时分秒，同步变化
setInterval(() => {
  timeNow.value = dayjs().format(DAYJS_FORMAT_TIME);
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
        <!-- <HomeFilled  @click="backHome"/> -->
        <img class="logo" src="../assets/shanpu-logo.png" @click="backHome" />
      </div>
      <div class="datetime">
         <div>
           <span>{{ dateNow }}({{ weekNow }})</span>
           <span>{{ lunarFormat }}</span>
         </div>
         <div>
           <span class="time-text">{{ timeNow }}</span>
         </div>
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
      cursor: pointer;
    }
  }
  .content {
    width: 100%;
    height: calc(100% - @navHeight);
    overflow-y: auto;
  }


  .datetime > div {
    display: flex;
    flex-direction: column;
  }
  .time-text {
    width: 72px;
    text-align: right;
  }
}
</style>