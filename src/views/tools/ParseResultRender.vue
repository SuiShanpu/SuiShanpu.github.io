<!--
  创建时间: 2026-01-08 16:20:16
  作者: Shanpu
  功能: ParseResult 解析结果
-->

<script setup>

defineOptions({
  name: 'ParseResultRender'
});

/**
 * 父类的属性
 */
const resultData = defineModel("dataSource", {default: []})


/**
 * 切换收缩
 */
function onToggle(idx) {
  resultData.value[idx].collapse = !resultData.value[idx].collapse;

  console.log("resultData.value:", resultData.value);
}
</script> 

<template>
  <div class="result-box">
    <div v-for="(item, idx) in resultData" :key="idx">
      <div class="header">
        <span :class="['down', {'right': item.collapse}]" v-show="item.child" @click="onToggle(idx)" ><CaretDownFilled /></span>
        <span class="expr">{{ item.expr }}</span>
        <span class="explain">{{ item.explain }}</span>
        <span v-show="item.tip">
          <a-tooltip>
            <template #title>{{ item.tip }}</template>
            <QuestionCircleOutlined style="color:#666;" />
          </a-tooltip>
        </span>
      </div>
      <div v-show="item.child && !item.collapse" style="margin-left: 16px;">
        <ParseResultRender v-model:data-source="item.child" />
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.header {
  display: flex;
  align-items: center;
  margin: 8px 0;

  .down {
    width: 16px;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    transition: transform .1s ease, opacity .1s ease;

    &.right {
      transform: rotate(-90deg);
    }
  }
  .expr {
    line-height: 24px;
    background-color: #d9ecdd;
    padding: 2px 6px;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 500;
  }
  .explain {
    margin: 0 8px;
  }
}
</style>