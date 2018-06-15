// 构造函数：通常构造函数使用大写字母开始。使用new创建构造函数。
// 实例：构造函数创建出来的对象是这个构造函数的实例。
// 继承：一个对象使用另一个对象的属性和方法
// prototype：Person.prototype.constructor == Person 构造函数通过这个属性指向原型对象

// 继承的五种方法

// 1.默认的原型继承-构造函数原型中添加属性
function Fn(){}
Fn.prototype.value = 100;
var obj = new Fn();
console.log(obj.value);

// 2.覆盖构造函数的原型
function Fn(){}
Fn.prototype = {
	value = 100;
}
var obj = new Fn();
console.log(obj.value);

// 3.原型混入
function extend(o1,o2){
	for(var key in o2){
		o1[key] = o2[key];
	}
}
function Fn(){}
extend(Fn.prototype,{
	value:200
});
var fn = new Fn();
console.log(fn.value);

// 4.create创造新对象
var o = { value : 100}
var newObj = Object.create(o);

// 5.构造函数属性继承
function Animal(name,age){
	this.name = name;
	this.age = age;
}
function Cat(name,age){
	Animal.call(this,name,age);
}
var cat = new Cat("Mike",2);
console.log(cat);
