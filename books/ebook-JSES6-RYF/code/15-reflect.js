if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // error
}

// 'assign' in Object

Reflect.has(Object, 'assign');

Proxy(target, {
  set: fucntion(target, name, value, receiver) {
    let success = Reflect.set(taregt, name, value, receiver);
    if (success) {
      console.log(success);
    }
    return success;
  }
});

var loddedObj = new Proxy(obj, {
  get(target, name) {
    return Reflect.get(taregt, name);
  },
  deleteProperty(target, name) {
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    return Reflect.has(target, name);
  }
  // 拦截操作对应Reflect方法，可以保证原生行为正常执行
});

Function.protytype.apply.call(Math.floor, undefined, [1.5]);
Reflect.apply(Math.floor, undefined, [1.6]);

// 静态方法
apply
construct
get
set
defineProperty
deleteProperty
has
ownKeys
isExtensible
preventExtensions
getOwnPropertyDescriptor
getPrototypeOf
setPrototypeOf