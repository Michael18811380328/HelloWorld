function writer(userConfig) {
  this.initer = new initer();
  this.styler = new controlStyle();
  this.stater = new state();
  this.initer.initDom(userConfig);
}

window.writer = writer();

function initer() {

}

initer.prototype.initConfig = function(config) {

}

initer.prototype.initDom = function(userConfig) {
  let finalConfig = this.initConfig(userConfig);
  this.colorDom.onclick = function() {
    this.style.color('red');
  }
}

function controlStyle() {

}

controlStyle.prototype.setSize = function() {

}

controlStyle.prototype.setSolor = function() {

}

function state() {
  this.stateArr = [];
  this.nowState = 0;
}

state.prototype.add = function() {

}

state.prototype.back = function() {

}

state.prototype.go = function() {

}

window.performance = {
  memory: {
    totalJSHeapSize: 1,
    usedJSHeapSize: 1,
    jsHeapsizeLimit: 1,
  },
  timing: {
    connectState: 1,
    connectEnd: 2,
    secureConnectState: 3,
    requestStart: 4,
    responseStart: 5,
    responseEnd: 6,
    domLoading: 7,
    domComplate: 8,
    loadEventStart: 9,
    loadEventEnd: 10,
  },
};

var per = window.performance;
function getmb(size) {
  return Math.floor(size/1024/1024, 4) + 'MB';
}
function getSec(time) {
  return time / 1000 + 's';
}

getmb(per.memory.usedHSHeapSize);
getsec(per.timing.connectedEnd - per.timing.connectStart);
getsec(per.timing.responseEnd - per.timing.responseStart);
window.onload = function() {
  getsec(per.timing.domComplete - per.timing.domloding);
}
