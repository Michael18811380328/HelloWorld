// 传统的方法：直接在原型上面增加方法
// 这样会造成原型注入
function axios() {

}

axios.prototype.post = function() {

}

axios.prototype.get = function() {

}

// 扩展原型的方法
function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  }
}

function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

extend(
  {a: 1, fn: function(){}},
  {b: 2},
  this
);

// 05-02
function axios(instanceofConfig) {
  this.default = instanceofConfig;
}

function createInstance(defaultConfig) {
  let context = new axios(defaultConfig);
  let instance = bind(Axios.prototype.request, context);
  extend(instance, Axios.prototype, context);
  extend(instance, context);
  return instance;
}

// 把不同的方法取出来，然后每一个配置合并
utils.forEach(['get', 'post', 'delete', 'head', 'options'], (method) => {
  Axios.prototype[method] = (url, config) => {
    return this.request(utils.merge());
  }
})

// VUE也是混入方法
function Vue(options) {
  if (!(this instanceof Vue)) {
    warn('error');
  }
  this._init();
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifestyleMixin(Vue);
renderMixin(Vue);

// 二次封装axios实例
function axios(instanceofConfig) {
  this.default = instanceofConfig;
  this.interceptors = {
    request: new interceptorsManner(),
    response: new interceptorsManner(),
  };
}

axios.prototype.request = function() {

}

function createInstance(defaultConfig) {
  var context = new axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);
  extend(instance, Axios.prototype, context);
  extend(instance, xontext);
  return instance;
}

axios.get(url);
axios.post(url, {
  data: 1
});


urls.forEach(['get', 'post', 'delete', 'options'], (method) => {
  axios.prototype[method] = (url, config) => {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
    }));
  }
});

function interceptorsManner() {
  this.handler = [];
}

interceptorsManner.prototype.use = (fulfilled, rejected) => {
  this.handler.push({ fullfilled, rejected });
}

axios.interceptors.request.use(config => {
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.handler.forEach((interceptor) => {
    chain.unshift(interceptor.fulfilled, interceptor.injected);
  });
  this.interceptors.response.handler.forEach((interceptor) => {
    chain.push(interceptor.fulfilled, interceptor.injected);
  });
  while (chain.length > 0) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  return promise;
});

new Promise(function() {
  resolve();
  return 1;
}).then(function(res) {
  resolve();
  return 2;
}).then(function(res2) {
  resolve();
  return 3
});




















