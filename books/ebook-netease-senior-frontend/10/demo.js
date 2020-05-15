// 程序健壮性
try {
  fs.readFile();
} catch(e) {
  console.log(e);
}

window.$ = function {
  return new jquery.fn.init();
}

function createApp() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };
  mixin(app, EventEmitter.prototype, false);
  mixin(app, proto, false);

  app.request = Object.create(req, {
    app: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: app,
    }
  });
  app.response = Object.create(res, {
    app: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: app,
    }
  });
  app.init();
  return app;
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (gloabl = global || self, global.Vue = factory());
} (this, function () {
  'use strict';
  var emptyObject = Object.freeze({});
  function isUndef(v) {
    return v === undefined || v === null
  }
  // ...
}));
