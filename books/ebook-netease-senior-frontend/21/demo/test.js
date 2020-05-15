const Vue = require('vue');
const app = new Vue({
  template: `<div>Hello World<span>{{num}}</span></div>`,
  data: {
    num: 123
  }
});
