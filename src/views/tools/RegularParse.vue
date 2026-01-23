<!--
  创建时间: 2026-01-08 14:13:59
  作者: Shanpu
  功能: RegularParse 正则表达式解析
-->

<script setup>
import { ref, reactive, onMounted } from 'vue';
import ApexTree from 'apextree'
import VueTree from "@ssthouse/vue3-tree-chart";
import "@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css";

import ParseResultRender from "./ParseResultRender.vue";

import { mockDataCTree, DESC_TIPS, parseRegular } from "@/utils/regular.js";

// const regExp = ref("13+[a-zA-Z\\w-]BF{0,2}(\\dab\\D*?(a-zA)[RWE]{2,5})344(Rondle)$");
// const regExp = ref("(sdasdgd)67|ab?(c|de*)+|ac\\w|=\\d");
// const regExp = ref("st^(m|n)ak|[0-9]?\\d{1,12}|124n*$end");
const regExp = ref("[\\dA-Zabdc]{2,5}-(\\d1234+)rondle22");
// const regExp = ref("[^A-Zabc]");
// const regExp = ref("^(us|(US|AM))(en|EN)|(CN|cn)$");
// const regExp = ref("^us|(US|AM)");

// 解析结果数据
const parseRes = ref([]);
const parseResTree = reactive({
  expr: '语法树',
  type: 'root',
  expand: true,
  children: [],
});
// 解析结果, 不同展示形式
const activeParseResultKey = ref('tree');

const sampleData= ref({
  expr: "1",
  children: [
    { expr: "2", children: [{ expr: "4" }, { expr: "5" }] },
    { expr: "3" },
  ],
});
const treeConfig = ref({ nodeWidth: 120, nodeHeight: 80, levelHeight: 200 });


var apexTreeData = {
  "id": "idA",
  "name": "A",
  "children": [
     {
       "id": "idB",
       "name": "B",
       "children": [
         {
           "id": "idC",
           "name": "C"
         },
         {
            "id": "idD",
            "name": "D"
         }
      ]
     }
  ]
}

const options = {
  contentKey: 'expr',
   width: 700,
   height: 700,
  //  nodeWidth: 120,
  //  nodeHeight: 80,
   childrenSpacing: 100,
   siblingSpacing: 30,
   direction: 'top',
 };
var chart = null;

onMounted(() => {
  // chart = new ApexTree(document.getElementById("parse-apex-tree"), options);
  // chart.render(apexTreeData);
});


/**
 * 解析正则表达式
 */
function onParse() {
  console.log("Input regExp:", regExp.value);
  if (!regExp.value) return;

  let regRes = parseRegular(regExp.value);
  parseRes.value = regRes;

  parseResTree.expr = regExp.value;
  parseResTree.children = setExpand(regRes, true);
  // chart.render({
  //   "id": "idA",
  //   "name": "A",
  //   "children": regRes
  // });

  console.log("regRes:", regRes);
  console.log("parseResTree:", parseResTree);
}

/**
 * 方法: 设置展开/收起状态
 */
function setExpand(arr, expand) {
  arr.forEach(item => {
    if (item.children) {
      item.expand = expand;
      setExpand(item.children, expand);
    }
  });
  return arr;
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
        <div>【3】关于字符集，如 [a-Z]、-前面的code码大于后面的， 就会成为错误字符集。</div>
        <div>【4】关于嵌套层级，[] 字符集、{} 量词都是不会嵌套的。</div>
      </div>

      <div class="parse">
        <a-tabs v-model:activeKey="activeParseResultKey" type="card">
          <template #leftExtra>
            <p class="title">解析结果</p>
          </template>
          <a-tab-pane key="panel" tab="收缩面板">
            <div class="parse-result">
              <ParseResultRender v-model:data-source="parseRes" />
            </div>
          </a-tab-pane>
          <a-tab-pane key="tree" tab="语法树">
            <div class="parse-result">
              <blocks-tree 
                :data="parseResTree" 
                :horizontal="false" 
                :collapsable="true"
                :props="{label: 'expr', expand: 'expand', children: 'children',  key:'expr'}"
              >
                <template #node="{data}">
                  <div class="node-wrap">
                    <div class="prefix" v-show="data.prefix">{{ data.prefix }}</div>
                    <div class="content">
                      <div style="white-space: nowrap;">{{ data.expr }}</div>
                      <div style="white-space: nowrap;">{{ data.type }}</div>
                    </div>
                    <div class="suffix" v-show="data.suffix">{{ data.suffix }}</div>
                  </div>
                </template>
              </blocks-tree>
            </div>
          </a-tab-pane>
          <a-tab-pane key="apex-tree" tab="Apex 树状">
            <div class="parse-result">
              <div id="parse-apex-tree" style="width: 100%;height:100%;"></div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="chart-tree" tab="Chart树状">
            <div class="parse-result">
              <vue-tree
                style="width: 800px; height: 600px; border: 1px solid gray"
                :dataset="parseResTree"
                :config="treeConfig"
                linkStyle="curve"
              >
                <template v-slot:node="{ node, collapsed }">
                  <!-- <span
                    class="tree-node"
                    :style="{
                      border: collapsed ? '2px solid grey' : '',
                      borderRadius: '50%',
                    }"
                    >{{ node.expr }}</span
                  > -->
                  <span style="white-space: nowrap;">{{ node.expr }}</span>
                </template>
              </vue-tree>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>

      <!-- 符号优先级 -->
      <div class="priority">
        <p class="title">符号优先级</p>
        <div class="priority-list">
          <div class="icon">
            <img src="@/assets/priority-level.png" alt="">
          </div>
          <div class="list">
            <div>1. 转义符 <span class="char"> \ 如：\w \W \s \S \d \D， \( \) \[ \] \* \+ \? \|</span></div>
            <div>2. 圆括号和方括号 <span class="char"> () (?:) (?=) (?!) (?&lt;=) (?&lt;!) [] [^]</span></div>
            <div>3. 限定符（量词）<span class="char">{n} {n,} {n,m} * + ? </span></div>
            <div>4. 边界序列 <span class="char"> ^ $ </span></div>
            <div>5. 或操作 <span class="char"> | </span></div>
          </div>
        </div>
      </div>

      <div class="meta">
        <p class="title">匹配说明</p>
        <div class="meta-desc">
          <div class="primary">正则表达式是匹配模式，要么匹配字符，要么匹配位置。</div>
          <div class="primary">有了匹配这一基本操作后，才有其他的操作：验证、切分、提取、替换。</div>
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

      <div class="meta">
        <p class="title">一些正则相关的网站</p>
        <div class="meta-desc">
          <div>【1】<a href="https://regex101.com/" target="_blank">正则解析101</a></div>
          <div>【2】<a href="https://regexr.com/8j8iu" target="_blank">正则解析层级化</a></div>
          <div>【2】<a href="https://jex.im/regulex/" target="_blank">正则解析流程化</a></div>
          <div>【3】<a href="https://cheatography.com/davechild/cheat-sheets/regular-expressions/" target="_blank">正则语法表示例</a></div>
          <div>【4】<a href="https://juejin.cn/post/6844903487155732494" target="_blank">掘金文章: JS正则表达式完整教程</a></div>
        </div>
      </div>

      <div class="meta">
        <p class="title">正则操作的方法</p>
        <div class="meta-desc">
          <div>String#search</div>
          <div>String#split</div>
          <div>String#match</div>
          <div>String#replace</div>
          <div>RegExp#test</div>
          <div>RegExp#exec</div>
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
  .primary {
    color: #049527;
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
  // margin-top: 5px;
  min-height: 100px;
  max-height: 800px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #d2d2d2;
  padding: 16px 16px;
  overflow: auto;

  .node-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #ecf4fe;

    .content {
      font-size: 15px;
      padding: 2px 6px;
      background-color: #d9ecdd;
    };

    // .prefix {
    //   padding: 2px 6px;
    //   color: #C10443;
    //   font-weight: 500;
    // }
    .prefix, .suffix {
      padding: 2px 6px;
      color: #5f1fad;
      font-weight: 500;
    }
  }
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

.priority-list {
  background-color: #fff;
  border-radius: 5px;
  padding: 4px 16px;

  display: flex;
  flex-direction: row;
  align-items: start;

  .icon img {
    width: 30px;
    height: 145px;
  }
  .list {
    margin-left: 12px;

    > div {
      margin: 6px 0;
    }
    .char {
      background-color: #e5e5e5;
      padding: 2px 8px;
      border-radius: 5px;
      font-weight: 500;
      word-spacing: 16px;
    }
  }
}


:deep(.ant-tabs-card >.ant-tabs-nav) {
  margin-bottom: -2px;
  .ant-tabs-nav-wrap {
    justify-content: right;
  }
}
:deep(.org-tree-node-label-inner) {
  padding: 0;
  border: 1px solid #c3c7cb;
  box-shadow: none
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rich-media-node {
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #f7c616;
  border-radius: 4px;
}
</style>