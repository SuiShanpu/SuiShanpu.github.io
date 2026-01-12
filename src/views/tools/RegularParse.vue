<!--
  创建时间: 2026-01-08 14:13:59
  作者: Shanpu
  功能: RegularParse 正则表达式解析
-->

<script setup>
import { ref } from 'vue';

import ParseResultRender from "./ParseResultRender.vue";

import { DESC_TIPS, parseRegular } from "@/utils/regular.js";

const regExp = ref("^[A-Z]+?(0-9{1,}(abc))?$");

const parseRes = ref([
  { expr: "^", explain: "表达式的开头", tip: "dfdf" },
  { expr: "[+-]?\d+(\.\d+)", explain: "匹配括号内的任意一个字符零次或一次", child: [
    { expr: "[", explain: "字符集的开头", tip: "234" },
    { expr: "+-", explain: "字符集的内容", child: [
      { expr: "+", explain: "普通字符", tip: "234" },
      { expr: "-", explain: "普通字符", tip: "234" },
    ] },
    { expr: "]", explain: "字符集的结尾", tip: "he" },
    { expr: "?", explain: "匹配括号内字符的数量,匹配零次或一次", tip: "33" },
  ] },
  { expr: "$", explain: "表达式的结尾", tip: "g32523" },
]);


const descData = ref([
  {title: "字符", items: [
    {expr: "普通字符", desc: '普通字符按照字面意义进行匹配，例如匹配字母 "a" 将匹配到文本中的 "a" 字符。' },
    {expr: "元字符", desc: '元字符具有特殊的含义，例如 \d 匹配任意数字字符，\w 匹配任意字母数字字符，. 匹配任意字符（除了换行符）等。' },
  ] },
  {title: "字符集", items: [
    {expr: "[ ]", desc: '匹配括号内的任意一个字符。例如，[abc] 匹配字符 "a"、"b" 或 "c"。'},
    {expr: "[^ ]", desc: '匹配除了括号内的字符以外的任意一个字符。例如，[^abc] 匹配除了字符 "a"、"b" 或 "c" 以外的任意字符。'},
  ] },
  {title: "量词", items: [
    {expr: "*", desc: '匹配前面的模式零次或多次。'},
    {expr: "+", desc: '匹配前面的模式一次或多次。'},
    {expr: "?", desc: '匹配前面的模式零次或一次。'},
    {expr: "{n}", desc: '匹配前面的模式恰好 n 次。'},
    {expr: "{n,}", desc: '匹配前面的模式至少 n 次。'},
    {expr: "{n,m}", desc: '匹配前面的模式至少 n 次且不超过 m 次。'},
  ] },
  {title: "边界", items: [
    {expr: "^", desc: '匹配字符串的开头。'},
    {expr: "$", desc: '匹配字符串的结尾。'},
    {expr: "\b", desc: '匹配单词边界。'},
    {expr: "\B", desc: '匹配非单词边界。'},
  ] },
  {title: "分组和捕获", items: [
    {expr: "( )", desc: '用于分组和捕获子表达式。'},
    {expr: "(?: )", desc: '用于分组但不捕获子表达式。'},
  ] },
  {title: "特殊字符", items: [
    {expr: "\\", desc: '转义字符，用于匹配特殊字符本身。'},
    {expr: ".", desc: '匹配任意字符（除了换行符）。'},
    {expr: "|", desc: '用于指定多个模式的选择。'},
  ] },
])


/**
 * 解析正则表达式
 */
function onParse() {
  let regRes = parseRegular(regExp.value);
  parseRes.value = regRes;
  console.log("regRes:", regRes);
}
</script> 

<template>
  <div class="regular-parse">
    <div class="main">
      <div class="regular">
        <p class="title">正则表达式</p>
        <div class="regular-expression">
          <div class="btn" @click="onParse">Parse</div>
          <div class="prefix">/</div>
          <div class="exp-body">
            <a-input v-model:value="regExp" :bordered="false" placeholder="请输入正则表达式" />
          </div>
          <div class="suffix">/g</div>
        </div>
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
                <span>{{ item.desc }}</span>
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
    padding: 24px;
    display: flex;
    flex-direction: column;

    > div:not(:first-child) {
      margin-top: 24px;
    }
  }

  .title {
    font-size: 16px;
    font-weight: 500;
  }
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

  .prefix, .suffix {
    font-weight: 700;
    padding: 6px 8px;
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