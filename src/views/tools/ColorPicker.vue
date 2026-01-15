<!--
  创建时间: 2026-01-14 17:06:32
  作者: Shanpu
  功能: 颜色选择器
-->

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

import { 
  correctRgbaNum, correctRgbaAlpha, correctHex,
  objToHex, hexToObj,
} from "@/utils/color.js";

const kindMenu = [
  { key: "rgba", label: "rgba" },
  { key: "hex", label: "#" },
];



/**
 * 父类的属性和事件
 */
const _props = defineProps({
  colorSource: {
    type: Object,
    default: () => ({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1
    })
  },
});
const _emits = defineEmits(["change"]);

const colorKind = ref(kindMenu[0]); // 色值格式

const rgbaFormData = reactive({
  red: 255,
  green: 255,
  blue: 255,
  alpha: 1,
});
const hexFormData = ref("#ffffff");


onMounted(() => {
  console.log("_props.colorSource:", _props.colorSource);
  rgbaFormData.red = _props.colorSource.red;
  rgbaFormData.green = _props.colorSource.green;
  rgbaFormData.blue = _props.colorSource.blue;
  rgbaFormData.alpha = _props.colorSource.alpha ?? 1;

  hexFormData.value = objToHex(_props.colorSource);
})

/**
 * 事件: 改变原色值的形式
 */
function onClickOrigKind(selected) {
  if (selected.key == colorKind.value.key) return;

  colorKind.value = kindMenu.find(item => item.key == selected.key);
}

/**
 * 事件: RGBA 中 R 输入框失焦事件
 */
function onBlurRgbaRed(event) {
  const currVal = event.target.value;
  if (currVal == rgbaFormData.red) return;
  
  const validVal = correctRgbaNum(currVal);
  rgbaFormData.red = validVal;
  hexFormData.value =  objToHex(rgbaFormData);

  _emits("change", rgbaFormData);
}

/**
 * 事件: RGBA 中 G 输入框失焦事件
 */
function onBlurRgbaGreen(event) {
  const currVal = event.target.value;
  if (currVal == rgbaFormData.green) return;
  
  const validVal = correctRgbaNum(currVal);
  rgbaFormData.green = validVal;
  hexFormData.value =  objToHex(rgbaFormData);

  _emits("change", rgbaFormData);
}

/**
 * 事件: RGBA 中 B 输入框失焦事件
 */
function onBlurRgbaBlue(event) {
  const currVal = event.target.value;
  if (currVal == rgbaFormData.blue) return;
  
  const validVal = correctRgbaNum(currVal);
  rgbaFormData.blue = validVal;
  hexFormData.value =  objToHex(rgbaFormData);

  _emits("change", rgbaFormData);
}

/**
 * 事件: RGBA 中 A 输入框失焦事件
 */
function onBlurRgbaAlpha(event) {
  const currVal = event.target.value;
  if (currVal == rgbaFormData.alpha) return;
  
  const validVal = correctRgbaAlpha(currVal);
  rgbaFormData.alpha = validVal;
  hexFormData.value =  objToHex(rgbaFormData);

  _emits("change", rgbaFormData);
}

/**
 * 事件: HEX 中输入框失焦事件
 */
function onBlurHex(event) {
  const currVal = event.target.value;
  if (currVal == hexFormData.value) return;
  
  const validVal = correctHex(currVal);
  hexFormData.value = validVal;

  const colorObj = hexToObj(hexFormData.value);
  rgbaFormData.red = colorObj.red;
  rgbaFormData.green = colorObj.green;
  rgbaFormData.blue = colorObj.blue;
  rgbaFormData.alpha = colorObj.alpha ?? 1;

  _emits("change", rgbaFormData);
}
</script> 

<template>
  <div class="color-picker">

    <!-- rgba 格式显示 -->
    <div class="rgba wrap" v-show="colorKind.key == 'rgba'">
      <span class="title">rgba</span>
      <div class="values">
        <a-input :value="rgbaFormData.red" @blur="onBlurRgbaRed" />
        <a-input :value="rgbaFormData.green" @blur="onBlurRgbaGreen" />
        <a-input :value="rgbaFormData.blue" @blur="onBlurRgbaBlue" />
        <a-input :value="rgbaFormData.alpha" @blur="onBlurRgbaAlpha" />
      </div>
    </div>

    <!-- 16进制 格式显示 -->
    <div class="hex wrap" v-show="colorKind.key == 'hex'">
      <span class="title">16进制</span>
      <div class="values">
        <a-input :value="hexFormData" :maxlength="9" @blur="onBlurHex" />
      </div>
    </div>

    <!-- 更改颜色格式 -->
    <div class="toggle-kind">
      <a-dropdown :trigger="['click']" placement="bottom">
        <div class="change-icon-box" title="更改颜色格式">
          <DownOutlined />
        </div>
        <template #overlay>
          <a-menu @click="onClickOrigKind" :items="kindMenu">
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style lang='less' scoped>
.color-picker {
  display: flex;
  align-items: center;

  .wrap {
    display: flex;
    align-items: center;
    column-gap: 8px;

    .title {
      width: 48px;
      text-align: right;
    }

    .values {
      display: flex;
      align-items: center;
      column-gap: 8px;
    }
  }

  .toggle-kind {
    margin-left: 8px;
    padding: 2px;
    width: 30px;
    border-radius: 6px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: #edeef0;
    }
    .anticon {
      transform: scale(1.2, 0.8);
    }
  }
}


.ant-input {
  text-align: center;
  padding: 0;
}
.rgba.wrap .ant-input {
  width: 40px;
}
.hex.wrap .ant-input {
  width: 184px;
}
</style>