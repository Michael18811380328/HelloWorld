var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });

nightmare
  .goto('https://www.taobao.com/')  //待测试链接
  .type('#q', '电视机')   //输入框选中，输入值
  .click('form[action*="/search"] [type=submit]')//form表单提交
  .wait(3000)
  .exists('#spulist-grid')
  .evaluate(function () {
    return document.querySelector('#spulist-grid .grid-item .info-cont') //获取需返回的值
      .textContent.trim();
  })
  .end()
  .then(function (result) {  //即为return中的数据
    console.log(result);
  })
  .catch(function (error) {  //错误捕捉
    console.error('Search failed:', error);
  });
