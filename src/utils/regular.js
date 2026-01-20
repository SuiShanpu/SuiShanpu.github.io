
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
    key: "char_bracket_range", 
    str: "[", 
    reg: /\[/, 
    explain: "匹配 [ ] 中的任意一个字符", 
    tip: "匹配 [ ] 中的任意一个字符。" 
  },
  "[": {
    key: "char_bracket_range_start", 
    str: "[", 
    reg: /\[/, 
    explain: "字符集的开始", 
    tip: "字符集的开始。" 
  },
  "]": {
    key: "char_bracket_range_end", 
    str: "]", 
    reg: /\]/, 
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
    {expr: "特殊字符", explain: '特殊字符具有特殊的含义，例如 \\d 匹配任意数字字符，\\w 匹配任意字母数字字符，. 匹配任意字符（除了换行符）等。' },
  ] },
  {title: "位置和边界 Anchors", items: [
    {expr: "^", explain: '默认情况下匹配整个字符串的开头，多行模式下匹配每行的开头。'},
    {expr: "$", explain: '默认情况下匹配整个字符串的结尾，多行模式下匹配每行的结尾。'},
    {expr: "\\b", explain: '匹配单词边界。'},
    {expr: "\\B", explain: '匹配非单词边界。'},
    {expr: "\\A", explain: '匹配字符串开头（不同于^，不受多行模式影响）。'},
    {expr: "\\Z", explain: '匹配字符串结尾或结尾的换行符之前。'},
  ] },
  {title: "分组和捕获 Groups", items: [
    {expr: "( )", explain: '用于分组和捕获子表达式,匹配并记住匹配子表达式。'},
    {expr: "(?: )", explain: '用于分组但不捕获子表达式,匹配但不记住匹配子表达式。'},
  ] },
  {title: "字符集 Ranges", items: [
    {expr: "[ ]", explain: '匹配括号内的任意一个字符。例如，[abc] 匹配字符 "a"、"b" 或 "c"。'},
    {expr: "[^ ]", explain: '匹配除了括号内的字符以外的任意一个字符。例如，[^abc] 匹配除了字符 "a"、"b" 或 "c" 以外的任意字符。'},
  ] },
  {title: "量词 Quanti­fiers", items: [
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
  {title: "转义字符集 Escape Ranges", items: [
    {expr: "\\d", explain: '匹配所有数字；相当于 [0-9]'},
    {expr: "\\D", explain: '匹配非数字；相当于 [^0-9]'},
    {expr: "\\w", explain: '匹配所有字母、所有数字、下划线；相当于 [A-Za-z0-9_]。'},
    {expr: "\\W", explain: '匹配非字母、数字、下划线；相当于 [^A-Za-z0-9_]。'},
    {expr: "\\s", explain: '匹配空白符、换行符。'},
    {expr: "\\D", explain: '匹配非空白符、换行符。'},
  ] },
  {title: "元字符 Meta Characters", items: [
    {expr: "\\", explain: '转义字符，用于匹配特殊字符本身。'},
    {expr: ".", explain: '匹配任意字符（除了换行符）。'},
    {expr: "|", explain: '用于指定多个模式的选择。'},
  ] },
  {title: "特殊字符 Special Characters", items: [
    {expr: "\\n", explain: '匹配换行符。'},
    {expr: "\\t", explain: '匹配制表符。'},
    {expr: "\\r", explain: '匹配回车符。'},
    {expr: "\\f", explain: '匹配换页符。'},
    {expr: "\\v", explain: '匹配垂直制表符。'},
  ] },
];



/**
 * 解析正则表达式
 * 
 * 运算符优先级
 * 
 * --  转义符 \ 
 *     需转义的有：^ $ ( ) [ ] { } * + ? | \ < > .
 * --  圆括号和方括号 (), (?:), (?=), [ ]
 * --  限定符（量词）*, +, ?, {n}, {n,}, {n,m}
 * --  任何元字符、任何字符 ^, $, \w
 * --  或操作 | 
 * 
 * @param {String} regExp 正则表达式字符串 
 * @returns {Array} 正则表达式解析后的数据
 */


export const mockData = [
  { expr: "^", type: "", content: "", explain: "表达式的开头", tip: "dfdf" },
  { expr: "[+-]?\d+(\.\d+)", explain: "匹配括号内的任意一个字符零次或一次", expand: true, children: [
    { expr: "[", explain: "字符集的开头", tip: "234" },
    { expr: "+-", explain: "字符集的内容", expand: true, children: [
      { expr: "+", explain: "普通字符", tip: "234" },
      { expr: "-", explain: "普通字符", tip: "234" },
    ] },
    { expr: "]", explain: "字符集的结尾", tip: "he" },
    { expr: "?", explain: "匹配括号内字符的数量,匹配零次或一次", tip: "33" },
  ] },
  { expr: "$", explain: "表达式的结尾", tip: "g32523" },
]


export const mockDataCTree = {
          'id': '1',
          'expr': 'Lao Lao',
          'title': 'general manager',
          'children': [
            { 'id': '2', 'expr': 'Bo Miao', 'title': 'department manager' },
            { 'id': '3', 'expr': 'Su Miao', 'title': 'department manager',
              'children': [
                { 'id': '4', 'expr': 'Tie Hua', 'title': 'senior engineer' },
                { 'id': '5', 'expr': 'Hei Hei', 'title': 'senior engineer',
                  'children': [
                    { 'id': '6', 'expr': 'Pang Pang', 'title': 'engineer' },
                    { 'id': '7', 'expr': 'Xiang Xiang', 'title': 'UE engineer' }
                  ]
                 }
               ]
             },
            { 'id': '8', 'expr': 'Hong Miao', 'title': 'department manager' },
            { 'id': '9', 'expr': 'Chun Miao', 'title': 'department manager' }
          ]
        }


/**
 * 解析正则表达式为语法树结构
 * @param {String} regExp 要解析的正则表达式
 * @returns 语法树结构
 */
export function parseRegular(regExp) {
  // 〇、校验 
  // todo 后面补上

  // 一、分割：位置边界（同时添加描述）
  const anchorParseData = parseModuleAnchors(regExp + "");
  const bodyInd = anchorParseData.findIndex(item => item.type == "body");

  if (bodyInd !== -1) {
    // 二、层级解析，构建数据层级（同时添加描述）
    const levelData = parseRegularChild(anchorParseData[bodyInd].expr);
    console.log("层级解析:", levelData);
    
    // 三、平级内容解析
    // 成对符号 & 数量符号（将括号外的特殊数量符号 *+？也作为成对符号进行分割）
    const flatData = parseModuleFlat(levelData);
    console.log("平级内容解析:", flatData);

    
  
    // 四、合并： 限制 + 数量；或操作 | 前后
    const mergeData = mergeLimitRange(flatData);
    console.log("合并量词:", mergeData);

    anchorParseData[bodyInd].children = mergeData;
  }

  // 转化为视图数据格式
  return anchorParseData;
}


/****** ----------------------------------  解析各个模块  ------------------------------------ ******/


/**
 * 解析: 位置边界（开始、结束）
 */
function parseModuleAnchors(strOut) {
  // 假定全局只有一个（且不考虑转义的情况）
  const viewData = []; // 展示用数据
  
  // 判断有没有 开始符号 ^
  const execS = /(?<!\[)\^/.exec(strOut);
  let startOther = "";
  if (execS) {
    const sChar = execS[0];
    const startArr = splitFromStr(strOut, sChar);
    viewData.push({
      id: sChar,
      expr: sChar,
      type: "start",
      explain: CHARS_ENUM[sChar]?.explain
    })
    startOther = startArr[2];
  } else {
    startOther = strOut;
  }

  // 判断有没有 结束符号 $
  const execE = /\$/.exec(startOther);
  if (execE) {
    const eChar = execE[0];
    const endArr = splitFromStr(startOther, eChar);
    // 结束符号之前的内容
    if (endArr[0]) {
      viewData.push({
        id: endArr[0],
        expr: endArr[0],
        type: "body",
        explain: "要匹配的全部内容",
        expand: true,
      });
    }
    // 有结束符号
    if (endArr[1]) {
      viewData.push({
        id: eChar,
        expr: eChar,
        type: "end",
        explain: CHARS_ENUM[eChar]?.explain
      })
    }
  }
  
  return viewData;
}

/**
 * 解析: 嵌套结构 (包括层级)
 * todo 只有 () 有嵌套结构 
 * 
 * @param {String} strOut 正则子表达式
 * @returns {Array} 嵌套结构数据
 */
function parseRegularChild(strOut) {
  // 先不考虑转义的情况
  const viewData = []; // 展示用数据

  // 判断有没有 (
  const exec = /\(/g.exec(strOut);
  if(exec) {
    // 有符号的就先解析符号
    const pairArr = splitFromPaired(strOut, exec[0]);

    // 前面肯定没有符号了
    if (pairArr[0]) {
      // 解析数量相关字符
      viewData.push({
        id: pairArr[0],
        expr: pairArr[0],
      });
    }

    // 当前解析出来的，也放入
    const content = pairArr[1].slice(0 + 1, pairArr[1].length - 1);
    viewData.push({
      id: pairArr[1],
      expr: pairArr[1],
      type: "child",
      explain: CHARS_ENUM["()"]?.explain,
      expand: true,
      // 把当前符号内的内容也继续解析，作为子项
      children: parseRegularChild(content)
    });

    // 后面的，继续解析
    if (pairArr[2]) {
      const childArr = parseRegularChild(pairArr[2]);
      viewData.push(...childArr);
    }
  } else {
    viewData.push({
      id: strOut,
      expr: strOut,
    });
  }
  
  return viewData;
}

/**
 * 解析: 平级内容
 */
function parseModuleFlat(outArr) {
  const flatArr = [];
  for (let i = 0; i < outArr.length; i++) {
    const curr = outArr[i];

    // 只解析没有子项的
    if (curr.children?.length > 0) {
      curr.children = parseModuleFlat(curr.children);
      flatArr.push(curr);
    } else {
      // 平级 第一步，拆出所有的平级。 
      // [] 拆解
      const gaqArr = parseModuleRangeAndQuant(curr.expr);
      gaqArr.map(item => {
        // 单个字符拆解
        if (!item.type) {
          const charArr = parseRegularCharacter(item.expr);
          flatArr.push(...charArr);
        } else if (item.type == "range") {
          // 添加前后缀
          let contentOut = item.expr.slice(1, -1); // 去掉 []
          if (contentOut.startsWith("^")) {
            item.prefix = "[^";
            contentOut = contentOut.slice(1);
          } else {
            item.prefix = "[";
          }
          item.expr = contentOut;
          item.suffix = "]";

          item.children = parseRegularRangeCharacter(contentOut);
          flatArr.push(item);
        } else {
          flatArr.push(item);
        }
      })

      // [] 这个比较特殊；需要分割为子项,子项内要处理 A-Z 这种格式的字符集
      // 平级 第二步，{} *+?
      // 平级 第三步，转义字符集 \w \W \s \S \d \D
    }
  }
  return flatArr;
}

/**
 * 解析: 数据集 [] 及其中间的数据
 */
function parseModuleRangeAndQuant(strOut) {
  // 先不考虑转义的情况
  const viewData = []; // 展示用数据

  // 判断有没有，并且拿到是哪个
  const execRes = /\[|\{|[\*\+\?]\??/.exec(strOut);
  let matchChar = "";
  let matchType = "";
  let splitArr = [];

  if (execRes) {
    matchChar = execRes[0];
    if (matchChar == "[") {
      // 成对符号 []
      matchType = "range";
      splitArr = splitFromPaired(strOut, matchChar)
    } else if (matchChar == "{") {
      // 成对符号 {}
      matchType = "quant";
      splitArr = splitFromPaired(strOut, matchChar)
    } else {
      // 特殊符号 *+？
      matchType = "quant";
      splitArr = splitFromStr(strOut, matchChar)
    }
  }

  // 字符集
  // 成对符号 []
  // 内部 转义符号 \w \W \s \S \d \D

  // 限制符 (量词)，包括 {} 和 *+?

  // 没有拆分
  if(splitArr.length == 0) {
    viewData.push({
      id: strOut,
      expr: strOut,
      explain: "没有拆分"
    });
  } else {
    // 是匹配到了才去拆分了，肯定是3条数据的数组
    // 前面的
    if (splitArr[0]) {
      viewData.push({
        id: splitArr[0],
        expr: splitArr[0],
        explain: "不能拆了"
      });
    }

    // 当前解析出来的，直接放入
    viewData.push({
      id: splitArr[1],
      expr: splitArr[1],
      type: matchType,
      expand: true,
      explain: "当前解析出来的，直接放入",
    });

    // 后面的继续解析
    if (splitArr[2]) {
      const otherArr = parseModuleRangeAndQuant(splitArr[2]);
      viewData.push(...otherArr);
    }
  }

  return viewData;
}

/**
 * 解析: 字符集中的单个字符
 */
function parseRegularRangeCharacter(strOut) {
  // 先不考虑转义的情况
  const viewData = []; // 展示用数据

  // ^ 这个 会被解析到 最外层 todo

  // 判断有没有，并且拿到是哪个
  const execRes = /(\S)-(\S)/.exec(strOut);
  let matchChar = "";
  let matchType = "";
  let splitArr = [];
  
  if (execRes) {
    matchChar = execRes[0];
    matchType = "range_fromto";
    splitArr = splitFromStr(strOut, matchChar)
  }

  // 没有拆分
  if(splitArr.length == 0) {
    const charArr = parseRegularCharacter(strOut);
    viewData.push(...charArr);
  } else {
    // 是匹配到了才去拆分了，肯定是3条数据的数组
    // 前面的
    if (splitArr[0]) {
      const charArr = parseRegularCharacter(splitArr[0]);
      viewData.push(...charArr);
    }

    // 当前解析出来的，直接放入
    viewData.push({
      id: splitArr[1],
      expr: splitArr[1],
      type: matchType,
      explain: "当前解析出来的，直接放入",
    });

    // 后面的继续解析
    if (splitArr[2]) {
      const otherArr = parseRegularRangeCharacter(splitArr[2]);
      viewData.push(...otherArr);
    }
  }

  return viewData;
}

/**
 * 解析: 单个字符
 */
function parseRegularCharacter(strOut) {
  // 先不考虑转义的情况
  const viewData = []; // 展示用数据

  // 判断有没有，并且拿到是哪个
  const execRes = /(\\d)|(\\D)|(\\w)|(\\W)|(\\d)|(\\D)/.exec(strOut);
  let matchChar = "";
  let matchType = "";
  let splitArr = [];

  if (execRes) {
    matchChar = execRes[0];
    // 转义符号 \d \D \w \W \s \S
    matchType = "escape";
    splitArr = splitFromStr(strOut, matchChar)
  }

  // 没有拆分
  if(splitArr.length == 0) {
    strOut.split("").map(charSingle => {
      viewData.push({
        id: charSingle,
        expr: charSingle,
        type: "single",
        explain: "单字符",
      });
    });
  } else {
    // 是匹配到了才去拆分了，肯定是3条数据的数组
    // 前面的
    if (splitArr[0]) {
      splitArr[0].split("").map(charSingle => {
        viewData.push({
          id: charSingle,
          expr: charSingle,
          type: "single",
          explain: "单字符",
        });
      });
    }

    // 当前解析出来的，直接放入
    viewData.push({
      id: splitArr[1],
      expr: splitArr[1],
      type: matchType,
      explain: "当前解析出来的，直接放入",
    });

    // 后面的继续解析
    if (splitArr[2]) {
      const otherArr = parseRegularCharacter(splitArr[2]);
      viewData.push(...otherArr);
    }
  }

  return viewData;
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
 * @param {String} strBracket 要分割的开始
 * @param {String} strSplit 要分割的结束
 * @returns 最后分割后的字符串数组
 */
function splitFromPaired(strWhole, strBracket) {
  const [sInd, eInd] = matchBracket(strWhole, strBracket);
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
function matchBracket(strWhole, strBracket) {
  const mapping = {
    "(": ["(", ")"],
    "[": ["[", "]"],
    "{": ["{", "}"],
  };
  const [strFront, strEnd] = mapping[strBracket];

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
    if (curr.children?.length > 0) {
      curr.children = mergeLimitRange(curr.children);
    }

    const marchChar = /^[\*\+\?]\??$/.exec(next?.expr)?.[0];
    const isCurly = /^\{\d+,?\d*?\}$/.exec(next?.expr)?.[0];
    if (next && (next.expr == marchChar || isCurly)) {
      curr.suffix = (curr.suffix ?? "") + next.expr;
      curr.type = curr.type + "_" + next.type;
      curr.explain = curr.explain + ", " + next.explain;
      mergeArr.push(curr);
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
    return "仅" + content + "次"; 
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
    const [sInd, eInd] = matchBracket(expr, "["); 
    const content = expr.slice(sInd + 1, eInd - 1);
    return "匹配" + content + "中的任意一个"; 
  }
  if (expr.startsWith("(")) {
    const [sInd, eInd] = matchBracket(expr, "("); 
    const content = expr.slice(sInd + 1, eInd - 1);
    return "匹配" + content + "中的全部"; 
  }

  return "匹配" + expr;
}
