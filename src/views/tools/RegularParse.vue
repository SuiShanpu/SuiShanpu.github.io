<!--
  创建时间: 2026-01-08 14:13:59
  作者: Shanpu
  功能: RegularParse 正则表达式解析
-->

<script setup>
import { ref } from 'vue';

import ParseResultRender from "./ParseResultRender.vue";

import { DESC_TIPS, parseRegular } from "@/utils/regular.js";

const regExp = ref(null);

const parseRes = ref([]);

/**
 * 解析正则表达式
 */
function onParse() {
  console.log("Input regExp:", regExp.value);
  if (!regExp.value) return;

  let regRes = parseRegular(regExp.value);
  parseRes.value = regRes;
  console.log("regRes:", regRes);
}
</script> 

<template>
  <div class="regular-parse">
    <div class="main">
      <div class="regular">
        <p class="title">正则表达式 (转义符暂不支持，先直接写)</p>
        <div class="regular-expression">
          <div class="btn" @click="onParse">Parse</div>
          <div class="prefix">/</div>
          <div class="exp-body">
            <a-input 
              v-model:value="regExp" 
              :bordered="false" 
              placeholder="请输入正则表达式" 
              @pressEnter="onParse"
            />
          </div>
          <div class="suffix">/g</div>
        </div>
      </div>
      <div class="error">
        <p class="title">错误说明 [后面会添加校验]</p>
        <div>【1】关于括号，不成对可能会解析解析错误。</div>
        <div>【2】关于界限，如 1^Hello、多个位置符号等都不对， 会忽略前后无效内容。</div>
      </div>
      <div class="parse">
        <p class="title">解析结果</p>
        <div class="parse-result">
          <ParseResultRender v-model:data-source="parseRes" />
        </div>
      </div>
      <div class="meta">
        <p class="title">元字符说明</p>
        <div class="meta-desc">
          <div v-for="list in DESC_TIPS" class="list-box">
            <div class="title">{{ list.title }}</div>
            <ul>
              <li v-for="item in list.items">
                <span class="expr">{{ item.expr }}</span>
                <span>:&ensp;</span>
                <span>{{ item.explain }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.regular-parse {
  width: 100%;
  height: 100%;

  .main {
    padding: var(--size-page-space);
    display: flex;
    flex-direction: column;

    > div:not(:first-child) {
      margin-top: var(--size-page-space);
    }
  }

  .title {
    font-size: 16px;
    font-weight: 500;
  }
}

.error {
  background-color: #f43f5e24;
  border-radius: 5px;
  padding: 4px 16px;
}

.regular-expression {
  margin-top: 5px;
  min-height: 40px;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #d2d2d2;
  font-family: "Source Code Pro", monospace;

  display: flex;
  align-items: center;

  .prefix {
    font-weight: 700;
    padding: 6px 0 6px 16px;
    color: #808080;
  }
  .suffix {
    font-weight: 700;
    padding: 6px 16px 6px 0;
    color: #808080;
  }
  .btn {
    height: 40px;
    line-height: 28px;
    padding: 6px 8px;
    // border-right: 1px solid rgba(4,149,39, .4);
    border-right: 1px solid #d2d2d2;
    cursor: pointer;
    font-weight: 600;
    color: #049527;
    background-color: #d9ecdd;
  }
  .btn:hover {
    color: #fff;
    background-color: #7bcda8;
  }

  .exp-body {
    flex-grow: 1;

    .ant-input {
      font-family: unset;
      padding: 4px 2px;
    }
  }
}

.parse-result {
  margin-top: 5px;
  min-height: 100px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #d2d2d2;
  padding: 0 16px;
}

.meta-desc {
  margin-top: 5px;
  background-color: #fff;
  border-radius: 5px;
  min-height: 50px;
  padding: 4px 16px;

  .list-box {
    margin: 16px 0;

    ul {
      padding-inline-start: 24px;
    }
    li {
      margin: 6px 0;
    }
    .expr {
      background-color: #e5e5e5;
      padding: 2px 6px;
      border-radius: 5px;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
</style>