### jquery

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


### ajax in jquery


~~~javascript
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

### canvas

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



### forEach和map方法

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

### flex 布局

flex布局中，怎样在一个container中放置nav栏？

​	1.在京东PC端项目中，nav部分以一个独立的div进行布局（nav栏隐藏动画）

​	2.在京东移动端项目中，百分比布局，nav部分也是单独的div进行布局（左右排布使用row-col布局）

​	3.在休闲帮PC端项目中，使用bootstrap框架中，有预定的nav组件（bootstrap中spa组件需要加快熟悉）

​	4.在微金所移动端项目中，使用bootstrap框架，也分成两个container进行开发。



### git

#### s0:下载安装

​	在git官网上进行下载和安装

#### s1:配置

用户名/邮箱/软件界面：

​	git config --global  user.name 'Michael An'  

​	git config --global user.email "1822852997@qq.com"

​	右键-options-looks 设置git外观和显示，

#### s2:记录开发过程

初始化仓库——工作区——暂存区——持久区

01 初始化仓库，git init 此时项目文件夹中出现.git文件夹（隐藏）存放版本库

02 在项目文件夹中创建文件，git statue 查看当前状态


03 git add

04 git commit -m 'test commit'


05 git log git log --oneline 一行内显示

06 clear 清空界面

07 git checkout 撤回错误代码 回退到缓存区或者工作区（撤回上一步文件操作）

08 git reset 回退到历史的某个版本

09 git diff 查看变化的地方

#### S3 远程服务器交互

远程代码库（码云，github）

设置：注册

重要：SSH公钥-不同电脑设置不同的key

生成公钥：在bash中生成ssh公钥（具体命令网站上有）生成一个方框图案。将bash中产生的代码复制到码云中。

git clone 粘贴代码 项目的代码就克隆到本地文件夹了
git push 将本地变化推送到服务器
git pull  将服务器变化更新到本地

码云：1822852997@qq.com

github 秘钥和公钥产生在我的文档下面.ssh文件夹中。

#### S4 忽略文件

.gitignore 文件不生效原因：git 中已经包含的文件存在缓存，需要删除这部分本地缓存文件。bash 清空缓存后，可以正常忽略文件。

```bash
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

#### Bash 命令

```bash
ls > readme.txt
ls >> readme.txt

表示将这个命令输出的结果存储在一个文件中(如果没有就新建这个文件)，第一个表示直接覆盖原始文件，第二个表示在这个文件中追加内容。
```

可以直接对npm的运行日志进行输出。把代码中的warning进行输出，这样可以避免终端界面大量输出。

### 操作系统

1.进程：当一个程序暂停时，需要将其现场信息作为断点保存起来，以便以后能从断点处继续执行。这样，在多道程序系统中需要一块特殊区域保存断点。因此程序的概念已不能如实地反映程序执行时的特征，需要一个更准确地描述程序执行状态的术语，这就是进程。

进程：描述程序运行状态（程序进展的程度）。进程是具有一定独立功能的程序段关于一个数据集合的一次运行活动。 

**2.** 进程组成

**①** 程序块：由指令代码组成，代码必须是纯代码，即在运行期间不修改自身。

**②** 数据块：进程执行时所需数据和工作单元以及开辟的工作区。

**③** 进程控制块（**PCB**）：一个数据结构，其中包含描述和管理进程所需全部信息。如进程标识、进程所属用户标识、进程状态、调度参数、现场信息和程序地址等。创建进程时建立**PCB**，撤消进程时收**PCB**。**PCB**是进程存在的惟一标志。 

3.程序与进程的本质区别在于程序是静态的，进程是动态的。

- 程序是指令及执行指令时所需数据的集合，可以长期保存在存储介质上；
- 进程具有创建性、运行性和消亡性。
- 进程和程序不是一一对应关系，一个程序可以对应多个进程。

CLI and GUI——Command Line Interface  and Graphical user interface

命令行界面（CLI）没有图形用户界面（GUI）那么方便用户操作。因为，命令行界面的软件通常需要用户记忆操作的命令，但是，由于其本身的特点，命令行界面要较图形用户界面节约计算机系统的资源。在熟记命令的前提下，使用命令行界面往往要较使用图形用户界面的操作速度要快。所以，图形用户界面的操作系统中，都保留着可选的命令行界面。



### React

this.setState()是异步的，也就是你调用了setState()之后，React就开始准备去更新了，中间计算会可能会有一定的延时。就是this.props和this.state更新的时候可能是异步的。

```js
// 错误案例
this.setState({
  value: this.state.newValue + this.props.oldValue
});
// 正确案例
this.setState((prevState, props) => {
  value: prevState.newValue + props.oldValue
});
```

尽量创建无状态组件：内部的数据由父组件传来，自己没有state

```js
class noState extends React.Component {
  constructor(props) {
    super(props);
  }
	render() {
		return (
    	<span className={this.props.titieClass}>{this.props.title}</span>
      <span>{this.props.article}</span>
    );
  }  
}
//using
<noState
	title={this.state.title}
	titltClass='no-state-test'
	article={this.item.content}
/>
```





### CSS初始化

1.margin-padding 

2.去掉边框img-fieldset

3.去掉ol-ul默认点

4.input默认，去掉边框

5.a 标签下划线

```css
ul, ol {
  list-style: none;
  border：none;
}
select, input {
	verticle-align: middle;
}
a {
  text-decoration:none;
}
```

6.body 统一的字体格式和类别：12px网页通常使用
font:normal normal 12px "Microsoft Yahei" #4c4c4c(或者999)背景色（ie）

7.清除浮动

```css
.clearfix::after {
  content:"";
  height:0;
  line-height:0;
  display:block;
  visibility:hidden;
  clear:both;
}
.clearfix {
  zoom :1;
}
```

根据需求直接定义样式类别；

logo部分设置h1，文字使用最高权重，设置文字首行缩进-999,或者显示透明隐藏。背景图片设置logo。

如果已经有psd文件，直接将需要的图层复制到新文件中，剪切周边的空白像素即可完成图片的制作。同理spirit图片也可以这样快速处理。

input-text-outline:none;

border-radius: 0px 5px 0px 5px;

可以设置四个角的曲率，左上角开始顺时针。如果盒子没有边框，也可以设置圆角。
外盒子和内部盒子颜色不一致时，同时设置内外border-radius.

a标签的颜色不能继承

verticle-align: middle;
不是center；按照中线对齐

设置盒子圆角内部凹陷？
可以首先设置盒子外边框，在四个角分别使用四个span背景图层压住四个角，使用绝对定位进行操作。

网上有完全的CSS代码实现过程。

或者直接使用ps将整个圆角内凹图片做成背景图片进行设置（不同分辨率可能造成背景图片变形）。

整体上难度类似于梅兰商城，比京东难度小很多。

块元素和行内块元素最好不要同级（div直接与img同级，不便于排版）

设计小图标有两种方式：

第一种在文字之前设置一个span，设置span的宽高，之后设置背景图片（背景图片范围很小，内存小影响小）

第二种直接设置文字的左边padding，设置文字模块的背景图片。这样整体上比较统一，没有新增加的tag，但是背景图片较大，如果涉及精灵图可能出现后面图标的bug。

推荐第一种设置方式，操作较复杂后期不会出现bug

padding和margin的实际使用：

margin可能产生边界合并，大盒子设置需要注意，全局统一设置盒子的外边距是左上或者右下；

padding设置需要考虑盒子模型，在content-box中会影响盒子的长宽，所以需要提前统一设置border-box。每一个单独设置太费时间。当然，这个border-box的兼容性和规范性值得考虑。

如果盒子有纯背景颜色或者border，使用padding更合适；如果盒子的背景图片或者小图标等不规则情况，最好使用margin进行设置。

设计开始之前统一查看不同对象的边界情况，首先做一个整体规划，想得多代码就精简。

设置文字size和行高，可以设置为14px/20px，节省代码，去除图片边缘的部分

```css
img {
  verticle-align: middle;
}
```



### 删除文件标签

1、删除文件标签两种方案对比

```js
// this.state.direntList.map((dirent) => {
//   let fileTags = dirent.file_tags;
//   if (fileTags) {
//     for (let i = 0, len = fileTags.length; i < len; i++) {
//       if (fileTags[i].repo_tag_id === deletedTagID) {
//         fileTags.splice(i, 1);
//         break;
//       }
//     }
//     this.updateDirent(dirent, 'file_tags', fileTags);
//   }
// });

let direntList = this.state.direntList.map(dirent => {
  if (dirent.file_tags) {
    let fileTags = dirent.file_tags.filter(item => {
      return item.repo_tag_id !== deletedTagID;
    });
    dirent.file_tags = fileTags;
  }
  return dirent;
});

this.setState({direntList: direntList});
```

居中

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    .main {
      width: 500px;
      height: 500px;
      background-color: greenyellow;
      display: flex;
      justify-content: center;
      align-items: center;
      /* 块级元素水平垂直居中 */
    }
    .center {
      width: 100px;
      background-color: lightblue;
      height: 100px;
      line-height: 100px;
      text-align: center;
      /* 文本垂直居中 */
      /* margin: 0 auto; */
      /* vertical-align: center; */
    }
  </style>
</head>
<body>
  <div class="main">
    <div class="center">
      文字居中
    </div>
  </div>
</body>
</html>
```

### 阻止事件冒泡

stopImmediatePropagation函数和stopPropagation函数的区别

event.stopImmediatePropagation() 方法阻止剩下的事件处理程序被执行。该方法阻止事件在 DOM 树中向上冒泡。停止当前节点，和所有后续节点的事件处理程序的运行。

stopPropagation 会阻止事件向上层元素冒泡。如果同一个元素绑定了多个事件（addEventListener），那么不会阻止其他事件的执行。

stopImmediatePropagation() 会阻止同层级事件的冒泡。

```js
div.addEventListener("click" , function(){
  alert("第一次执行");
  stopImmediatePropagation();
} , true);

div.addEventListener("click" , function(){
  alert("第二次执行");
} , true); 

// 点击div，第二次执行不会触发
```

