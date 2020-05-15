import fs from 'fs';
import path from 'path';

function readFile() {
  // 框架的源码是健壮的
  try {
    fs.readFile();
  } catch (e) {
    console.log(e);
  }
}

window.$ = function() {
  return new jquery.fn.init();
}

// VUE 建造者模式
function createApp() {
  var app = function(req, res, next) {
    app.handle(reg, res, next);
  };
  mixin(app, EventEmitter.prototype, false);
  minin(app, proto, false);

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