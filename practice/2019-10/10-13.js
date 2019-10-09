// two-sum 1
function twoSum(nums, target) {
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] + mums[j] === target) {
        return [i, j];
      }
    }
  }
}
// two-sum 2
function twoSum2(nums, target) {
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    let another = target - nums[i];
    let index = nums.lastIndexOf(another);
    if (index > -1 && i !== index) {
      return [i, index];
    }
  }
}
// reverse number 1
function reverse(x) {
  const isMinus = x < 0;
  let arr = String(Math.abs(x).split('').reverse());
  let result = Number(arr.join(''));
  if (result >= Math.pow(2, 31) - 1 || result <= Math.pow(-2, 31) + 1) {
    return 0;
  }
  return isMinus ? -result : result;
}
// reverse number 2
function reverse2(x) {
  if (x === 0) return x;
  const isMinus = x < 0;
  let result = 0;
  x = Math.abs(x);
  while (x > 0) {
    let temp = x % 10;
    result = result * 10 + temp;
    x = (x - temp) / 10;
  }
  if (result >= Math.pow(2, 31) - 1 || result <= Math.pow(-2, 31) + 1) {
    return 0;
  }
  return isMinus ? -result : result;
}
// isPalindrome
function isPalindrome(x) {
  if (x === 0) return true;
  if (x < 0 || x % 10 === 0) return false;
  let arr = String(x).split('');
  for (let i = 0; i < arr.length / 2; i++) {
    if (arr[i] !== arr[len - i - 1]) {
      return false;
    }
  }
  return true;
}
// romanToInt
function romanToInt(s) {
  const dir = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  while (s.length > 0) {
    const s0 = s.charAt(0);
    const s1 = s.charAt(1);
    if (s1 === '' || s0 === s1 || dir[s0] > dir[s1]) {
      result += dir[s0];
      s = s.substring(1);
    } else {
      result = result - dir[s0] + dir[s1];
    }
  }
  return result;
}

function longestCommonPrefix(strs) {
  const strlen = strs.length;
  if (strlen === 0) return '';
  if (strlen === 1) return strs[0];
  let commenPrefix = '';
  for (let i = 0, len = strs[0].length; i < len; i++) {
    let str = str[0].charAt(i);
    for (let j = 0; j < strlen; j++) {
      if (str !== strs[j].charAt(i)) {
        return commonPrefix;
      }
    }
    commonPrefix += str;
  }
  return commonPrefix;
}

function letterCombinations (digits) {
  let resultArr = [];
  if (digits.length === 0) return resultArr;
  const dir = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };
  while (digits.length > 0) {
    const firstNumber = digits.slice(0, 1);
    digits = digits.slice(1, digits.length);
    const firstStr = dir[firstNumber];
    let newResultArr = [];
    if (resultArr.length === 0) {
      resultArr = firstStr.split('');
    }
    else {
      for (let i = 0; i < resultArr.length; i++) {
        let item = resultArr[i];
        newResultArr.push(item + firstStr[0], item + firstStr[1], item + firstStr[2]);
        if (firstStr[3]) newResultArr.push(item + firstStr[3]);
      }
      resultArr = newResultArr;
    }
  }
  return resultArr;
}

function rotate1(nums, k) {
  for (let i = 0; i < k; i++) {
    let item = nums.pop();
    nums.unshift(item);
  }
}
function rotate2(nums, k) {
  const len = nums.length;
  if (len === 1 || k === 0) return;
  const times = len - k % len;
  for (let i = 0; i < times; i++) {
    let item = nums.shift();
    nums.push(item);
  }
}
function rotate3(nums, k) {
  const len = nums.length;
  if (len === 1 || k === 0) return;
  const times = k % len;
  let tailArray = nums.splice(-times, times);
  nums.unshift(...tailArray);
}

function isValidLeftRight(s) {
  let result = '';
  const left = ['(', '[', '{'];
  for (let i = 0; i < s.length; i++) {
    if (left.includes(s.charAr(i))) {
      result += s.charAt(i);
    }
    else {
      if ((s.charAt(i) === ')' && result.charAt(result.length - 1) === '(') || (s.charAt(i) === ']' && result.charAt(result.length - 1) === '[') || (s.charAt(i) === '}' && result.charAt(result.length - 1) === '{')) {
        result = result.subStr(0, result.length - 1);
      } else {
        return false;
      }
    }
  }
  return result.length === 0;
}
/**
 * @param {number[]} height
 * @return {number}
 */
function trapRain(height) {
  if (height.length === 0) return 0;
  while (height[0] === 0) height.shift();
  while (height[height.length - 1] === 0) height.pop();
  if (height.length === 0) return 0;

  let sum = 0;
  const max = Math.max(...height);
  // handle height array contain many max value
  const maxIndexArr = [];
  height.forEach((item, index) => {
    if (item === max) maxIndexArr.push(index); 
  });
  // handle middle part
  if (maxIndeArr.length > 1) {
    let middleSum = 0;
    for (let i = maxIndexArr[0]; i < maxIndexArr[maxIndexArr.length - 1]; i++) {
      middleSum += height[i];
    }
    let rain = max * (maxIndexArr[maxIndexArr.length - 1] - maxIndexArr[0]) - middleSum;
    sum += rain;
  }
  // handle left and right parts
  let leftSum = 0;
  let leftRainSum = 0;
  for (let i = 0; i < maxIndexArr[0]; i++) {
    leftSum += height[i];
    if (i > 0 && height[i] < height[i - 1]) {
      height[i] = height[i - 1];
    }
    leftRainSum += height[i];
  }
  sum += leftRainSum - leftSum;
  let rightSum = 0;
  let rightRainSum = 0;
  for (let i = height.length - 1; i > maxIndexArr[maxIndexArr.length - 1]; i--) {
    rightSum += height[i];
    if (height[i] < height[i + 1]) {
      height = height[i + 1];
    }
    rightRainSum += height[i];
  }
  sum += rightRainSum - rightSum;
  return sum;
}
