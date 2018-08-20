// we should learn ES6 and other codes in a short time 

// ES6 

/*

1. let const 

{ let a = 2; } console.log(a);

2. string (``) ${ a }

3. function(a, b = 1){
	//code
}
setTimeout(() => {
	//code
	//this in ES6 is changed.
},1000);

4. class === structure function Objected-oriented programming
*/ 

// this is the test react file with ES6

import React, { Component } from 'react';
import logo from '../images/index.jpg';
import '../css/index.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
				<img src={ logo } className="APP-logo" alt="logo">
				<h1 className="App-title">I like React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code> src </code> and save to reload.
				</p>
			</div>
		);
	}
}


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
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前加上static，那么该方法不会被继承，而是直接通过类调用，就是静态方法。——目前见过的生产代码很少有这种情况。

var manager1 = new Manager("tom", true, 123456);
console.log(manager1.getPassword); //error
console.log(Manager.getPassword);

// 传统的方法
function Person(name, sex) {
    this.name = name;
    this.sex = sex;
    this.showName = function() {
        alert(this.name);
    }
}
var person1 = new Person("Michael", "female");

function Manager(name, sex, password) {
    Person.call(this, name, sex);
    // Manager继承自Person
    this.password = password;
}

// es6 通过super继承属性
class Manager extends Person {
    constructor(name, sex, password) {
        super(name, sex);
        this.password = password;
    }
}

var manager2 = new Manager("Marry", "male", "seafile");



// es6 解构赋值 批量从数组、对象、字符串中提取属性并创建变量
let [a, b, c] = [1, 2, 3];
console.log(a === 1);
// 数组：变量与数组个数对应，空缺变量就是undefined，嵌套数组也可以解构

// 对象解构赋值使用最多
let obj = {
    name: "Mike",
    sex: "female"
}
let { name: name, sex: sex } = obj;
// 如果对象的属性和变量名一致(通常一致)，可以简化写法
let { name, sex } = obj;
console.log(name); //Mike

// 在函数中，可以选择传入一部分参数
fucntion show(a, b, c) {
    console.log(b);
}
show({
    a: 1,
    b: 2,
    c: 3
});

// 字符串用的不多
let [a, b, c, d] = "ECMA";
console.log(a === "E");

// first, create a html file and create a canvas which id is mycanvas;

var myCanvas = document.querySelector("#mycanvas");
var ctx = myCanvas.getContext("2d");

// basic methods
ctx beginPath();
ctx.fillStyle = "red";
ctx.arc(100, 100, 50, 0, Math.PI*2, true);
ctx.closePath();
ctx.fill();

let rand = (min, max) => {
	parseInt(Math.random()*(max-min) + min);
}

class Ball{
	constructor(){
		this.color = `rgb(${rand(1,256)}, ${rand(1,256)}, ${rand(1,256)},)`;
		var r = rand(2, 10);
		this.r = r;
		this.x = rand(r, maxWidth-r);
		this.y = rand(r, maxHeight-r);
	}
	draw(){
		ctx.beginPath();
		ctx.fillStyle = "purple";
		ctx.arc(100, 100, 50, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}
}

let balls = [];
for(let i = 0; i < 10; i++){
	var ball = new Ball(ctx, canvasWidth, canvasHeight);
	balls.push(ball);
	// put new ball into balls
}