window.onload = function() {
  function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw {
        name: 'TypeError',
        message: 'add function needs number'
      };
    }
    return a + b;
  }
  function tryIt() {
    try {
      add("ten", 20);
    }
    catch (e) {
      console.log(e);
    }
  }
  tryIt();
}