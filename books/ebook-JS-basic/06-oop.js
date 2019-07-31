function Student (foo, bar) {
  'use strict';
  this.too = foo;
  this.bar = bar;
}

function _new (constructor, params) {
  var args = [].slice.call(arguments);
  var constructor = args.shift();
  var context = Object.create(constructor.prototype);
  var result = constructor.apply(context, args);
  return (typeof result === 'Object' && result != null) ? result : context;
}

var actor = _new(Person, 'Michael', 28);

var foo = {
  f1: function(){
    console.log(this);
    var that = this;
    var f2: function() {
      console.log(that);
    }();
  }
}

foo.f1();

// Fucntion.call(obj, para1, para2);

function add (a, b) {
  return a + b;
}
let obj = {};
Array.prptotype.splice.call(obj, para1, para2);
add.call(obj, 1, 2);
add.apply(obj, [1, 2]);

// Use math method in an array

let arr = [1, 3, 2];
Math.max.call(null, arr);

let arguments = {
  0: 1,
  length: 2
};
Array,prototype.slice.apply(arguements);

// use bind to change this
let counter = {
  count: 0,
  increase: function() {
    this.count++;
  }
};
let obj = { count: 100 };
let func = counter.increase.bind(counter);
func();
let func2 = counter.increase.bind(obj);
func2();

// copy object(ES5)
function copyObject(origin) {
  var copy = Object.create(Object.getPrototypeOf(origin));
  copyOwnPropertiesFrom(copy, origin);
  return copy;
}

function copyOwnPropertiesFrom(target, source) {
  Object.getOwnPropertyNamers(sources).forEach(function (propKey) {
    var desc = Object.getOwnPropertyDescriptor(source, propKey);
    Object.defineProperty(targetm propKey, desc);
  });
  return target;
}

// copy object ES7
function copyObject(origin) {
  return Object.create(
    Object.getPrototypeOf(origin),
    Object.getOwnPropertyDescriptors(origin)
  );
}
