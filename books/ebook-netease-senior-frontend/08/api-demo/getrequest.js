import server from './server.js';
import qs from 'qs';

function myserver() {
  this.server = server;
}

myserver.prototype.parseRouter = function(name, urlOb) {
  var ob = this[name] = {};
  Object.keys(urlOb).forEach((item) => {
    ob[item] = this.sendMes.bind(this, name, item, urlOb[item]);
  });
}

myserver.prototype.sendMes = function(moduleName, name, url, config) {
  var config = config || {};
  var type = config.type || 'get';
  var data = config.data || {};
  var self = this;

  var before = function(mes) {
    cover();
    send();
    return mes;
  };
  var defaultFn = function(mes) {
    self.nowhandle[bindName] = mes.data;
  }
  var success = config.success || defaultFn;
  var callback = function(res) {
    success(res, defaultFn);
  };
  var state = {
    get: function() {
      var urlqs = url + '?' + qs.stringify(data);
      server.get(urlqs).then(before).then(callback);
    },
    post: function() {
      server.post(url, data).then(before).then(callback);
    },
  };
  if (self[moduleName][name].state == 'ready') {
    self[moduleName][name].state = 'pending';
    state[type]();
  }
}

export default new myserver;
