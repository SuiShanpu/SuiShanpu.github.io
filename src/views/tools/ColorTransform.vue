<!--
  创建时间: 2026-01-13 18:30:41
  作者: Shanpu 
  功能: ColorTransform 色值转换
-->

<script setup>
import { ref, reactive, computed } from 'vue';

import ColorPicker from "./ColorPicker.vue";

import { 
  objToRgba, objToHex
} from "@/utils/color.js";


/*----- 原色值  ------*/

const origColorData = reactive({
  red: 102,
  green: 66,
  blue: 221,
  alpha: 0.3,
});

const origColorText = computed(() => {
  return objToRgba(origColorData);
});

/**
 * 事件: 原色值改变事件
 */
function onChangeOrig(colorObj) {
  console.log("原色值 onChangeOrig:", colorObj);
  origColorData.red = colorObj.red;
  origColorData.green = colorObj.green;
  origColorData.blue = colorObj.blue;
  origColorData.alpha = colorObj.alpha ?? 1;
}

/*----- 背景色值  ------*/

const bgColorData = reactive({
  red: 255,
  green: 255,
  blue: 255,
  alpha: 1,
});

const bgColorText = computed(() => {
  return objToRgba(bgColorData);
});

/**
 * 事件: 背景色值改变事件
 */
function onChangeBg(colorObj) {
  bgColorData.red = colorObj.red;
  bgColorData.green = colorObj.green;
  bgColorData.blue = colorObj.blue;
  bgColorData.alpha = colorObj.alpha ?? 1;
}

/*----- 结果色值  ------*/

const resColorData = reactive({
  red: 209,
  green: 198,
  blue: 245,
});

const resColorRgbaText = computed(() => {
  return objToRgba(resColorData);
});
const resColorHexText = computed(() => {
  return objToHex(resColorData);
});


/**
 * 事件: 转换
 */
function onTrans() {
  resColorData.red = transformColorValues(
    origColorData.red, 
    origColorData.alpha, 
    bgColorData.red
  );
  resColorData.green = transformColorValues(
    origColorData.green, 
    origColorData.alpha, 
    bgColorData.green
  );
  resColorData.blue = transformColorValues(
    origColorData.blue, 
    origColorData.alpha, 
    bgColorData.blue
  );
}

/**
 * 转换色值
 * 
 * @param params 没有背景色的色值转换
 */
function transformColorValues(origVal, alpha, bgVal = 255) {
  const resBg = (255 - bgVal) * (1 - alpha);
  const resColor = (255 - origVal) * alpha;
  const resVal = 255 - (resColor + resBg);
  return Math.round(resVal);
}
</script> 

<template>
  <div class="color-trans">
    <div class="to-rgb">
      <div class="title">转换为无透明度</div>
      <div class="wrap">
        <div class="box">
          <div class="values">
            <div class="orig value">
              <span>原色值: </span>
              <ColorPicker :color-source="origColorData" @change="onChangeOrig"/>
            </div>
            <div class="bg value">
              <span>背景色: </span>
              <ColorPicker :color-source="bgColorData" @change="onChangeBg"/>
            </div>
          </div>
          <div class="views">
            <div class="orig color"></div>
          </div>
        </div>
        <div class="box">
          <div class="values">
            <div class="res btn">
              <a-button type="primary" @click="onTrans">转换</a-button>
            </div>
            <div class="res value">
              <span>结果色值: </span>
              <div class="texts">
                <div class="rgba">{{ resColorRgbaText }}</div>
                <div class="hex">{{ resColorHexText }}</div>
              </div>
            </div>
          </div>
          <div class="views">
            <div class="res color"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.color-trans {
  width: 100%;
  height: 100%;
  padding: 24px;

  display: flex;
  flex-direction: column;

  > div:not(:first-child) {
    margin-top: 24px;
  }
}

// 内容区
.to-rgb {
  overflow-y: auto;
  background-color: #fff;
  border-radius: 5px;

  .title {
    width: 100%;
    height: 24px;
    margin: 12px 0;
    text-align: center;
    color: #333;
    font-size: 18px;
    font-weight: bold;
  }
}

.wrap {
  margin: 24px;
  border-top: 1px solid #444857;

  .box {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    border: 1px solid #444857;
    border-top: none;
  }
}

// 数据
.values {
  flex: 0 0 360px;
  height: 100%;
  background-color: #fff;
  padding: 24px 12px;

  display: flex;
  flex-direction: column;
  row-gap: 8px;
  text-align: start;

  .value {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 4px;
  }

  .res.value {
    align-items: start;

    .texts {
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      align-items: start;
      row-gap: 4px;
    }
  } 
}


// 视图
.views {
  flex-grow: 1;
  height: 100%;
  padding: 24px;
  background-color: v-bind(bgColorText);
  border-left: 1px solid #444857;
  display: flex;
  .color {
    width: 100%;
    height: 100%;
  }
  .orig.color {
    background-color: v-bind(origColorText);
  }
  .res.color {
    background-color: v-bind(resColorHexText);
  }
}

// 小尺寸的样式
@media screen and (max-width: 650px) {
  .color-trans {
    padding: 16px;
  }
  .wrap {
    margin: 16px;

    .box {
      flex-direction: column;
      height: auto;
    }

    .values {
      flex: 0 0 auto;
      width: 100%;
    }
    .views {
      flex: 0 0 150px;
      border-left: none;
      border-top: 1px solid #444857;
      width: 100%;
    }
  }
}
</style>