# JS 加法乘法错误解决 number-precision

### 问题描述

一个项目中，需要计算 0.56 * 100 然后转换成字符串，结果计算错误，所以调研使用这个库实现。

我具体使用 number-precision 这个库，可以实现 JS 精确四则运算。

### 为什么使用这个库

```js
0.1 + 0.2 = 0.30000000000000004
1.0 - 0.9 = 0.09999999999999998
0.105.toFixed(2) = 0.1 // not 0.11
```

### 安装

```
npm install number-precision --save
```

### 主要方法

可以计算加减乘除（plus，minus，times, divides）以及求相近值（strip, round）

```js
NP.strip(num)         // strip a number to nearest right number
NP.plus(num1, num2, num3, ...)   // addition, num + num2 + num3, two numbers is required at least.
NP.minus(num1, num2, num3, ...)  // subtraction, num1 - num2 - num3
NP.times(num1, num2, num3, ...)  // multiplication, num1 * num2 * num3
NP.divide(num1, num2, num3, ...) // division, num1 / num2 / num3
NP.round(num, ratio)  // round a number based on ratio
```

### 具体使用

```js
import NP from 'number-precision';

NP.strip(0.09999999999999998); // = 0.1
NP.plus(0.1, 0.2);             // = 0.3, not 0.30000000000000004
NP.plus(2.3, 2.4);             // = 4.7, not 4.699999999999999
NP.minus(1.0, 0.9);            // = 0.1, not 0.09999999999999998
NP.times(3, 0.3);              // = 0.9, not 0.8999999999999999
NP.times(0.362, 100);          // = 36.2, not 36.199999999999996
NP.divide(1.21, 1.1);          // = 1.1, not 1.0999999999999999
NP.round(0.105, 2);            // = 0.11, not 0.1
```

如果你想避免下面的警告（报错：数值转换整数越界，结果不精确），可以在文档开头增加下面的提示

PS: If you want to get rid of `XXX is beyond boundary when transfer to integer, the results may not be accurate`, use this at the beginning of your app to turn off boundary checking.

```js
NP.enableBoundaryChecking(false); // default param is true
```

正文已经结束，后面是简单的源码分析，看一下作者如何实现精确计算。

### 源码分析

这里使用 TS 实现精确计算。

~~~typescript
type numType = number | string;
/**
 * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */

/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
function strip(num: numType, precision = 15): number {
  return +parseFloat(Number(num).toPrecision(precision));
}

/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
function digitLength(num: numType): number {
  // Get digit length of e
  const eSplit = num.toString().split(/[eE]/);
  const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
function float2Fixed(num: numType): number {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }
  const dLen = digitLength(num);
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @param {*number} num 输入数
 */
function checkBoundary(num: number) {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
    }
  }
}

/**
 * 精确乘法
 */
function times(num1: numType, num2: numType, ...others: numType[]): number {
  if (others.length > 0) {
    return times(times(num1, num2), others[0], ...others.slice(1));
  }
  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  const baseNum = digitLength(num1) + digitLength(num2);
  const leftValue = num1Changed * num2Changed;

  checkBoundary(leftValue);

  return leftValue / Math.pow(10, baseNum);
}

/**
 * 精确加法
 */
function plus(num1: numType, num2: numType, ...others: numType[]): number {
  if (others.length > 0) {
    return plus(plus(num1, num2), others[0], ...others.slice(1));
  }
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

/**
 * 精确减法
 */
function minus(num1: numType, num2: numType, ...others: numType[]): number {
  if (others.length > 0) {
    return minus(minus(num1, num2), others[0], ...others.slice(1));
  }
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

/**
 * 精确除法
 */
function divide(num1: numType, num2: numType, ...others: numType[]): number {
  if (others.length > 0) {
    return divide(divide(num1, num2), others[0], ...others.slice(1));
  }
  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
}

/**
 * 四舍五入
 */
function round(num: numType, ratio: number): number {
  const base = Math.pow(10, ratio);
  return divide(Math.round(times(num, base)), base);
}

let _boundaryCheckingState = true;
/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 */

// 这里可以设置边界检查（默认是true）
function enableBoundaryChecking(flag = true) {
  _boundaryCheckingState = flag;
}

// 输出上面的方法
export { strip, plus, minus, times, divide, round, digitLength, float2Fixed, enableBoundaryChecking };
export default {
  strip,
  plus,
  minus,
  times,
  divide,
  round,
  digitLength,
  float2Fixed,
  enableBoundaryChecking,
};
~~~



### 参考链接

https://developer.aliyun.com/mirror/npm/package/number-precision

