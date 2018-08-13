//ES6 使用class实现构造函数和继承的功能
class Person {
	// 使用构造器设置静态属性
	constructor(name = "Tom", value) {
		this.name = name;
		this.value = value;
	}
	// 设置方法
	getName(name) {
		console.log(this.name);
	}
}
class Manager extends Person() {
	constructor(password) {
		super(name, value);
		this.password = password;
	}
	static getPassword() {
		console.log(this.password);
	}
}
var manager1 = new Manager("tom", true, 123456);
console.log(manager1.getPassword); //error
console.log(Manager.getPassword);