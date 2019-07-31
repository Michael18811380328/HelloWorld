handleSearch = (parameter, value) => {
  const search = '?tid=F0h5&row-id=9b73c110-6d48-4c3a-a96b-df09a8e3d0f9&name=Tom';
  const searchArr = search.split('&');
  let searchObj = {};
  for (let i = 0; i < searchArr.length; i++) {
    let key = searchArr[i].slice(0, searchArr[i].indexOf('='));
    let value = searchArr[i].slice(searchArr[i].indexOf('=') + 1);
    searchObj[key] = value;
  }  
  if (parameter && !value && searchObj[parameter]) {
    delete searchObj[parameter];
  } else if (parameter && value) {
    searchObj[parameter] = value;
  }
  // searchObj 转化成字符串
  let newSearch = '';
  for (let key in searchObj) {
    newSearch = newSearch + '&' + key + '=' + searchObj[key];
  }
  newSearch = newSearch.slice(1, newSearch.length);
  history.replaceState(null, '', location.pathname + newSearch);
}

handleSearch('name', 'Anbing');