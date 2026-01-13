
/**
 * 字符说明
 * 
 * 主键说明
 * 字符 char 
 *    量词限定字符 char_limit
 *    位置边界字符 char_boundary
 *    特殊字符 char_special
 *    普通字符 char_common
 * 符号 sign
 *    量词限定符号 sign_limit
 *    集合符号 sign_brace
 */
const CHARS_ENUM = {
  //-------------------------- 编辑 ----------
  // 开始
  "^": {
    key: "char_boundary_start", 
    str: "^", 
    reg: /\^/, 
    explain: "默认情况下匹配整个字符串的开头，多行模式下匹配每行的开头", 
    tip: "默认情况下匹配整个字符串的开头，多行模式下匹配每行的开头。" 
  },
  // 结束
  "$": {
    key: "char_boundary_end", 
    str: "$", 
    reg: /\$/, 
    explain: "默认情况下匹配整个字符串的结尾，多行模式下匹配每行的结尾", 
    tip: "默认情况下匹配整个字符串的结尾，多行模式下匹配每行的结尾。" 
  },

  //-------------------------- 字符集合 ----------
  // 集合的全部
  "()": {
    key: "char_bracket_group", 
    str: "(", 
    reg: /\(/, 
    explain: "整组匹配 ( ) 中的全部字符", 
    tip: "整组匹配 ( ) 中的全部字符。" 
  },
  "(": {
    key: "char_bracket_group_start", 
    str: "(", 
    reg: /\(/, 
    explain: "整组的开始", 
    tip: "整组的开始。" 
  },
  ")": {
    key: "char_bracket_group_start_end", 
    str: "(", 
    reg: /\(/, 
    explain: "整组的结束", 
    tip: "整组的结束。" 
  },
  // 集合中任意一个
  "[]": {
    key: "char_bracket_any", 
    str: "[", 
    reg: /\[/, 
    explain: "匹配 [ ] 中的任意一个字符", 
    tip: "匹配 [ ] 中的任意一个字符。" 
  },
  "[": {
    key: "char_bracket_any_start", 
    str: "[", 
    reg: /\[/, 
    explain: "字符集的开始", 
    tip: "字符集的开始。" 
  },
  "]": {
    key: "char_bracket_any_end", 
    str: "[", 
    reg: /\[/, 
    explain: "字符集的结束", 
    tip: "字符集的结束。" 
  },
  //-------------------------- 数量 ----------
  "{": {
    key: "char_bracket_any", 
    str: "{", 
    explain: "匹配 [ ] 中的任意一个字符", 
    tip: "匹配 [ ] 中的任意一个字符。" 
  },
  "*": {
    key: "char_quantifier_0n", 
    str: "*", 
    explain: "零次或多次", 
    tip: "匹配前面的模式零次或多次。" 
  },
  "+": {
    key: "char_quantifier_1n", 
    str: "+", 
    explain: "一次或多次。", 
    tip: "匹配前面的模式一次或多次。" 
  },
  "?": {
    key: "char_quantifier_01", 
    str: "?", 
    explain: "零次或一次。", 
    tip: "匹配前面的模式零次或一次。" 
  },
  "*?": {
    key: "char_quantifier_0n_less", 
    str: "*?", 
    explain: "零次或多次。(非贪婪模式，尽可能少地匹配)", 
    tip: "匹配前面的模式零次或多次。(非贪婪模式，尽可能少地匹配)" 
  },
  "+?": {
    key: "char_quantifier_1n_less", 
    str: "+?", 
    explain: "一次或多次。(非贪婪模式，尽可能少地匹配)", 
    tip: "匹配前面的模式一次或多次。(非贪婪模式，尽可能少地匹配)" 
  },
  "??": {
    key: "char_quantifier_01_less", 
    str: "??", 
    explain: "零次或一次。(非贪婪模式，尽可能少地匹配)", 
    tip: "匹配前面的模式零次或一次。(非贪婪模式，尽可能少地匹配)" 
  },
};


/**
 * 描述的提示数据
 */
export const DESC_TIPS = [
  {title: "字符", items: [
    {expr: "普通字符", explain: '普通字符按照字面意义进行匹配，例如匹配字母 "a" 将匹配到文本中的 "a" 字符。' },
    {expr: "元字符", explain: '元字符具有特殊的含义，例如 \d 匹配任意数字字符，\w 匹配任意字母数字字符，. 匹配任意字符（除了换行符）等。' },
  ] },
  {title: "位置和边界", items: [
    {expr: "^", explain: '默认情况下匹配整个字符串的开头，多行模式下匹配每行的开头。'},
    {expr: "$", explain: '默认情况下匹配整个字符串的结尾，多行模式下匹配每行的结尾。'},
    {expr: "\\b", explain: '匹配单词边界。'},
    {expr: "\\B", explain: '匹配非单词边界。'},
    {expr: "\\A", explain: '匹配字符串开头（不同于^，不受多行模式影响）。'},
    {expr: "\\Z", explain: '匹配字符串结尾或结尾的换行符之前。'},
  ] },
  {title: "分组和捕获", items: [
    {expr: "( )", explain: '用于分组和捕获子表达式。'},
    {expr: "(?: )", explain: '用于分组但不捕获子表达式。'},
  ] },
  {title: "字符集", items: [
    {expr: "[ ]", explain: '匹配括号内的任意一个字符。例如，[abc] 匹配字符 "a"、"b" 或 "c"。'},
    {expr: "[^ ]", explain: '匹配除了括号内的字符以外的任意一个字符。例如，[^abc] 匹配除了字符 "a"、"b" 或 "c" 以外的任意字符。'},
  ] },
  {title: "量词", items: [
    {expr: "{n}", explain: '匹配前面的模式恰好 n 次。'},
    {expr: "{n,}", explain: '匹配前面的模式至少 n 次。'},
    {expr: "{n,m}", explain: '匹配前面的模式至少 n 次且不超过 m 次。'},
    {expr: "*", explain: '匹配前面的模式零次或多次。'},
    {expr: "+", explain: '匹配前面的模式一次或多次。'},
    {expr: "?", explain: '匹配前面的模式零次或一次。'},
    {expr: "*?", explain: '匹配前面的模式零次或多次。(非贪婪模式，尽可能少地匹配)'},
    {expr: "+?", explain: '匹配前面的模式一次或多次。(非贪婪模式，尽可能少地匹配)'},
    {expr: "??", explain: '匹配前面的模式零次或一次。(非贪婪模式，尽可能少地匹配)'},
  ] },
  {title: "特殊字符", items: [
    {expr: "\\", explain: '转义字符，用于匹配特殊字符本身。'},
    {expr: ".", explain: '匹配任意字符（除了换行符）。'},
    {expr: "|", explain: '用于指定多个模式的选择。'},
  ] },
];





/**
 * 解析正则表达式
 * 
 * 运算符优先级
 * 
 * --  转义符 \
 * --  圆括号和方括号 (), (?:), (?=), [ ]
 * --  限定符（量词）*, +, ?, {n}, {n,}, {n,m}
 * --  任何元字符、任何字符 ^, $, \w
 * --  或操作 | 
 * 
 * @param {String} regExp 正则表达式字符串 
 * @returns {Array} 正则表达式解析后的数据
 */

// [
//   { expr: "^", explain: "表达式的开头", tip: "dfdf" },
//   { expr: "[+-]?\d+(\.\d+)", explain: "匹配括号内的任意一个字符零次或一次", child: [
//     { expr: "[", explain: "字符集的开头", tip: "234" },
//     { expr: "+-", explain: "字符集的内容", child: [
//       { expr: "+", explain: "普通字符", tip: "234" },
//       { expr: "-", explain: "普通字符", tip: "234" },
//     ] },
//     { expr: "]", explain: "字符集的结尾", tip: "he" },
//     { expr: "?", explain: "匹配括号内字符的数量,匹配零次或一次", tip: "33" },
//   ] },
//   { expr: "$", explain: "表达式的结尾", tip: "g32523" },
// ]

export function parseRegular(regExp) {
  // 〇、校验 
  // todo 后面补上

  // 一、分割：位置边界（同时添加描述）
  const boundaryParseData = parseModuleBoundary(regExp + "");
  const { viewData, idx } = boundaryParseData;

  if (viewData[idx]) {
    // 二、循环分割，构建数据层级（同时添加描述）
    // 成对符号 & 数量符号（将括号外的特殊数量符号 *+？也作为成对符号进行分割）
    const levelData = parseRegularChild(viewData[idx].expr);
    console.log("循环分割:", levelData);
  
    // 三、合并： 限制 + 数量；或操作 | 前后
    const limitData = mergeLimitRange(levelData);
    console.log("合并量词:", limitData);

    viewData[idx].child = limitData;
  }

  // 转化为视图数据格式
  return viewData;
}


/****** ----------------------------------  解析各个模块  ------------------------------------ ******/


/**
 * 解析: 解析子表达式及其集合 (包括层级)
 * 
 * @param {String} strOut 正则子表达式字符串 
 * @returns {Array} 正则表达式解析后的数据
 */
function parseRegularChild(strOut) {
  // 先不考虑转义的情况
  const viewData = []; // 展示用数据
  const mapping = {
    "(": ["(", ")"],
    "[": ["[", "]"],
    "{": ["{", "}"],
  };

  // 判断有没有，并且拿到是哪个 (包括量词的花括号)
  const exec = /[\(\[\{]{1}/g.exec(strOut);
  if(exec) {
    // 有符号的就先解析符号
    const matchChar = mapping[exec[0]];
    const pairArr = splitFromPaired(strOut, matchChar[0], matchChar[1]);

    // 前面肯定没有符号了
    if (pairArr[0]) {
      // 解析数量相关字符
      const quantArr = parseModuleQuants(pairArr[0]);
      viewData.push(...quantArr);
    }

    // 当前解析出来的，也放入
    const content = pairArr[1].slice(0 + 1, pairArr[1].length - 1);
    // console.log("符号内的内容 content:", content);
    viewData.push({
      expr: pairArr[1],
      explain: matchChar[0] == "{" 
          ? getDescCurly(content) 
          : CHARS_ENUM[(matchChar[0] + matchChar[1])]?.explain,
      // 把当前符号内的内容也继续解析，作为子项
      child: matchChar[0] == "{" ? null : parseRegularChild(content)
      // child: matchChar[0] == "{" ? null : [
      //   { expr: matchChar[0], explain: CHARS_ENUM[matchChar[0]]?.explain },
      //   ...parseRegularChild(content),
      //   { expr: matchChar[1], explain: CHARS_ENUM[matchChar[1]]?.explain },
      // ]
    });

    // 后面的，继续解析
    if (pairArr[2]) {
      const childArr = parseRegularChild(pairArr[2]);
      viewData.push(...childArr);
    }
  } else {
    viewData.push({
      expr: strOut,
      explain: CHARS_ENUM[strOut]?.explain ?? "匹配" + strOut
    });
  }
  
  return viewData;
}

/**
 * 解析: 数量字符
 */
function parseModuleQuants(strOut) {
  // 先不考虑转义的情况
  const viewData = []; // 展示用数据

  // 判断有没有，并且拿到是哪个
  const exec = /[\*\+\?]\??/g.exec(strOut);
  if(exec) {
    const matchChar = exec[0];
    const charArr = splitFromStr(strOut, matchChar);

    // 前面的
    if (charArr[0]) {
      viewData.push({
        expr: charArr[0],
        explain: CHARS_ENUM[strOut]?.explain ?? "匹配" + charArr[0]
      });
    }

    // 当前解析出来的，直接放入
    viewData.push({
      expr: matchChar,
      explain: CHARS_ENUM[matchChar]?.explain,
    });

    // 后面的继续解析
    if (charArr[2]) {
      const otherArr = parseModuleQuants(charArr[2]);
      viewData.push(...otherArr);
    }
  } else {
    viewData.push({
      expr: strOut,
      explain: CHARS_ENUM[strOut]?.explain ?? "匹配" + strOut
    });
  }

  return viewData;
}

/**
 * 解析: 位置边界（开始、结束）
 */
function parseModuleBoundary(strOut) {
  // 假定全局只有一个（且不考虑转义的情况）
  const sStr = "^", eStr = "$";
  const viewData = []; // 展示用数据
  let idx = -1; // 后面要解析的内容，在数组中的下标

  // 开始
  const startArr = splitFromStr(strOut, sStr);
  let startOther = "";
  // 有开始符号
  if (startArr[1]) {
    idx = 0;
    // 开始符号以后的内容
    startOther = startArr[2];
    viewData.push({
      expr: sStr,
      explain: CHARS_ENUM[sStr]?.explain
    })
  } else {
    startOther = startArr[0];
  }

  // 结束
  const endArr = splitFromStr(startOther, eStr);
  // 结束符号之前的内容
  if (endArr[0]) {
    idx += 1;
    viewData.push({
      expr: endArr[0],
      explain: "todo"
    });
  } else {
    idx = -1;
  }
  // 有结束符号
  if (endArr[1]) {
    viewData.push({
      expr: eStr,
      explain: CHARS_ENUM[eStr]?.explain
    })
  }
  
  // console.log("[parseModuleBoundary] idx:", idx, " viewData: ", viewData);
  return {
    idx,
    viewData
  };
}



/****** ----------------------------------  帮助方法  ------------------------------------ ******/

/**
 * 根据所给字符串，分割为 前、字符串、后
 * 
 * @param {String} strWhole 全部字符串
 * @param {String} strSplit 要分割的子字符串
 * @returns 最后分割后的字符串数组
 */
function splitFromStr(strWhole, strSplit) {
  const sInd = strWhole.indexOf(strSplit);
  if(sInd > -1) {
    const eInd = sInd + strSplit.length;
    return [
      strWhole.slice(0, sInd),
      strWhole.slice(sInd, eInd),
      strWhole.slice(eInd),
    ];
  }

  return [strWhole];
}

/**
 * 根据所给成对符号，分割为 前、符号及其内部内容、后
 * 
 * @param {String} strWhole 全部字符串
 * @param {String} strFront 要分割的开始
 * @param {String} strSplit 要分割的结束
 * @returns 最后分割后的字符串数组
 */
function splitFromPaired(strWhole, strFront, strEnd) {
  const [sInd, eInd] = matchBracket(strWhole, strFront, strEnd);
  if(sInd > -1) {
    return [
      strWhole.slice(0, sInd),
      strWhole.slice(sInd, eInd),
      strWhole.slice(eInd),
    ];
  }

  return [strWhole];
}

/**
 * 找到匹配的成对括号下标
 */
function matchBracket(strWhole, strFront, strEnd) {
  let count = 0;
  let sInd = -1;
  let eInd = -1;

  for (let i = 0; i < strWhole.length; i++) {
    const charItem = strWhole[i];
    if (charItem == strFront) {
      count++;
      if (sInd < 0) {
        sInd = i;
      }
    } else if (charItem == strEnd) {
      count--;
      if (count == 0) {
        eInd = i;
        break;
      }
    }
  }
  return [sInd, eInd + 1]
}

/**
 * 合并量词和限制范围
 */
function mergeLimitRange(outArr) {
  const mergeArr = [];
  for (let i = 0; i < outArr.length; i++) {
    const curr = outArr[i];
    const next = outArr[i + 1];

    // 如果有子表达式
    if (curr.child?.length > 0) {
      curr.child = mergeLimitRange(curr.child);
    }

    const marchChar = /^[\*\+\?]\??$/.exec(next?.expr)?.[0];
    const isCurly = /^\{\d+,?\d*?\}$/.exec(next?.expr)?.[0];
    if (next && (next.expr == marchChar || isCurly)) {
      mergeArr.push({
        expr: curr.expr + next.expr,
        explain: curr.explain + ", " + next.explain,
        tip: curr.tip + ", " + next.tip,
        child: curr.child
      });
      i++;
    } else {
      mergeArr.push(curr);
    }
  }
  return mergeArr;
}

/****** ----------------------------------  描述方法  ------------------------------------ ******/

/**
 * 添加花括号的描述
 */
function getDescCurly(content) {
  if (content.includes(",")) {
    const nums = content.split(",");
    return nums[1] 
        ? `${nums[0]}次到${nums[1]}次` 
        : `至少${nums[0]}次`;
  } else {
    return text = "仅" + content + "次"; 
  }
}

/**
 * 获取描述的具体文本
 */
function getExplainText(expr, type) {
  const explainMapping = {
    // 位置边界
    "^": "匹配每行的开始",
    "$": "匹配每行的结束",
    "\b": "匹配单词边界",
    "\B": "匹配非单词边界",
    // 量词
    "*": "零次或多次",
    "+": "一次或多次",
    "?": "零次或一次",
    "*?": "零次或多次(非贪婪模式，尽可能少地匹配)",
    "+?": "一次或多次(非贪婪模式，尽可能少地匹配)",
    "??": "零次或一次(非贪婪模式，尽可能少地匹配)",
  };

  // 开始结束
  if (type == "boundary") {
    return explainMapping[expr];
  }
  
  if (Object.keys(explainMapping).includes(expr)) {
    return explainMapping[expr];
  }
  // 具体数量
  if (expr.startsWith("{")) {
    return getDescCurly(content);
  }
  // 具体内容
  if (expr.startsWith("[")) {
    const [sInd, eInd] = matchBracket(expr, "[", "]"); 
    const content = expr.slice(sInd + 1, eInd - 1);
    return "匹配" + content + "中的任意一个"; 
  }
  if (expr.startsWith("(")) {
    const [sInd, eInd] = matchBracket(expr, "(", ")"); 
    const content = expr.slice(sInd + 1, eInd - 1);
    return "匹配" + content + "中的全部"; 
  }

  return "匹配" + expr;
}
