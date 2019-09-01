function func(x, y) {
  return { x, y };
}

const name = 'Mike';
const obj = {
  name, 
  eat() {
    return 'eat';
  }
};

// 对象的属性和方法可以简写
module.exports = { getItem, setItem, clearItem };

const cart = {
  _wheels: 4,
  get wheels() {
    return this._wheels;
  },
  set wheels(value) {
    if (value < this._wheels) {
      throw new Error('too small');
    } else {
      this._value = value;
    }
  }
};

const obj = {
  [proptype]: true,
  ['a' + 'c']: 1
};

// for ... in ... 循环遍历对象自身和继承的可枚举属性（不含symbol）
// Object.keys(obj) 返回一个数组，包括自身的所有可枚举属性
// Object.getOwnPropertyNames(obj) 返回一个数组，包含自身的所有属性的键名
// Object.getOwnPropertySymbols(obj) 返回一个数组，包含自己的所有的symbol的键名
// Reflect.ownKeys(obj)返回一个对象自身的全部键名（包括可枚举键名）

// super 指向当前对象的原型对象
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'test',
  find() {
    return super.foo;
  }
}

Object.setPrototypeOf(obj, proto);
obj.find(); // test