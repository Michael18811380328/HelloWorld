// 装饰者模式：关注模块内部的功能和封装
function a() {
  console.log('hello');
  // 这个函数是第三方提供的，我们不能直接更改
  // 所以外部加一个装饰者
}

function sayHello(name) {
  a();
  console.log('hello');
}

var ajax = $.ajax;
$.ajax = function() {
  ajax.call(this);
  loading();
}

dom.onclick = function() {
  console.log(1);
}
var oldFn = dom.onclick;
dom.onclick = function() {
  oldFn();
  loading();
}
oldFn = null;


// Adapter mode
function dog() {

}

dog.prototype.sayHello = function() {
  console.log('wang');
}

function dogAdapter(dogObject) {
  this.dobObject = dogObject;
}

dogAdapter = new Bird();

// another
function myA() {
  A.call(this);
}
myA.ptototype = A.prototype;
myA.protoype.css = function () {
  A.c.call(this, arguments);
}
myA.prototype.on = function() {
  A.o.call(this, arguments);
}
window.$ = myA;

// data adapter
function a(ob) {
  var adapter = {
    a: 1,
    b: 2,
  };
  for (let i in adapter) {
    adapter[i] = ob[i] || adapter[i];
  }
  // 这里可以使用ES6的默认参数代替
  // 如果传入参数缺失，使用这样的方法处理默认参数
}

// 订阅发布模式
var Observer = {
  _message: {},
  regist: function() {
    //订阅
  },
  fire: function(type) {
    var len = this._message[type].length;
    for (var i = 0; i < len; i++) {
      this._message[type][i].call(this);
    }
  },
  remove: function(type) {
    var i = this._message[type].length - 1;
    for (;i >= 0; i--) {
      this._message[type][i] === fn && this._message[type].splice(i, 1);
    }
  }
};

Observer.regist('sendMes', function() {
  //
});

Observer.regist('open dialog');
Observer.fire('open dialog');


// 转盘demo
var domArr = [];
var father = document.getElementById('div1');

function init() {
  var dom = document.createElement('div');
  dom.setAttribute('class', 'div2');
  father.appendChild(dom);
  domArr.push(dom);
}

for (var i = 0; i < 10; i++) {
  init();
}
// 这里频繁操作DOM性能不好，最好可以先放在一个fragment上面
// 最后再统一加入到DIV上面
function run() {
  var nowStop = 0;
  var finalNum = Math.floor(Math.random * 10);
  var stopNum = 40 + finalNum;
  var timer = setInterval(() => {
    var domstop = nowStop % 10;
    if (domstop == 0) {
      domArr[9].setAttribute('class', 'div2');
    } else {
      domArr[domstop - 1].setAttribute('class', 'div2');
    }
    domArr[domstop].setAttribute('class', 'div2 divon');
    if (nowstop > stopNum) {
      clearInterval(timer);
    }
    nowStop++;
  }, 100);
}

// 观察者模式改进后的转盘
var time = 100;
var timer = null;
var domArr = [];
var father = document.getElementById('div1');
var nowStop = 0;
var finalNum = Math.floor(Math.random() * 10);
var stopNum = 40 + finalNum;

function init() {
  function _init() {
    var dom = document.craeteElement('div');
    dom.setAttribute('class', 'div2');
    father.appendChild(dom);
    domArr.push(dom);
  }
  for (let i = 0; i < 10; i++) {
    _init();
  }
  runner();
}

init();

function runner(dom) {

  function runMode() {
    if (domstop === 0) {
      domArr[9].setAttribute('class', 'div2');
    } else {
      domArr[domstop - 1].setAttribute('class', 'div2');
    }
    domArr[domstop].setAttribute('class', 'div2 div-on');
  }

  function runControl(command) {
    if (command === 'run') {
      clearInterval(timer);
      timer = setInterval(() => {
        var domstop = nowStop % 10;
        if (domstop == 0 && nowStop != 0) {
          Observer.fire('runOver');
        }
        runMode(domstop);
        if (nowStop > stopNum) {
          clearInterval(timer);
        }
      }, time);
    }
    else if (commadn == 'stop') {
      clearInterval(timer);
    }
    else if (commadn == 'keep') {
      clearInterval(timer);
      var keepCounter = 0;
      timer = setInterval(() => {
        var domstop = keepCounter % 10;
        runmode(domstop);
        keepCounter++;
      });
    }
  }
  runcontrol(command);
}
