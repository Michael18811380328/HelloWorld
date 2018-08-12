// 例题：求数值n到m的和
function getSum (n,m) {
	//检测函数数据
	if (isNaN(n) || isNaN(m)) {
		alert("Error!please input two numbers!");
	} else {
		var sum = 0; 
		for (var i = n; i <= m; i++) {
			sum += i;
		}
	return sum;
	}
}

// Uncaught SyntaxError：Unexpected end of input 括号没有闭合

//例题：求n到m的乘积（下面习题省略数据检测）
 function getProduct (n,m) {
 	var pro = 1; 
	for (var i = n; i <= m; i++) {
		pro *=i;
	}
	return pro;
 }

 //例题：求三个数中的最大值
 function getMax3 (a,b,c) {
 	console.log(arguments.length); //结果是3
 	//使用arguments.length可以查看函数形式参数的个数（需要放在这个函数中）
 	var max = a;
 	//假设函数的最大值是第一个
 	if (b > max) {
 		max = b;
 	}
 	if (c > max) {
 		max = c;
 	}
 	return max;
 }
//可以调用getMax2函数

//例题：求两个数中的最大值
 function getMax2 (a,b) {
 	var max = a;
 	if (b > max) {
 		max = b;
 	}
 	return max;
 } 

// 求少量数据的最值，可以使用math.Max方法、三目云算法、调用简单函数方法。

 function getArrayMax (array) {
 	//判断array是否是数组（可能是字符串或者数值）以后会学到 	
 	//判断数据格式，默认值为空数组；
 	array = array || [];
	
 	//判断数组是否是空数组
 	//如果是空数组，或者数据不合适undefined，直接返回
 	//如果return后没有参数，直接返回undefined；
 	//当函数没有return仍然会返回undefined；	
 	if (array.length == 0) {
 		return false;
 	}
 		
 	var max = array[0];
 	//假设数组第一个是最大值，循环寻找最大值
 	for (var i = 1; i < array.length ; i++) {
 		if (array[i] > max) {
 			max = array[i];
 		}
 	}
 	return max;
 }

// 中英文符号一定输入正确！！！

// 练习题（函数解决）
// 默认所有给定的数据都是合理的数据
// 1.判断一个数是否是素数prime number：循环从2——根号n
/**
 * 求素数
 * @param  {[number]} num [输入数据]
 * @return {[Boolean]}    [是否是素数]
 */
function primenumber (num) {
	num = num || 0;
	//假设给定的数是质数
	var a = true;
	// i <= Math.sqrt(num); 开方更节省时间
	for (var i =2 ; i < num/2 ; i++) {
		if ( num % i == 0) {
			a = false;
			break;
		}
	}
	return a;
}

// 2.求阶乘factorial
/**
 * [阶乘factorial]
 * @param  {[number]} num [输入值]
 * @return {[number]}     [阶乘]
 */
function getFactorial (num) {
	num = num || 0;
	if (num == 0) {
		return 1;
	}
	//实际上不用上边这一步也可以
	//因为num=0的时候不会执行for循环，直接输出product就是1.
	var product = 1;
	for (i = 1; i <= num ; i++) {
		product *=i;
	}
	return product;
}

// 3.求阶乘之和（练习二叠加）
function getFactorialsum (num) {
	num = num || 0;
	if (num == 0) {
		return 1;
	}
	var product = 1;
	var sum = 0;
	//阶乘的和不包括0
	for (i = 1; i <= num ; i++) {
		product *= i;
		sum += product;
	}
	return sum;
}
//实际上练习三可以直接调用练习二的函数

// 4.求兔子数列中n项Fibonocci数列
function getFibonocci(num) {
	num = num || 0;
	if (num == 2 || num == 1) {
		return 1;
	}
	var a = 1;
	var b = 1;
	var c = 0; 
	for (i = 3; i <= num ; i++ ) {
		c = a + b;
		a = b ;
		b = c ;
	}
	return c;
}