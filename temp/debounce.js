// improve performance. if the onChange event emited mutiple 100 ms,
// only execute searchText function once;
debounce = (fn, wait = 100) => {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(this, ...args);
    }, wait);
  };
}
