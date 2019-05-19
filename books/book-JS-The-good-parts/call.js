// eg1: 方法继承
var add = function(para1, para2) {
  return para1 + para2;
}

var sub = function(para1, para2) {
  return para1 - para2;
}

add.call(sub, 1, 2);
// sub 借用了 add 的方法，所以结果应该是 1 + 2 = 3

// eg2: 对象继承
function Animal() {
  this.name = 'animal';
  this.tell = function() {
    console.log(this.name)
  }
}

function Cat() {
  this.name = 'cat';
}

const animal = new Animal();
const cat = new Cat();
// 现在 cat 不具有 tell 的方法

animal.tell.call(cat, '');
// 借用animal的tell方法, 现在cat对象可以使用animal对象的方法 tell

// eg3: 对象继承
function Animal(name) {
  this.name = name;
  this.tell = function(){
    console.log(this.name)
  }
}

function Cat(name) {
  // 继承了全部的属性和方法
  Animal.call(this, name);
}

var cat = new Cat("Tom");
cat.tell();

// eg4 多重继承
function Beijing(name) {
  this.name = name;
  this.sayHello = function(){
    console.log(this.name);
  }
}

function Shanxi(address) {
  this.address = address;
  this.goTo = function() {
    console.log(this.address);
  } 
}

function Me(name, address) {
  // 如果Me对象想继承Beijing对象的sayHello方法，需要传入参数 name
  Beijing.call(this, name);
  // 同理需要传入address参数，才能继承Shanxi的GoTo方法
  Shanxi.call(this, address);
}

let me = new Me("Michale", "Qinghe");
me.sayHello();
me.goTo();