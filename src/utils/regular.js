
/**
 * 描述的提示数据
 */
export const DESC_TIPS = [
  {title: "字符", items: [
    {expr: "普通字符", desc: '普通字符按照字面意义进行匹配，例如匹配字母 "a" 将匹配到文本中的 "a" 字符。' },
    {expr: "元字符", desc: '元字符具有特殊的含义，例如 \d 匹配任意数字字符，\w 匹配任意字母数字字符，. 匹配任意字符（除了换行符）等。' },
  ] },
  {title: "字符集", items: [
    {expr: "[ ]", desc: '匹配括号内的任意一个字符。例如，[abc] 匹配字符 "a"、"b" 或 "c"。'},
    {expr: "[^ ]", desc: '匹配除了括号内的字符以外的任意一个字符。例如，[^abc] 匹配除了字符 "a"、"b" 或 "c" 以外的任意字符。'},
  ] },
  {title: "分组和捕获", items: [
    {expr: "( )", desc: '用于分组和捕获子表达式。'},
    {expr: "(?: )", desc: '用于分组但不捕获子表达式。'},
  ] },
  {title: "量词", items: [
    {expr: "*", desc: '匹配前面的模式零次或多次。'},
    {expr: "+", desc: '匹配前面的模式一次或多次。'},
    {expr: "?", desc: '匹配前面的模式零次或一次。'},
    {expr: "{n}", desc: '匹配前面的模式恰好 n 次。'},
    {expr: "{n,}", desc: '匹配前面的模式至少 n 次。'},
    {expr: "{n,m}", desc: '匹配前面的模式至少 n 次且不超过 m 次。'},
  ] },
  {title: "特殊字符", items: [
    {expr: "^", desc: '匹配字符串的开头。'},
    {expr: "$", desc: '匹配字符串的结尾。'},
    {expr: "\\", desc: '转义字符，用于匹配特殊字符本身。'},
    {expr: ".", desc: '匹配任意字符（除了换行符）。'},
    {expr: "|", desc: '用于指定多个模式的选择。'},
    {expr: "\\b", desc: '匹配单词边界。'},
    {expr: "\\B", desc: '匹配非单词边界。'},
  ] },
  // {title: "", items: [
    
  // ] },
];


/**
 * 字符说明
 * 
 * 主键说明
 * 字符 char 
 *    量词限定字符 char_limit
 *    特殊字符 char_special
 *    普通字符 char_common
 * 符号 sign
 *    量词限定符号 sign_limit
 *    集合符号 sign_brace
 */
const CHARS_ENUM = {
  "char_special_start": {key: "char_special_start", str: "^", reg: /\^/, desc: "表达式的开始", tip: "匹配表达式的开头" },
  "char_special_end": {key: "char_special_end", str: "$", reg: /\$/, desc: "表达式的开始", tip: "匹配表达式的开头" },
};


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
export function parseRegular(regExp) {
  // 注意转义符号 \
  // let regExpStr = "[0-9]+abc$";
  // let regExpStr = "^[+-]?\d+(\.\d+)?$";
  let regExpStr = regExp + "";

  // 0、校验


  // --------  第一层
  // 1、转义符（先忽略）
  // 2、找到 圆括号和方括号
  // 3、找到 限定符（量词）
  // 4、元字符、任何字符
  // 5、或操作（先忽略）
  
  // 找到所有括号
  const resBrackets = parseModuleBrackets(regExpStr);
  console.log("所有括号:", resBrackets);

  // 特殊字符
  let resSpecials = [];
  resBrackets.forEach(bracket => {
    const charArr = parseModuleCharsSpecial(bracket);
    resSpecials = resSpecials.concat(charArr);
  })
  console.log("特殊字符:", resSpecials);
  const descL1 = addDescLevel1(resSpecials);
  
  // 合并量词
  const resLimits = mergeLimitRange(descL1);
  console.log("合并量词:", resLimits);

  // 添加第一层的解释

  // 转化为视图数据格式
  return resLimits
}






/**
 * 转化为视图数据格式
 */
function formatForView(parseArr) {
  const viewArr = [];
  parseArr.forEach(item => {
    viewArr.push({
      expr: item, explain: "xxxxxx", tip: "222",
    })
  });
  console.log("viewArr:", viewArr);
  return viewArr;
}

/****** ----------------------------------  解析子模块  ------------------------------------ ******/


/**
 * 解析所有括号
 */
function parseModuleBrackets(strOut) {
  // 先不考虑转义的情况

  // 判断有没有，并且拿到是哪个
  const mapping = {
    "(": ["(", ")"],
    "[": ["[", "]"],
    "{": ["{", "}"],
  };
  const exec = /[\(\[\{]{1}/g.exec(strOut);
  if(exec) {
    const matchChar = mapping[exec[0]];
    // console.log("matchChar:", matchChar);
    const sResArr = splitFromPaired(strOut, matchChar[0], matchChar[1]);
    if (sResArr[2]) {
      const sChildArr = parseModuleBrackets(sResArr[2]);
      return [sResArr[0], sResArr[1], ...sChildArr].filter(item => item != "");
    }
    return sResArr.filter(item => item != "");
  } else {
    return [strOut];
  }

}


/**
 * 解析特殊字符 (这里不分层)
 */
function parseModuleCharsSpecial(strOut) {
  // 先不考虑转义的情况

  // 判断有没有，并且拿到是哪个
  const exec = /[\^\$\*\+\?]\??/g.exec(strOut);
  if(exec) {
    const matchChar = exec[0];
    const sResArr = splitFromStr(strOut, matchChar);
    if (sResArr[2]) {
      const sChildArr = parseModuleCharsSpecial(sResArr[2]);
      return [sResArr[0], sResArr[1], ...sChildArr].filter(item => item != "");
    }
    return sResArr.filter(item => item != "");
  } else {
    return [strOut];
  }

}

/**
 * 开始结束
 */
function parseModuleAnchor(strOut) {
  // 假定全局只有一个（且不考虑转义的情况）
  const { str: sStr, reg: sReg } = CHARS_ENUM["char_special_start"];
  const { str: eStr, reg: eReg } = CHARS_ENUM["char_special_end"];
  
  const sRes = splitFromStr(strOut, sStr);
  console.log("开始结束:", sRes);
  const eRes = splitFromStr(sRes[2], eStr); // 这是写死的 顺序，成对出现的

  const splitRes = [sRes[0], sRes[1], eRes[0], eRes[1], eRes[2]].filter(item => item != "");
  return splitRes;
}




/**
 * 解析正则子表达式（纯解析数据，可递归）
 * 
 * @param {String} regExp 正则子表达式字符串 
 * @returns {Array} 正则表达式解析后的数据
 */
export function parseRegularChild(regExp1) {
  // 注意转义符号 \
  let regExp = /^[0-9]+abc$/;

  // 1、找到开始和结束。
  


  let res = [];
  return res;
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
    if (next && /[\{\*\+\?]/.exec(next.expr)) {
      mergeArr.push({
        expr: curr.expr + next.expr,
        explain: curr.explain + ", " + next.explain,
        tip: curr.tip + ", " + next.tip,
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
 * 添加第一层的描述
 */
function addDescLevel1(parseArr) {
  const viewArr = [];
  parseArr.forEach(item => {
    const desc = getDesc(item);
    viewArr.push({
      expr: item, explain: desc, tip: "空",
    })
  });
  console.log("viewArr:", viewArr);
  return viewArr;
}

/**
 * 获取描述的具体文本
 */
function getDesc(expr) {
  const descMapping = {
    "^": "表达式的开始",
    "$": "表达式的结束",
    "*": "零次或多次",
    "+": "一次或多次",
    "?": "零次或一次",
    "*?": "零次或多次(非贪婪模式，尽可能少地匹配)",
    "+?": "一次或多次(非贪婪模式，尽可能少地匹配)",
    "??": "零次或一次(非贪婪模式，尽可能少地匹配)",
  };

  if (Object.keys(descMapping).includes(expr)) {
    return descMapping[expr];
  }
  // 具体数量
  if (expr.startsWith("{")) {
    const content = expr.replace(/[\{\}]/g, '');
    if (content.includes(",")) {
      const nums = content.split(",");
      return nums[1] 
          ? `${nums[0]}次到${nums[1]}次` 
          : `至少${nums[0]}次`;
    } else {
      return "仅" + content + "次"; 
    }
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
