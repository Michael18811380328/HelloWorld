console.time('test');
let old = [1, 2, 3, 2, 1];
console.log(arrayNo(old));
console.timeEnd('test'); // 0.45ms

function arrayNo(old) {
  let newArray = [];
  let obj = {};
  for (let i = 0; i < old.length; i++) {
    if (!obj[old[i]]) {
      newArray.push(old[i]);
      obj[old[i]] = true;
    }
  }
  return newArray;
}