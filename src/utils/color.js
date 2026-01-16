

/*------------------- 说明  ------------------------------------*/

// 所有的转化都是基于一个 colorObj 来进行
// {
//   red: 102,
//   green: 66,
//   blue: 221,
//   alpha: 0.3,
// }

// // 4种情况
  // #fff      #fff8
  // #f7f8f9    #f7f8f980
  // 

  // 2种情况
  // rgb(255,255,255)     rgb(255 255 255)
  // rgba(255,255,255,1 )   rgb(255 255 255 1)

/*------------------- 基本转换  ------------------------------------*/

/**
 * 对象转为 RGBA
 * @param {String} colorObj 颜色对象
 * @returns RGBA 文本
 */
export function objToRgba(colorObj) {
  if (!colorObj.alpha) {
    return `rgb(${colorObj.red}, ${colorObj.green}, ${colorObj.blue})`;
  }

  return `rgba(${colorObj.red}, ${colorObj.green}, ${colorObj.blue}, ${colorObj.alpha})`;
}

/**
 * 16进制 转为颜色对象
 * @param {String} rgbaObj 16进制
 * @returns 颜色对象
 */
export function hexToObj(hexStr) {
  const numStr = hexStr.replace("#", "");
  const numStArr = [];
  if (numStr.length == 3 || numStr.length == 4) {
    numStArr.push(
      numStr[0] + numStr[0],
      numStr[1] + numStr[1],
      numStr[2] + numStr[2],
      numStr[3] + numStr[3],
    )
  } else {
    numStArr.push(
      numStr.slice(0,2),
      numStr.slice(2,4),
      numStr.slice(4,6),
      numStr.slice(6,8),
    )
  }

  if (!numStArr[3]) {
    return {
      red: parseInt(numStArr[0], 16),
      green: parseInt(numStArr[1], 16),
      blue: parseInt(numStArr[2], 16),
    };
  }

  let alpha = parseInt(numStArr[3], 16);
  if (alpha == 0) alpha = 0;
  else if (alpha == 255) alpha = 1;
  else alpha = (alpha / 256).toFixed(2);

  return {
    red: parseInt(numStArr[0], 16),
    green: parseInt(numStArr[1], 16),
    blue: parseInt(numStArr[2], 16),
    alpha: alpha,
  };
}

/**
 * 对象转为 16进制
 * @param {String} colorObj 颜色对象
 * @returns 16进制文本
 */
export function objToHex(colorObj) {
  console.log("colorObj:", colorObj);
  const hexR = numToHexStr(colorObj.red);
  const hexG = numToHexStr(colorObj.green);
  const hexB = numToHexStr(colorObj.blue);
  if (!colorObj.alpha) {
    return `#${hexR}${hexG}${hexB}`;
  }

  const hexA = numToHexStr(Math.round(colorObj.alpha * 255));
  return `#${hexR}${hexG}${hexB}${hexA}`;
}



export function numToHexStr(num) {
  if (num < 10) return `0${num}`;
  return num.toString(16);
}

/*------------------- 纠正校验  ------------------------------------*/

/**
 * 纠正输入内容为正确的 RGBA 数字
 * @param {*} inputVal 输入值
 * @returns 正确的 RGBA 数字
 */
export function correctRgbaNum(inputVal) {
  // 非数字就设置为 0，数字范围为 0～255
  const num = Number(inputVal);
  if (isNaN(num)) return 0;
  if (num < 0) return 0;
  if (num > 255) return 255;

  return num;
}

/**
 * 纠正输入内容为正确的 RGBA 透明度数字
 * @param {*} inputVal 输入值
 * @returns 正确的 RGBA 透明度数字
 */
export function correctRgbaAlpha(inputVal) {
  // 非数字就设置为 0，数字范围为 0～255
  const num = Number(inputVal);
  if (isNaN(num)) return 0;
  if (num < 0) return 0;
  if (num > 1) return 1;

  return num;
}

/**
 * 纠正为合规的 字符
 * @param {*} inputVal 输入字符
 * @returns 合规的 字符
 */
export function correctHexChar(char) {
  const res = /^[0-9abcdef]?$/.exec(char);
  if (!res) return "f";
  return res[0];
}

/**
 * 纠正输入内容为正确的 HEX 数值
 * @param {*} inputVal 输入值
 * @returns 正确的 HEX 数值
 */
export function correctHex(inputVal) {
  // 输入设置的最多 9 位
  const numStr = inputVal.replace("#", "");
  // 每一位转化为合规的 字符
  let corrNumStr = [...numStr].map(char => {
    return correctHexChar(char.toLowerCase());
  }).join("");
  
  // 补全至合规的位数 (用最后一位补全)
  if (corrNumStr.length <= 3) corrNumStr = corrNumStr.padEnd(3, corrNumStr.at(-1));
  if (corrNumStr.length == 4) corrNumStr = corrNumStr.padEnd(4, corrNumStr.at(-1));
  else if (corrNumStr.length <= 6) corrNumStr = corrNumStr.padEnd(6, corrNumStr.at(-1));
  else if (corrNumStr.length <= 8) corrNumStr = corrNumStr.padEnd(8, corrNumStr.at(-1));
  
  return `#${corrNumStr}`;
}
