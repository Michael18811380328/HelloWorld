const arr = new Array(1, 2, 3)
arr.forEach(function (item, index, array) {
  console.log(item, index, array)
})

Array.prototype.forEach = function (fn) {
  if (typeof(fn) !== 'function') {
    throw new Error('Function is needed.');
    return;
  }
  if (!Array.isArray(this)) {
    throw new Error('Array is needed.');
    return;
  }
  for (var index = 0, len = this.length; index < len; index++) {
    fn(arr[index], index, this);
  }
}