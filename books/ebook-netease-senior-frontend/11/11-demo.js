function changeDiv(dataObj) {
  if (!dataObj instanceof DataManager) {
    throw new Error('dataObj must be an instance of DataManager');
  }
  let _data = dataObj.getData();
  dom.style[_data.property] = _data.num;
}

function DataManager() {
  this.stateArr = [
    {property: 'left', num: 0}
  ];
  this.nowState = 0;
}

DataManager.prototype.pushState = function(data) {
  this.stateArr.push(data);
  this.nowState = this.stateArr.length - 1;
}

DataManager.prototype.getBack = function() {
  if (this.nowState > 0) {
    this.nowState--;
  }
}

DataManager.prototype.getFront = function() {
  if (this.nowState < this.stateArr.length - 1) {
    this.nowState++;
  }
}

DataManager.prototype.getData = function() {
  return this.stateArr[this.nowState];
}

let DataManagerObj = new DataManager();
document.getElementById('toleft').onclick = function() {
  DataManagerObj.pushState({
    property: 'right',
    num: input.value,
  });
  changediv(DataManagerObj);
}

// 使用命令模式优化后
return {
  execute: function(commander) {
    let commandArr = ['back', 'front'];
    if (typeof commander === 'object') {
      DataManagerObj.pushState(commander);
      changeDiv(DataManagerObj);
    } else {
      let has = false;
      let state = {
        front: function() {},
        back: function() {},
        any: function() {},
      };
      state[commander];
    }
  }
};

let input = document.getElementById('num');
document.getElementById('toLeft').onclick = function() {
  handleDiv.execute({
    property: 'right',
    num: input.value + 'px',
  });
}

// 画廊效果
function Picture(commander) {
  this.html = '';
  this.render(commander);
}

Picture.prototype.initData = function(commander) {
  const defaultConfig = {
    data: [],
    id: document,
    way: 'normal',
    size: [100, 100],
  };
  let final = {};
  for (let item in defaultConfig) {
    if (commander[item]) {
      final[item] = commander[item];
      if (item === 'id') {
        final.id = document.getElementById(commander.id);
      }
    } else {
      final[item] = defaultConfig[item];
    }
  }
  return final;
}

Picture.prototype.initDom = function(commander) {
  const styleArr = [
    {
      float: 'left',
      position: 'relative'
    },
    {
      width: '100%',
      height: '100%',
    },
  ];
  let wrapper = document.createElement('div');
  let commanderHandle = {
    normal: function(arr) {
      return arr;
    },
    inverted: function(arr) {
      return arr.reverse();
    },
  };
  let _data = commander.data.forEach((url, index) => {
    let div = document.createElement('div');
    let span = document.createElement('span');
    let styleObj = null;
    let handleDom = null;
    styleArr.forEach((style, index) => {
      switch(index) {
        case 1:
          handleDom = div;
          break;
        case 2:
          handleDom = span;
          break;
      }
    })
  })
}

Picture.prototype.renderDom = function() {

}

Picture.prototype.render = function(commander) {
  let order = this.initData(commander);
  this.initDom(order);
  this.renderDom(order.id);
}

new Picture({
  el,
  data,
  ...
});
