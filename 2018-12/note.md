### 07-31

#### 01  JQ中的ajax


~~~javascript
// 传统方法复习

// 第一步，创建ajax对象
var ajax = new XMLHttpRequest();

// 第二步，选择方式（get-post）
open(method,url,async);

// 第三步：（post）设置请求头和请求数据
ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
send(string);

// 设置请求头，发送请求报文在send方法中使用（考点：post方法和get方法的区别：get方法在url中传输数据，post需要单独传递数据。post方法可以传输更多数据，传输特殊符号，传输账号密码。当服务器无缓存可以使用post方法。其他情况使用get方法更快捷简单。）responseText responseXML 响应报文（string或者XML响应数据）

// 第四步: 当请求成功后，获取请求结果
event.onreadytstatechange(res) = function(){
	if(status === 200 && readyState === 4){
		// callback function
		var text = res;
	}
}
~~~

问题1：没有从实际的数据网站获取信息（postman软件）！

问题2：没有用jquery方法使用ajax获取数据！



**学习：jquery中的ajax(W3C)**

传输的文件：文本 xml html json文件

优点：传统的ajax方法，在不同的浏览器操作不同。JQ进行很好的封装，可以兼容不同的浏览器。


01 load 方法：把请求到的数据直接放入对应元素内部

~~~javascript
$(selector).load(url,[data],[function(){
	callback function;]
});

url:必选参数，希望加载的url
data:可选参数，与请求一起发送的键值对
callback:可选回调函数

$("#conatiner").load("demo.txt");

demo.txt 中的内容是html代码（<p>Hello world</p>）

~~~

回调函数三个参数说明：responseTxt（请求结果） statusTxt（请求状态） xhr（XMLHttpRequest对象）

注意：在load方法中，不管请求是否成功，请求结束后都会执行回调函数。

~~~javascript
$("#button").click(function(){
	$("#div1").load("demo.txt",function(responseTxt,statusTxt,xhr){
		if(statusTxt == "success"){
			alert("external content load successfully!");
			//外部内容加载成功
		}
		if(statusTxt == "error"){
			alert("Error" + xhr.status + ":" + xhr.statusTxt);
			//报错信息：请求状态
		}
	});
});
~~~

02 ajax.get()方法

get方法可以返回缓存的数据；post方法不会返回缓存的数据，常用于连同请求一起发送数据。

~~~javascript
$("#button").click(function(){
	$.get("demo.php",function(data,status){
		alert("数据"+data+"/n状态"+data);
	});
});
<?php
	echo "this is some text in PHP";
?>
~~~
03 ajax.post()方法

~~~javascript
$("#button").click(function(){
	$.post("demo_post.php",
		{
			name:"Trump",
			age:50
		},
		function(data,status){
			alert("数据"+data);	
		}
	});
});

将数据（键值对）发送到php，php根据发送的数据进行返回，最后执行回调函数
~~~
~~~php
<?php
	$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
	$age = isset($_POST['age']) ? htmlspecialcharts($_POST['age']) : '';
	echo 'Dear' . $name;
	echo 'Your age is ' . $age;
?>
~~~

04 $.ajax()方法 该方法用于其他方法不能完成的请求

~~~javascript
$.ajax({键值对})
url:"demo.php",success:function(){回调函数},error:function(){},complete:function(){},data:{键值对},type:"GET",xhr 其他键值对共计20个，可以查询

~~~

#### 02 bootstrap

lg-md-sm-xs(screen 1200-992-768px)

.container .row .col(column) 百分比布局或者flex布局 col-md-6

(每个row最多12份col，多了自动折叠)

右偏移：col-md-offset-4 

段落：默认14px，line-height 1.428 这些设置默认所有的p和body元素

（目前BT基本语法已经掌握，模板使用不熟练，移动端和PC端适配也需要研究，媒体查询不熟练）————需要实战

#### 03 canvas

~~~html
<canvas id="can" width="500" height="500"></canvas>
~~~

~~~javascript
	//常用方法
	var can = document.getElementById('can');
	var cvs = can.ContentText("2d");

	cvs.moveTo(0,0);
	cvs.lineTo(500,500);
	cvs.stroke();
	cvs.strokeWidth = 5;
	cvs.lineStyle = "red";
	cvs.closePath();
	cvs.clearPath();

	cvs.fillStyle = "blue";
	cvs.fill();

	cvs.strokeRest(0,0,200,200);
	cvs.fillRect(200,200,100,100);
	cvs.clearRect(0,0,cvs.width,cvs.height);

	lineCap: butt square round
	lineJoin: miter bevel round
	
	//虚线
	cvs.setLineDash([x,y,z,p]);
	cvs.getLineDash();
	cvs.lineDashOffset = 2;
	//偏移量

	//绘制汉字
	strokeText();描边文字
	fillText();填充汉字
	textAlign = "left/right/center";
	textBaseline = "top/bottom/middle";
	//垂直对齐方式
~~~

案例：封装扇形，封装坐标系，绘制汉字

闭包
~~~javascript
(function(window){
	function Fun(){}
	Fun.prototype = {};
	window.Fun = Fun;
})(window);
~~~

#### 04 forEach和map方法

array.map(function(value,index,arr){return 处理每个数组元素执行一次函数})

把数组内的每一项都执行一次函数，返回一个新数组(对于空数组也会执行回调函数)

~~~javascript
var array = [1,2,3,4];
var array2 = array.map(function(num,index){
	return num*(index+1); 
});
console.log(array2); 
//[1,4,9,16]
~~~

array.forEach(function(value,index,arr){遍历（列出）数组每一项，并且执行一次函数，并不会返回一个结果数组});

~~~javascript
var sum = 0;
var array1 = [1,2,3,4,5];

array1.forEach(function(value,index){
	sum += value * (index+1);
	//1+4+9+16+25 = 55
	console.log(sum);
	//依次输出1,5,14,30,55五个结果
});
~~~
### 08-01

#### 05 jquery

1. DOM方法：

   html——获得（设置）对象的html

   text——获得（设置）对象的文本值

   empty——清空对象内容

   remove——移除这个对象

   A.append(B) 

   A.appendTo(B)

   A.prepend(B)

   A.prependTo(B)

   addClass-removeClass-toggleClass-hasClass

2. 改变样式：

   css（键值对，获得200px） width height(获得200) 增减类名

3. 动画：

   show-hide fadeIn-fadeOut slideUp-slideDown 

   animation(动画名称，等待时间，linear，回调函数)

   stop（停止当前动画）用于动画队列

4. 事件：

   on-简单事件 $('div').on('click',function(){回调函数})

   delegate-委托事件：事件触发器和执行者不同

5. 插件和扩展：

   bootstrap插件，zepto扩展

   ​

### 08-02

#### 06 Mac入门

​	1.硬件管理：Mac是苹果电脑，MacOS是通用苹果设备系统（Mac+Mini）；Mac电池很好，基本可以长期待机，周末关机即可；内存优化很好，不需要关机清理内存，不需要安装其他杀毒软件和清理软件。

​	2.办公软件管理：从专门的App Store进行下载，软件默认后缀是app，直接拖动到应用程序即可进行安装程序，或者压缩包解压即可自动进行安装。（问题一：安装的文件路径及盘符？系统盘是否造成性能影响——苹果中只有一个磁盘）。安装基本的office软件，通讯软件QQ微信，chrome，firefox，迅雷，

​	iWork == Office——左上角——前往——下载（pkg安装文件，双击打开，或者选中软件空格打开）——安装（需要输入系统的密码）大约需要3-4分钟——点开下面的launch（火箭）——选择软件（Office）

​	iWork ==keynote(ppt) numbers pages

​	3.专业软件管理：

sublime？Dreamweaver？NodeJS？koala？

linux虚拟机？bash？git？

x-mind typora 百度网盘？

npm包管理器 mysql数据库 安装

​	4.快捷键：右上角开机；快捷键调节声音亮度等；触摸板功能很强大。

​		F3 切换应用，或者使用command+TAB

​	5.安装虚拟机：







#### 08 flex问题

面试的问题：flex布局中，怎样在一个container中放置nav栏？

​	1.在京东PC端项目中，nav部分以一个独立的div进行布局（nav栏隐藏动画）

​	2.在京东移动端项目中，百分比布局，nav部分也是单独的div进行布局（左右排布使用row-col布局）

​	3.在休闲帮PC端项目中，使用bootstrap框架中，有预定的nav组件（bootstrap中spa组件需要加快熟悉）

​	4.在微金所移动端项目中，使用bootstrap框架，也分成两个container进行开发。

注意：flex布局样式和基于flash player的flex框架不同。——详细参考bootstrap框架（加油学！）



#### 09 git命令



##### s0：下载安装

​	在git官网上进行下载和安装（Mac版本也有？操作系统是多少位的？）后面的设置一直按照默认设置就行。

##### s1:配置用户名/邮箱/软件界面：

​	git config --global  user.name 'Michael An'  

​	git config --global user.email "1822852997@qq.com"

​	右键-options-looks 设置git外观和显示，

​	问题：Mac系统需要设置sudu？

##### s2:记录开发过程：

~~~txt
	初始化仓库——工作区——暂存区——持久区

	01 初始化仓库 git init 此时项目文件夹中出现.git文件夹（隐藏）存放版本库

	提示：Initialized empty Git repository in C:/Users/Administrator/Desktop/git/.git/
~~~
	02 在项目文件夹中创建文件
	
	git statue 查看当前状态

~~~git
	$ git status

	On branch master

	No commits yet

	Untracked files:
	  (use "git add <file>..." to include in what will be committed)
	
	        index.html
	
	nothing added to commit but untracked files present (use "git add" to track)
~~~

	03 git add index.html 加入暂存区，查看状态（新加入一个文件）
	add + 文件名 改动一个文件
	add . 全部改动文件
	
	小提示：向上向下执行之前的命令
	
	提示：On branch master
	
		No commits yet
	
		Changes to be committed:
		  (use "git rm --cached <file>..." to unstage)
	
		        new file:   index.html
	
	04 git commit -m 初始化界面
	（-m 添加备注信息）

~~~git
	1 file changed, 10 insertions(+)
 	create mode 100644 index.html

	On branch master
	nothing to commit, working tree clean
~~~

	05 git log 打印日志

~~~git
	commit 2bcea6a3c90d414522dde8d490addd2c4d45706f (HEAD -> master)
	
	Author: Michael An <1822852997@qq.com>
Date:   Thu Aug 2 19:28:34 2018 +0800
~~~
    初始化index.html文件
    
    git log --oneline 一行内显示
​	

	06 clear 清空界面
	
	git show 2348875 详细改动内容
​	

	07 撤回错误代码
git checkout 回退到缓存区或者工作区（撤回上一步文件操作）

如果在index.html中改动代码，使用这个命令就可以撤销操作。

git reset 回退到历史的某个版本



git diff 查看变化的地方（改变的具体内容）


~~~git
	$ git diff
	diff --git a/index.html b/index.html
	index bc787ac..498e1a2 100644
	--- a/index.html
	+++ b/index.html
	@@ -6,6 +6,7 @@
	        <link rel="stylesheet" href="index.css">
	 </head>
	 <body>
	-       git c撤回操作
	+       git c撤回操作 设施
	+       这是什么
	 </body>
	 </html>
	\ No newline at end of file
	
	$ git log
	commit 43ffa00e48a1a731f4be4f1db6ee56000af7c59f (HEAD -> master)
	Author: Michael An <1822852997@qq.com>
	Date:   Thu Aug 2 19:47:26 2018 +0800
	
	    撤回版本
	
	commit 2bcea6a3c90d414522dde8d490addd2c4d45706f
	Author: Michael An <1822852997@qq.com>
	Date:   Thu Aug 2 19:28:34 2018 +0800
	
~~~



##### 03 远程服务器交互

远程代码库（码云，github）设置：注册

重要：SSH公钥-不同电脑设置不同的key

生成公钥：在bash中生成ssh公钥（具体命令网站上有）生成一个方框图案。将bash中产生的代码复制到码云中。


	远程连接：
	Public 公有项目
	Fork 复制别人的项目
	Private 私有项目
	
	创建项目（仓库）
	
	点击克隆——复制代码
	
	git clone 粘贴代码 项目的代码就克隆到本地文件夹了
	
	git push 将本地变化推送到服务器
	
	git pull  将服务器变化更新到本地



码云：1822852997@qq.com

github 秘钥和公钥产生在我的文档下面.ssh文件夹中。

