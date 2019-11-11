// backbone 架构
// backbone 没有Controller，不需要处理数据，使用事件处理UI逻辑

var AppView = Backbone.View.extend({
  events: {
    "click #clear-completed": "clearCompleted",
    "keypress #delete-btn": "delete"
  }
});

// 使用路由切换视图
App.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'show': 'show'
    },
  index: function () {
    $(document.body).append("调用了 Index 路由");
  },
  show: function () {
    $(document.body).append("调用了 Show 路由");
  },
});

// 当界面的URL发生变化时，router获取当前的锚点和信息（例如ID），然后执行路由到指定的函数，不同的函数会更改界面内容