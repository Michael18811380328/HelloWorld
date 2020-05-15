// demo01 JS原生实现数据层和视图层分离
// 通过给定数字，移动一个矩形
function changeDiv(dataobj) {
  if (!dataObj instaceof DataManager) {
    throw new Error('Type Error');
  }
  let _data = dataObj.getData();
  dom.style[_data.property] = _data.num;
}

function DataManager() {
  this.stateArr = [
    {
      property: 'left',
      num: 0,
    }
  ];
  this.nowState = 0;
}

DataManager.prototype.pushState = function(data) {
  this.stateArr.push(data);
  this.nowState = this.stateArr.length - 1;
}

DataManager.prototype.getBack = function() {
  if (this.nowState > 0) {
    this.newState--;
  } else {
    throw new Error('no back data');
  }
}

DataManager.prototype.getFront = function() {
  if (this.nowState < this.stateArr.length - 1) {
    this.nowState++;
  } else {
    throw new Error('no front data');
  }
}

DataManager.prototyoe.getData = function() {
  return this.stateArr[this.nowState];
}

let DataManagerObject = new DataManager();
document.getElementById('left-btn').onclick = function() {
  DataManagerObject.pushState({
    property: 'right',
    num: input.value
  });
  changeDiv(DataManagerObject);
}

// 上面直接把方法绑定在原型上面，可以进行下面的优化
// 使用策略模式代替多层的if-else
return {
  execute: function(commander) {
    let commanderArr = ['back', 'front'];
    if (typeof commander === 'Object') {
      DataManagerObject.pushState(commander);
      changeDiv(DataManagerObject);
    } else {
      let has = false;
      if (commanderArr.includes(commander)) {
        has = true;
        let state = {
          front: function() {
            //
          },
          back: function() {
            //
          },
          any: function() {
            //
          },
        };
        state[commander];
      }
    }
  }
};

let input document.getElementById('num');

document.getElementById('toLeft').onclick = function() {
  handleDiv.execute({
    proporty: 'right',
    num: input.value + 'px'
  });
}
document.getElementById('toRight').onclick = function() {
  handleDiv.execute({
    proporty: 'left',
    num: input.value + 'px'
  });
}
document.getElementById('back').onclick = function() {
  handleDiv.execute('back');
}
document.getElementById('front').onclick = function() {
  handleDiv.execute('front');
}

// demo02 画廊效果，前端可以选择画廊的顺序，生成DOM节点并渲染DOM
// 组件内部需要提供默认的配置。实际用户输入的配置和默认配置组合（webpack）
function Picture(commander) {
  this.html = '';
  this.render(commander);
}

Picture.prototype.initData = function(commander) {
  // 如果用户传入配置，那么使用用户配置，否则使用默认配置
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
        final['id'] = document.getElementById(commander.id);
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
      position: 'realtive'
    },
    {
      width: '100%',
      height: '100%'
    }
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
        case 0:
          handleDom = span;
          break;
      }
    });
  });
}

Picture.prototype.renderDom = function() {
  //
}

Picture.prototype.render = function() {
  let order = this.initData(commander);
  this.initDom(order);
  this.renderDom(order.id);
}

// 第二个类似简单的VUE和其他UI组件，需要用户传入的配置参数较多
// 渲染的组件基本一致
// jquery 就是工厂模式，对外提供很多功能
// 这属于两种设计模式
new Picture({
  el,
  data
});
