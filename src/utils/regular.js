
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
    {expr: "\\S", explain: '匹配非空白符、非换行符。'},
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
 * 
 * 运算符优先级
 * 
 * --  escape 转义符 \ 字符集如：\w \W \s \S \d \D， 操作符如：^ $ ( ) [ ] { } * + ? | \ < > .
 * --  group 圆括号 (), (?:), (?=), (?!), (?<=), (?<!)
 * --  range 方括号 [], [^]
 * --  quant 限定符（量词）*, +, ?, {n}, {n,}, {n,m}
 * --  start end 边界序列 ^, $
 * --  or 或操作 | 
 * 
 * @param {String} regExp 正则表达式字符串 
 * @returns {Array} 语法树结构数据
 */
export function parseRegular(regExp) {
  // 一、校验 
  // todo 后面补上

  const rootObj = {
    expr: regExp + "",
    type: "root"
  };

  // 二、按照优先级，从低到高开始解析（对象）
  // 1、或操作 | 相当于加了一层圆括号，会分层级
  // 4、圆括号和方括号  分层级
  let rootLevels = parsePartLevels(rootObj);
  if (rootLevels.length == 0) {
    // 没有层级时
    rootLevels = [rootObj];
  }
  console.log("rootLevels 层级解析:", rootLevels);

  // 2、边界序列 ^, $ 相当于加了一层圆括号，不分层级
  // 3、限定符（量词） 需要找到它之前的字符，作为一个后缀显示，在当前层级
  // 修改了显示规则，这个最后重新合并
  const rootPeers = parsePartPeers(rootLevels);
  console.log("rootPeers 平级解析:", rootPeers);

  // 5、转义符 不分层级（拆分单个的）
  // （放在每一个 正则的判断中，还需要添加特殊符号的转义判断）
  const rootEscapes = parsePartEscapes(rootPeers);
  console.log("rootEscapes 字符解析:", rootEscapes);
  
  // o1: 合并限制符与前面的一个字符
  const rootMerges = mergeLimitRange(rootEscapes);
  console.log("rootMerges 合并量词:", rootMerges);


  return rootMerges;
}


/****** ----------------------------------  解析各个模块（第三版）------------------------------------ ******/

/**
 * 层级解析: 逻辑或
 */
function parsePartOrs(objOut) {
  const {expr: strOut, type: typeOut} = objOut;
  // 先不考虑转义的情况
  const viewData = []; // 展示用数据

  // 判断有没有 ｜
  // todo 正则有点问题。 如果是 (()|) 这样的结构，也会找出来
  const execRes = /(?<!\([^()]*)\|/.exec(strOut);
  if(execRes) {
    // 有的话，拆分出来的子项会有层级
    let matchChar = execRes[0];
    const matchInd = execRes.index;
    const splitArr = splitFromIndex(strOut, matchInd, matchInd + matchChar.length);

    // 前面的子项
    if (splitArr[0]) {
      viewData.push({
        expr: splitArr[0],
        type: "or_part",
      });
    }
    // 或符号
    viewData.push({
      expr: splitArr[1],
      type: "or",
    });
    // 后面的，继续拆分（这个拆分是平级的）
    // 最后一项，如果不能拆分，需要层级符号
    if (splitArr[2]) {
      const otherArr = parsePartOrs({
        expr: splitArr[2],
        type: "or_part",
      });
      viewData.push(...otherArr);
    }
  } else {
    // 返回它自己 (必须解构，否则会嵌套)
    viewData.push({...objOut});
  }

  return viewData;
}

/**
 * 层级解析: 分组符
 */
function parsePartGroups(objOut) {
  const {expr: strOut, type: typeOut} = objOut;
  // 先不考虑转义的情况
  const viewData = []; // 展示用数据

  let matchChar = "";
  let matchType = "";
  let splitArr = [];
  
  // 判断有没有 ( [   同时判断，按照出现的先后顺序
  const execRes = /\(|\[/.exec(strOut);
  if(execRes) {
    matchChar = execRes[0];
    if (matchChar == "(") {
      matchType = "group";
      splitArr = splitFromPaired(strOut, matchChar);
    } else if (matchChar == "[") {
      matchType = "range";
      splitArr = splitFromPaired(strOut, matchChar);
    }

    // 前面的子项
    if (splitArr[0]) {
      viewData.push({
        expr: splitArr[0],
      });
    }
    // 当前解析出来的
    let content = splitArr[1].slice(1, -1);
    let prefix = "", suffix = "";
    // 添加前后缀,截取内容
    if (matchType == "range") {
      prefix = "[", suffix = "]";
      const execPre = /^\^/.exec(content);
      if (execPre) {
        prefix += execPre[0];
        content = content.slice(execPre[0].length);
      }
    } else if (matchType == "group") {
      let content = splitArr[1].slice(1, -1);
      const execPre = /^\?<?[:=!]/.exec(content);
      prefix = "(", suffix = ")";
      if (execPre) {
        prefix += execPre[0];
        content = content.slice(execPre[0].length);
      }
    }
    viewData.push({
      expr: content,
      prefix,
      suffix,
      type: matchType,
    });
    // 后面的，继续拆分（这个拆分是平级的）
    // 最后一项，如果不能拆分，需要层级符号
    if (splitArr[2]) {
      const otherArr = parsePartGroups({
        expr: splitArr[2],
      });
      viewData.push(...otherArr);
    }
  } else {
    // 返回它自己 (必须解构，否则会嵌套)
    viewData.push({...objOut});
  }

  return viewData;
}

/**
 * 解析: 分层级的字符
 * 
 * 1 逻辑或 |
 * 2 分组符 ()
 * 这个是有先后顺序的，必须先 ｜ 再 ()
 */
function parsePartLevels(objOut) {
  const {expr: strOut, type: typeOut} = objOut;
  
  // 先不考虑转义的情况
  const execOr = /(?<!\([^()]*)\|/.exec(strOut);
  const execGp = /\(|\[/.exec(strOut);

  let levelChild = [];
  if (execOr) {
    // 有逻辑或
    levelChild = parsePartOrs(objOut);
  } else if(execGp) { 
    // 有分组符
    levelChild = parsePartGroups(objOut);
  }

  // 处理子类
  levelChild.forEach((subItem) => {
    if (["or_part", "group", "range"].includes(subItem.type)) {
      const subArr = parsePartLevels(subItem);
      if (subArr.length > 0) {
        subItem.children = [...subArr];
      }
    }
  });

  return levelChild;
}

/**
 * 平级解析: A位置边界、Q限制符（量词）
 * -- 没有层级，只看前后位置，谁先出现先分割谁
 */
function parsePartAqs(objOut) {
  const {expr: strOut, type: typeOut} = objOut;
  // 先不考虑转义的情况
  const viewData = []; // 展示用数据
  
  // 判断有没有 开始符号 ^
  const execRes = /(?<!\[)\^|\$|\{|[\*\+\?]\??/.exec(strOut);
  let matchChar = "";
  let matchType = "";
  let splitArr = [];

  if (execRes) {
    matchChar = execRes[0];
    const matchInd = execRes.index;
    if (matchChar == "^") {
      // 开始符号 ^
      matchType = "start";
      // todo 这里需要 index 下标
      splitArr = splitFromIndex(strOut, matchInd, matchInd + matchChar.length);
    } else if (matchChar == "$") {
      // 结束符号 $
      matchType = "end";
      splitArr = splitFromIndex(strOut, matchInd, matchInd + matchChar.length);
    } else  if (matchChar == "{") {
      // 成对符号 {}
      matchType = "quant";
      splitArr = splitFromPaired(strOut, matchChar)
    } else {
      // 特殊符号 *+？
      matchType = "quant";
      splitArr = splitFromIndex(strOut, matchInd, matchInd + matchChar.length)
    }


    // 前面的直接放入
    if (splitArr[0]) {
      viewData.push({
        expr: splitArr[0],
      });
    }
    // 符号本身
    viewData.push({
      expr: splitArr[1],
      type: matchType,
    })
    // 后面的继续解析
    if (splitArr[2]) {
      const otherArr = parsePartAqs({
        expr: splitArr[2],
      });
      viewData.push(...otherArr);
    }
  } else {
    // 返回它自己 (必须解构，否则会嵌套)
    // todo range 里面有前后缀，还有 type
    viewData.push({...objOut});
  }
  
  return viewData;
}

/**
 * 解析: 平级的字符，这些都是分在当前层级的
 * 
 * -- 位置边界  ^ $
 * -- 限制符（量词） {} * + ? *? +? ??
 */
function parsePartPeers(arrOut) {
  const peerArr = [];

  for (let i = 0; i < arrOut.length; i++) {
    const rItem = arrOut[i];
    if (rItem.children?.length > 0) {
      // 有子项的，递归循环
      const newChildren = parsePartPeers(rItem.children);
      peerArr.push({
        ...rItem,
        children: newChildren
      });
    } else {
      // 没有子项的，进行平级解析
      const aqArr = parsePartAqs(rItem);

      // todo 这3个判断的顺序 层级？？
      if (aqArr.length <= 1) {
        // 可能会匹配到，但是只有一个值 (type 会改变)
        peerArr.push({
          ...rItem,
          ...aqArr[0]
        });
      } else if (["or_part", "group", "range"].includes(rItem.type)) {
        peerArr.push({
          ...rItem,
          children: aqArr
        });
      } else {
        peerArr.push(...aqArr);
      }
    }
  }
  
  return peerArr;
}

/**
 * 字符解析: 字符集中的字符
 * 
 * [] 内有解析顺序：
 *    1、先解析 A-Z 这种格式的字符集
 *    2、再解析 \w \W \s \S \d \D
 *    3、最后是单字符
 */
function parsePartRangeChars(objOut) {
  const {expr: strOut, type: typeOut} = objOut;
  // 先不考虑转义的情况
  const viewData = []; // 展示用数据

  // 判断有没有，并且拿到是哪个
  // todo 这个，如果前后有转义符？ 一般不会有，除非写错了
  const execRes = /(\S)-(\S)/.exec(strOut);
  let matchChar = "";
  let matchType = "";
  let splitArr = [];
  
  if (execRes) {
    matchChar = execRes[0];
    matchType = "range_fromto";
    splitArr = splitFromStr(strOut, matchChar)

    // 是匹配到了才去拆分了，肯定是3条数据的数组
    // 前面的
    if (splitArr[0]) {
      const charArr = parsePartChars({
        expr: splitArr[0],
        type: "range_char"
      });
      viewData.push(...charArr);
    }

    // 当前解析出来的，直接放入
    viewData.push({
      expr: splitArr[1],
      type: matchType,
    });

    // 后面的继续解析
    if (splitArr[2]) {
      const otherArr = parsePartRangeChars({
        expr: splitArr[2],
        type: "range_char"
      });
      viewData.push(...otherArr);
    }
  } else {
    const charArr = parsePartChars({
      expr: strOut,
      type: "range_char"
    });
    viewData.push(...charArr);
  }

  return viewData;
}

/**
 * 字符解析: 单个字符
 * 有解析顺序：
 *    1、先解析 \w \W \s \S \d \D
 *    2、然后是单字符
 */
function parsePartChars(objOut) {
  const {expr: strOut, type: typeOut} = objOut;
  // 先不考虑转义的情况
  const viewData = []; // 展示用数据

  // 判断有没有，并且拿到是哪个
  const execRes = /(\\d)|(\\D)|(\\w)|(\\W)|(\\s)|(\\S)/.exec(strOut);
  let matchChar = "";
  let matchType = "";
  let splitArr = [];

  if (execRes) {
    matchChar = execRes[0];
    // 转义符号 \d \D \w \W \s \S
    matchType = "escape";
    splitArr = splitFromStr(strOut, matchChar)

    // 是匹配到了才去拆分了，肯定是3条数据的数组
    // 前面的
    if (splitArr[0]) {
      splitArr[0].split("").map(charSingle => {
        viewData.push({
          expr: charSingle,
          type: "char",
        });
      });
    }

    // 当前解析出来的，直接放入
    viewData.push({
      expr: splitArr[1],
      type: matchType,
    });

    // 后面的继续解析
    if (splitArr[2]) {
      const otherArr = parsePartChars({
        expr: splitArr[2],
        type: "char"
      });
      viewData.push(...otherArr);
    }
  } else {
    strOut.split("").map(charSingle => {
      viewData.push({
        expr: charSingle,
        type: "char",
      });
    });
  }

  return viewData;
}

/**
 * 解析: 字符集字符、转义符、单字符
 * 
 * -- 字符集字符  A-Z、0-9 等
 * -- 转义符 \w \W \s \S \d \D
 * -- 单字符
 */
function parsePartEscapes(arrOut) {
  const escapeArr = [];

  for (let i = 0; i < arrOut.length; i++) {
    const rItem = arrOut[i];
    if (rItem.children?.length > 0) {
      // 有子项的，递归循环
      const newChildren = parsePartEscapes(rItem.children);
      escapeArr.push({
        ...rItem,
        children: newChildren
      });
    } else {
      // 没有子项的，进行字符解析
      let singleArr = [];
      if (["or", "start", "end", "quant"].includes(rItem.type)) {
        // 不处理
      } else if (rItem.type == "range") {
        singleArr = parsePartRangeChars(rItem);
      } else {
        singleArr = parsePartChars(rItem);
      }

      // todo 这3个判断的顺序 层级？？
      if (singleArr.length <= 1) {
        // 可能会匹配到，但是只有一个值 (type 会改变)
        escapeArr.push({
          ...rItem,
          ...singleArr[0]
        });
      } else if (["or_part", "group", "range"].includes(rItem.type)) {
        escapeArr.push({
          ...rItem,
          children: singleArr
        });
      } else {
        escapeArr.push(...singleArr);
      }
    }
  }

  return escapeArr;
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


/****** ----------------------------------  帮助方法  ------------------------------------ ******/

/**
 * 根据所给下标，分割为 前、字符串、后
 * 
 * @param {String} strWhole 全部字符串
 * @param {String} indSplit 要分割的开始下标
 * @returns 最后分割后的字符串数组
 */
function splitFromIndex(strWhole, sInd, eInd) {
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
