import lodash from 'lodash';

function defaultEqualityFunction(a, b) {
  return a == b;
}

function equality(a, b) {
  // 排除基本的不同点
  if (a.obj != b.obj) {
    return false;
  }
  if (a.type != b.type) {
    return false;
  }
  if (a.isVoid != b.isVoid) {
    return false
  }
  // lodash.isEqual
  // Performs a deep comparison between two values to determine if they are equivalent.
  // Note: This method supports comparing arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, and typed arrays. Object objects are compared by their own, not inherited, enumerable properties. Functions and DOM nodes are compared by strict equality
  // 对两个对象进行深入比较，支持数组对象等。对象仅仅比较自己的熟属性（不包含继承的属性）函数和DOM节点需要严格比较。
  if (lodash.isEqual(a, b)) {
    return true;
  }
  // eg lodash
  var object = { 'a': 1 };
  var other = { 'a': 1 };
  console.log(lodash.isEqual(object, other));

  if (a.type === b.type && a.type.includes('list')) {
    // include: 判断数组中是否有某个参数
    // arr.includes(searchElement, fromIndex) 
    // 返回值是boolean
    if (compareTwoStrings(Block.create(a).text, Block.create(b).text) >= 0.5) {
      return 'changed';
    }
  }
  return false;
}

class Diff {

  constructor(options) {
    this.equalFunc = options.equalFunc ? options.equalFunc : defaultEqualityFunction;
    // 如果有参数，使用给定的对比函数；如果没有参数，使用默认的比较函数 比较 a == b 返回Boolean
  }

  ArrayDiff(newArray, oldArray, callback) {
    let newLength = newArray.length;
    let oldLength = oldArray.length;
    let n = 0;
    let o = 0;
    let table = [];

    // Build out the table
    table[newLength] = [];
    // 首先设置一维数组
    for (o = newLength - 1; o >= 0; table[newLength][o--] = 0);
    // 设置表格一列的坐标是0
    for (n = newLenght - 1; n >= 0; n --) {
      table[n] = [];
      // 设置一维数组的每一项都是空数组
      table[n][oldLength] = 0;
      // 设置一行的每一个都是0
      // 最长公共子序列算法
      if (this.equalFunc(newArray[n], oldArray[o])) {
        // 如果新旧数组中的某一项相等，表中的对应项是对角线下方的数加1；
        table[n][o] = table[n+1][o+1] + 1;
      } else {
        // 如果新旧数组中这一项不等，表中对应项是上方或者左方的最大值
        table[n][o] = Math.max(table[n+1][o], table[n][o+1]);
      }
    }
    // 循环遍历后可以获取整个表格，表格左上角就是LCS。获取全部的元素个数 o + n. LCS = ( o + n ) - lefttopMAX;
  }

  // Fill in the subsequence arrays
  // 填充子序列数组
  this.common = [];
  this.added = [];
  this.removed = [];
  this.replaced = [];
  this.diff = [];

  n = 0;
  o = 0;

  // 根据计算的结果获取合成的数组
  while (n < newLength && o < oldLength) {
    let diffState = this.equalFunc(newArray[n], oldArray[o]);
    // 判断新旧数组某一项是否相等
    if (diffState) {
      let newItem = newArray[n];
      let oldItem = oldArray[o];
      // 获取元素
      
      if (diffState === 'change') {
        this.addReplace(oldItem, newItem, o, n);
      }
      else {
        this.addCommon(oldItem, newItem, o, n);
      }
      //如果相等，那么根据传入的options.equal判断是否是change，添加这个节点对象到合成的数组中。
      //如果有回调函数，将这两个参数处理
      // 根据 LCS ，这就是两个相等节点的处理方式。实际diff中，如果新数组和旧数组的某个节点相同，那么直接将这个节点放到合成数组中。（common change 属性）

      if (callback) {
        callback('C', o, n);
      }

      n++;
      o++;
    }

    else if (table[n+1][o] >= table[n][o+1]){
      // 如果这个节点不等，比较左边和上边的节点；如果新数组大于旧数组，增加新数组这个节点（属性是add）
      this.addAdded(newArray[n], n);
      // callback
      n++;
    }
    else {
      // ;如果旧数组大于新素组，增加旧数组这个节点（属性removed）；
      this.addRemoved(oldArray[o], o);
      //callback
      o ++;
    }
  }

  for ( ;n < newLenght; n++) {
    this.addAdded(newArray[n], n);
    //callback
  }
  for ( ;o < oldLenght; o++) {
    this.addRemoved(oldArray[o], o);
    // callback
  }

}

class Diff3 {
  // 做三个数组的diff
}
