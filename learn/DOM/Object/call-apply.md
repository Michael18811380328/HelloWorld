## call和apply方法

作用：原生对象可以有这两个方法，可以把一个不属于自己的方法使用在自己身上，改变原始方法的this指向。

使用：例如把一个数组的方法使用在伪数组上面（改进：直接把伪数组通过Array(from)改成数组）

~~~js
let divs = document.querySelectorAll('div');
Array.prototype.concat.call(divs, 1, 2, 3);
Array.prototype.concat.apply(divs, [o1, o2]);
~~~

#### 相同点

这两个方法的作用是一样的。都是==在特定的作用域中调用函数==，等于设置函数体内this对象的值，以扩充函数赖以运行的作用域。一般来说，this总是指向调用某个方法的对象，但是使用call()和apply()方法时，就会改变this的指向。

#### 不同点

接收参数的方式不同。

- **apply()方法** 接收两个参数，一个是函数运行的作用域（this），另一个是参数数组。

**说明：**如果argArray不是一个有效数组或不是arguments对象，那么将导致一个 
TypeError，如果没有提供argArray和thisObj任何一个参数，那么Global对象将用作thisObj。

- **call()方法** 第一个参数和apply()方法的一样，但是传递给函数的参数必须列举出来。

**说明：** call方法可以用来代替另一个对象调用一个方法，call方法可以将一个函数的对象上下文从初始的上下文改变为thisObj指定的新对象，如果没有提供thisObj参数，那么Global对象被用于thisObj。

```js
// eg1
window.color = 'red';
document.color = 'yellow';

var s1 = {color: 'blue' };
function changeColor(){
  console.log(this.color);
}

changeColor.call();         //red (默认传递参数)
changeColor.call(window);   //red
changeColor.call(document); //yellow
changeColor.call(this);     //red
changeColor.call(s1);       //blue

// eg2
var Pet = {
  words : '...',
  speak : function (say) {
    console.log(say + this.words)
  }
}
Pet.speak('Speak'); // Speak...

var Dog = {
  words:'Wang'
}

Pet.speak.call(Dog, 'Speak'); //SpeakWang
// 调用的仍然是Pet.speak的方法，但是this指向DOG对象（方法中的参数使用DOG==this的参数）
// Dog对象可以使用Pet对象的方法，作用域是Dog的作用域，所以指针指向Dog内部
```

apply

```js
//例1
window.number = 'one';
document.number = 'two';

var s1 = {number: 'three' };
function changeColor(){
  console.log(this.number);
}

changeColor.apply();         //one (默认传参)
changeColor.apply(window);   //one
changeColor.apply(document); //two
changeColor.apply(this);     //one
changeColor.apply(s1);       //three

//例2
function Pet(words){
  this.words = words;
  this.speak = function () {
    console.log( this.words)
  }
}
function Dog(words){
  //Pet.call(this, words); //结果： Wang
  Pet.apply(this, arguments); //结果： Wang
}
var dog = new Dog('Wang');
dog.speak();
```
