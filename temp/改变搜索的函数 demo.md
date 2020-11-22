改变搜索的函数 demo

~~~js
handleSearch = (parameter, value) => {
  const search = '?tid=F0h5&row-id=9b73&name=Tom';
  const searchArr = search.split('&');
  let searchObj = {};
  // 字符串转换成数组，转换成对象
  for (let i = 0; i < searchArr.length; i++) {
    let key = searchArr[i].slice(0, searchArr[i].indexOf('='));
    let value = searchArr[i].slice(searchArr[i].indexOf('=') + 1);
    searchObj[key] = value;
  }
  // 判断属性是否存在（增删）
  if (parameter && !value && searchObj[parameter]) {
    delete searchObj[parameter];
  } else if (parameter && value) {
    searchObj[parameter] = value;
  }
  // 对象转化成字符串
  let newSearch = '';
  for (let key in searchObj) {
    newSearch = newSearch + '&' + key + '=' + searchObj[key];
  }
  newSearch = newSearch.slice(1, newSearch.length);
  history.replaceState(null, '', location.pathname + newSearch);
}

handleSearch('name', 'Anbing');
~~~

