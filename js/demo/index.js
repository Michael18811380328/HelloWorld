var konggestr="&nbsp; &nbsp; &nbsp; &nbsp; ";   //空格
printf(konggestr+"===========数组===========")
//变量是松散型的，可以指向任意类型的数据
var name = "student",age=12;   //underfined、null、boolean、string、number为基本数值类型。逗号一并定义初始化多个变量。基本包装类型String、Boolean、Number通过valueOf()可以获取基本数值类型，可以实现自动装箱和拆箱操作。
var names=[];//定义数组并初始化为空
names = ["小明","小红","小刚"];  //赋值，可以在定义时赋值
names=new Array(names.length);   //数组基类为Array，属性length为数组长度
names = new Array('小明','小红','小刚');   //字符串不区分单双引号，只要配对使用就行
names[4]="小胡";   //通过设置，直接添加了两项null和“小胡”
printf(names.join(","));   //使用间隔字符串连接数组
names.unshift("小李","小兰");   //首部添加
names.push("小李","小兰");   //末尾添加
var item = names.pop();//删除获取最后一项
item=names.shift();//删除获取第一项
names.reverse();  //数组取反
printf(names);
names = names.slice(-4,6);  //读取数组段，不修改源数组，复数表示从右向左数，-1表示末尾第一个元素，0表示首部第一个元素。只有一个参数时表示直到末尾。读取包含第一个参数不包含第二个参数
printf(names);
names.splice(2,1,"小季","小明");  //删除添加数据，修改源数组，删除添加参数第一个参数表示开始删除的位(包含),第二个参数表示要删除的位数目，后面参数表示在删除位置处添加元素
printf(names);
names=names.concat("小王",["小明","小黑"]); //不修改源数组，所以要赋值
names.sort();  //数组排序sort(compare)，参数可为排序函数,空元素将排到最后
printf(names);
names.indexOf("小明");  //查找匹配元素的位置，没有返回-1，lastindexof表示匹配的最后位置。
var boolresult = names.every(function(item,index,array){   //对数组中元素每一项进行布尔运算，返回false和true。every函数，全部元素返回true时返回true。some函数某一元素返回true时返回true
    return (index>2);
});
var nameresult = names.filter(function(item,index,array){   //返回数组，filter函数获取满足条件的项，map获取每一项计算值的集合，不改变原数组，forEach函数等价于for语句，对每项处理
    return (index>2);
});
printf(nameresult);
nameresult = names.reduce(function(prev,cur,index,array){   //reduce从前向后迭代，reduceRight从后向前迭代。
    return prev+"+"+cur;   //迭代从第二项开始，prev初始值为第一项，cur初始值为第二项。计算值自动传给下一函数的prev，返回最后一次迭代产生的值
});
printf(nameresult);
function compare(student1,student2){   //比较函数，返回-1,0,1
    //return student1.age<student2.age?-1:(student1.age==student2.age?0:1);   //-1表示前对象小，1表示后对象小，0表示相等
    return student2.age-student1.age;  //正数自动转化为1，负数转化为-1
}
ages=[];
for(var i=0;i<7;i++){   //js没有块级作用域，for  if块内定义的变量，在块外可以访问，函数内定义的局部变量外部不可以访问。可以使用let i定义临时作用域，定义的变量和对外部变量的修改均不保留，
  ages.push(Math.floor(Math.random()*10+1));  //floor向下取整，random()生成0-1之间的随机数
}
printf(i);
printf(Math.max.apply(Math,ages));  //max取最大值，min取最小值。还有很多数学运算



printf("===========对象===========")
var student1 = new Object();   //定义对象引用，或者var student1 = {},new Object()。所有的包装类都派生于Object。Object基类包含hasOwnProperty、isPrototypeOf、propertyIsEnumerable、toLocaleString、toString、valueOf方法
student1.name = "student1";   //直接设置同时添加对象属性
student1["age"]=12;  //直接设置同时添加对象属性
student1.getname = function(){   //设置添加对象方法。函数表达式，只有在执行到本行才解析
   return this.name;  //this表示作用对象，这里为student1
};
//var {name:personname, age:personage} = student1;  //解构赋值，对应项使用副本赋值，如[value1,value2]=[value2,value1];可实现两个基本数据交换
printf(JSON.stringify(student1));   //JSON.stringify把对象转化为JSON字符串表示

student1 = {
    name:"student1",
    _age:12,  //前面有下滑线是一种常用的标记，用于表示只能通过对象方法访问的属性,只是对开发者的一种标记习惯，并不是真的私有变量
    getname:function(){
        return this.name;
    }
};
Object.defineProperty(student1,"name1",{  //可以用于定义新数据属性，也可以修改原有数据属性。也可以不使用defineProperty可以直接定义数据属性。也可以使用defineProperties同时定义多个数据或访问器属性
    writable:true,  //对象属性的数据属性，是否可修改
    enumerable:true,//对象属性的数据属性，通过for-in遍历到
    configurable:true,  //对象属性的数据属性，能否通过delete删除属性，configurable属性在定义为false以后，就不能再被设置
    value:"sst"  //对象属性的值属性，默认为underfined
});
Object.defineProperty(student1,"age",{   //访问器属性，不能直接定义，必须通过defineProperty定义，不包含数据值，设置时调用set函数，读取时调用get函数。访问器属性名称不要和数据属性名称相同
     get:function(){return this._age},
    set:function(newvalue){this._age=newvalue;this.name="xxt";}
});
student1.age=22;   //age不是数据属性，而是访问属性。这里是调用了set函数，
Object.preventExtensions(student1);  //设置对象不可被扩展，以后再添加属性都是underfined，防止被篡改
Object.seal(student1);  //密封对象，对象不能添加删除属性。
Object.freeze(student1);  //冻结对象，属性不可修改。只能通过set访问器修改
printf(JSON.stringify(student1));   //将JSON格式转化为字符串。JSON格式即KEY-VALUE格式
for(var myproperty in student1){   //for in遍历对象属性
    console.log(myproperty,":",student1[myproperty]);
}




function Student(name,age){   //自定义函数，构造函数，等同于java中的自定义类。所有的类型派生于Object
    var sex="男";   //函数内部为私有属性
    this.name=name;  //通过this创建的是可以被实例对象访问的
    this.age=age;
    this.getName=function(){
        return this.name;  //函数内部this表示此函数引用的拥有者，不是传入参数。当作为全局函数时，this表示window
    };
    this.setName= function(name){  //函数不关心传入或者定义的参数数量和类型，因此所有函数没有重载
        if(typeof name=="string")   //基本数据类型，做类型检验，避免参数传递错误
            this.name = name;      //没有指定返回值，实际返回的是undefined
    };
    this.getAge =function (){
        if(this.age.toFixed(2)<<2)  //转化为false的值："",0,NaN,null,underfined。其他转化为true，类型首字母大写，变量首字母小写，<<按位移动，<<<无符号按位移动,toFixed(2)表示保留2位小数
            return -~this.age;  //~按位取非，&按位取与，|按位取或 ^按位取异或，一元减号，表示取负
        return this.age;  //保证所有路径都有返回值，虽然不加也不会出错，因为有默认返回值undefined
    };
    this.setAge= function(age){  //函数参数总是按值传递，无论基本类型还是引用类型，引用类型传递引用的值，不传递指向对象的值
        if(age instanceof Number){  //包装类型，做类型检验，避免参数传递错误
            this.age = parseInt(age.toString(16),16);//parseInt将字符串化为整数，支持识别多进制和转化为多进制，toString()转化为字符串，支持多进制转化
        }
        //typeof判断基本类型，underfined声明未定义(underfined类型只有一个值)，boolean布尔型，string字符串，number数值，object对象或null(null类也只有一个值)，function函数
        //instanceof判断包装类型，基本类型对象的包装类型为Underfined,Boolean,String,Number,Object,
        typestr = typeof("getAge");  //省略var的变量为全局变量
    }
}
student1=new Student("小明",12);  //new是创建了一个新对象，构造函数将属性和方法绑定到这个新对象上
Student("小红",13);  //作为全局函数。通过构造函数将属性绑定到window上
var student2 = new Object();
Student.call(student2,"小刚",14);//call和apply通过构造函数，将属性绑定到以存在对象student2上
if(student2 instanceof Student)  //instanceof判断变量是否是某个类型或其派生类型实例的，student1是Student类，同时也是Object
     printf(student2.name);


//js的继承有多重方式。每种方式的内存操作都是不同。下面展示其中一种。
// js的类型继承原理和java、c#相同。派生类继承基类时，会实例化(浅复制)一个基类对象和保留引用在派生类空间。派生类内的实例的基类和派生类自定义的函数分别操控各自的属性。在函数和属性操作中时，会自动先派生后基类的顺序查找，不用手动查找
//关于实例化：只复制且全部复制在构造函数中开辟了内存的变量，包括引用变量。派生类实例化时基类对象进行浅复制。
function Monitor(){   //自定义函数，相当于自定义一个类，类名Monitor。在文件中多称为构造函数，相当于c++和java中的自定义类。每个函数类，都有基类Object
    this.task=["学习"];
}
Monitor.prototype.data = "原型数据";  //prototype获取派生类的基类对象引用，通过基类对象引用直接为基类添加属性。系统会为派生类提供默认原型，也可以通过继承自定义原型
person1 = new Monitor();//通过函数类实例化对象
person2 = new Monitor();  //实例化对象
Object.getPrototypeOf(person1).data="原型数据1";  //通过实例修改原型。Object.getPrototypeOf()获取对象原型。实例对象包含对原型的引用，但需要使用getPrototypeOf函数获取
person1.data="派生数据";  //修改派生类属性，这样当查找data数据会先自动搜索派生类，再自动搜素基类。

printf(person1.hasOwnProperty("data")); //是否拥有指定属性(不算基类属性)。true因为自定义了该属性
printf(person1.data);//读取自定义属性

var keys = Object.keys(Monitor.prototype);  //获取对象所拥有(不包括继承的)的可枚举实例，Monitor是类，Monitor.prototype是基类实例。如果换成person1，则只能获取派生类的自定义属性。getOwnPropertyNames可获取对象拥有的所有属性
printf(keys);
delete person1.data;//删除派生类自定义的属性
printf(person1.hasOwnProperty("data"));     //是否拥有指定属性。false，因为该属性在派生类中被删除了，只有基类中存在，虽然可以访问，但是是继承过来的，不是自己拥有的
printf("data" in person1);     //是否包含指定属性。true包含，只是不拥有
printf(person1.data);//基类属性
Monitor.prototype.sex=["男"];  //通过派生类向基类添加数组引用变量
person1.sex.push("女");  //在实例对象中保留了基类的引用和浅复制了基类对象。这里的sex是经过了一次从派生类到基类的向上查询。
printf("基类中的引用:"+person2.sex);  //实例对象连带更新。所以构造函数用于指定专属属性，原型用于存放共享属性
person1.task.push("工作");  //修改构造函数中引用指向的对象
printf("派生类中的引用:"+person2.task);  //实例对象不连带更新构造函数中的数据。因为实例化时会深复制构造函数中的所有数据，在实例化时为每个对象都创建

Monitor.prototype=new Student("组长",12);  //继承，派生类Person设置基类为Student。在继承中会为浅复制一个基类实例放在派生类空间中，同时将引用存储为prototype，放在派生类Person中


//student1=null;   //通过设置引用的值为空，切断引用于对象之间的关联，便于垃圾回收器收回内存
//constructor构造函数
//isprototypeof(object)   检测传入对象是否是当前对象的原型




printf("===========字符串、正则表达式===========");
name = " Muaneng Tuanpeng ".trim().toLowerCase().replace("eng","ing");  //trim()删除字符串前后空格。toLowerCase转化为小写。replace替换第一个eng，
name1 = name.substring(name.indexOf("t",3),name.lastIndexOf("g",0));//slice、substring参数为首尾下标，substr为起点下标和长度。都不改变源字符串。indexOf和lastindexOf查询子字符串的位置,第二个参数表示从哪个字符开始向对面搜索
name1 = name.substr(-4);//传入负值时，slice将负值加上字符串长度，substr将第一个负值加上字符串长度，第二个负值转为0，substring将负值都转为0
name1="muaneng tuanpeng".replace(/eng/g,"ing").split(" ",2)[0];   //replace接收正则表达式，/g替换全部，split分割字符串，并限定返回的数组个数。[0]读取返回数组的第一个元素。
//正则表达式 = /pattern/flags    其中flags中g表示匹配全部，i表示不区分大小写，m表示匹配多行
//pattern包含 ([{\^$|)?*+.]}元字符，若匹配的字符串中包含元字符，使用\转义。     .表示任一字符，()表示捕捉字符
var patter1 = /(.)u/gi;   //正则表达式，标志没有可为空，也可以使用var patter1 = new RegExp("pattern","flags");使用new是创建对象
if(patter1.test(name)){   //test查找符合要求的子串是否存在,返回true
    printf(RegExp.input);  //原始字符串
    printf(RegExp.leftContext);//捕捉到的位置的左边字符串
    printf(RegExp.rightContext);//捕捉到的位置的右边字符串
    printf(RegExp.lastMatch);//返回最近一次与整个正则表达式匹配的字符串 mu
    printf(RegExp.lastParen);  //返回最近一次捕捉的字符
    printf(patter1.global);//返回正则是否包含全局标志g
}
var matches = patter1.exec(name);  //查找符合要求的子串。matches.index表示查找到的起始下标，matches.input表示输入字符串。patter1.lastIndex表示查找到的结束下标，matches[0]表示查找到的第一个匹配项，若匹配项为全局模式，则每次调用返回下一个匹配项。
printf(matches.index);printf(patter1.lastIndex);printf(matches[0]);
String.prototype.startwith = function(text){  //设置字符串引用的原型，为String、Object、Array等添加方法
    return this.indexOf(text)==0;
};
printf(name.startwith("mu"));



printf("===========函数===========");
//自定义函数，函数声明，会优先加载。调用函数时会先在本机活动对象中查询，即当前js文件中查询，如果没有才会向上查询，所以在两个js文件中定义相同函数名，js文件内调用各自的函数，其他文件中调用最后声明的函数
function printf(str){
    //var hint =  document.getElementById("hint");  //根据id获取元素
    hint.innerText += str.toString()+"\n";  //设置label显示的文字，也可以自动调用其他js文件中的hint变量。hint会先在当前文件中查询，然后向之前引用的js文件查询，再向之后引用的js文件查询
}

function callfunction(myfunction,myargument){    //向函数传输函数引用
    return myfunction(myargument);  //调用回调函数
}
callfunction(printf,new Date().toDateString());//Date无参数，表示获取当前时间。toDateString()显示星期年月日，toTimeString显示时分秒，toLocaleDateString以特定地区的格式显示星期年月日。还可以分别获取时间的各种参数。

function getproperty(propertyname){   //
    printf("外层函数");
    return function (object1){   //内部函数，返回函数引用，一个函数可以访问另一个函数的变量，叫做闭包。函数的this和arguments变量只搜索到活动对象中（活动上下文），不会一直向外层搜索
        printf("内层函数");
        var getnamefun = getproperty("name");   //执行外部函数，getnamefun是一个函数引用变量
        printf(getnamefun.length);  //函数希望的参数个数
        return object1[propertyname];   //内部函数返回值，内部函数可以读取外部函数的变量，包括外层函数的arguments对象
    }
}
var getnamefun = getproperty("name");//获取内部函数引用。外层函数的作用域链没有销毁，因为有内部函数的引用存在。有引用指向对象，所以对象不会被销毁，这也是垃圾回收的机制
printf(getnamefun(student1));   //执行内部函数

//函数参数
function printname() {   //定义参数和传入参数可以不一致，所以函数没有重载，为了使用明确，最好设定成一致模式。
    var name="内部变量"; //函数内定义变量为私有变量
    //arguments.callee.caller.toString();  //arguments.callee.caller、getname.caller表示调用当前函数的函数的引用
    if(arguments.length>0 && arguments[0]=="晓明")   //函数内部arguments表示参数数组
        printf(this.name);
        //arguments.callee("小明");  //函数内部arguments.callee表示arguments的拥有者函数的引用，也就是当前函数的引用。实现递归调用
}
printname("晓明");
printname.apply(this,["晓明"]);   //函数相当于一个类，函数名相当于类的一个引用，函数类拥有参数apply,传入调用者和参数数组。全局this相当于window
printname.call(student1,"晓明");  //call属性传入调用者和逐个参数。是将函数绑定到对象上，然后在通过对象调用此函数。
printname.bind(student1)("晓明");  //printname.bind(student1)返回函数绑定到对象上的函数引用，通过引用()调用此函数


//内置对象 Object，Array，String。。。Global(其他零散函数的合集)，Math
var url = "http://www.baidu.com";
printf(encodeURI(url));  //网址编码，对应decodeURL驿码，
var diftime = new Date()-new Date(Date.UTC(2005,4,5,17,55,55));   //UTC参数，年月日，小时分钟秒毫秒，其中月和小时从0开始，年月参数必须有。Date没有参数表示当前时间，时间相减获取时间相差时间毫秒数
eval("printf(diftime)");   //eval翻译执行js代码字符串



//===========================容器======================================
var map = new Map();  //映射，不重复的键，以键值对的形式存在
map.set("name","mapluanpeng");  //添加设置映射
if(map.has("name"))  //判断映射是否存在
    printf(map.get("name"));  //读取映射
map.delete("name");  //删除映射

var set = new Set(); //集合。不重复的元素集合，不存在键值对
set.add("name"); //添加集合
if(set.has("name")){  //检测集合是否存在指定元素
    set.delete("name");  //删除集合元素
    printf("删除集合元素name");
}

// =====================
function printf(str){
    var hint =  document.getElementById("hint1");  //根据id获取元素
    hint.innerText += str.toString()+"\n";  //设置label显示的文字，也可以自动调用其他js文件中的hint变量
}

//=======================================BOM========================================
printf("===========BOM(window窗口信息)===========");
//window对象，窗口信息
var windowinfo = {};
windowinfo["screenLeft"]=(window.screenLeft);
windowinfo["screenTop"]=(window.screenTop);  //浏览器位置
windowinfo["innerWidth"]=(window.innerWidth);
windowinfo["innerHeight"]=(window.innerHeight);//浏览器大小
windowinfo["clientWidth"]=(document.documentElement.clientWidth);
windowinfo["clientHeight"]=(document.documentElement.clientHeight);//浏览器大小
windowinfo["clientWidth"]=(document.body.clientWidth);
windowinfo["clientHeight"]=(document.body.clientHeight);//页面大小
printf(JSON.stringify(windowinfo));
window.moveTo(20,20);  //moveTo移动到绝对位置，moveBy移动相对距离。好像并没有效果
window.resizeTo(200,200); //resizeTo调整大小到指定大小，resizeBy缩放窗口大小
var wroxwin=window.open("http://www.baidu.com","_blank","height=400,width=400");  //打开窗口,参数地址、窗口名或框架名、窗口属性。返回窗口引用，进而可控制窗口。window就是一个窗口引用。不过有可能弹窗会被屏蔽

//弹框和超时设置
if(wroxwin==null)
    alert("弹出窗口被屏蔽");  //弹出系统提示框，只有字符串和确定按钮
else
    var timeoutid = setTimeout(function(){  //setTimeout设置超时调用。js是单线程语言。但可以设置超时调用和间歇调用
        wroxwin.close();  //关闭指定窗口
    },500);  //设定延迟时间为500ms，这里相当于创建了新的线程，后面程序不会等待此函数执行完毕。若当前窗口关闭这此线程不会再执行
i=0;

/*result = prompt("设定循环执行的毫秒数？","2000"); //prompt带有输入框的系统弹出框，第一个参数为提示字符串，第二个参数为默认输入内容。返回用户输入内容。
var intervalid=setInterval(function(){ //setInterval间歇执行，设置间隔时间
    printf("循环执行"+(i++).toString()+"    "+new Date().toTimeString());
    if(i==4) {
        if(!confirm("是否继续循环"))  //confirm带有确定和取消按钮的系统对话框。点击ok返回true，点击关闭或取消返回false
            clearInterval(intervalid);  //取消超时调用或间歇调用
    }
},parseInt(result));*/

printf("===========BOM(location网址信息)===========");
var locationinfo = {};
locationinfo["href"]=(location.href);  //打开新网址。location包含关于网址的信息和操作。可以读取也可以设置，设置及代表操作。
locationinfo["hostname"]=(location.hostname);//hostname主机名
locationinfo["hash"]=(location.hash);//网址尾部的#后字符串
locationinfo["pathname"]=(location.pathname);//路径
locationinfo["port"]=(location.port);//端口
locationinfo["search"]=(location.search);//网址尾部？后字符串
printf(JSON.stringify(locationinfo));
printf("===========BOM(navigator浏览器信息)===========");
printf("浏览器名称:"+navigator.appName); //浏览器名称,很多属性，自己查询
printf("浏览器版本:"+navigator.appVersion); //浏览器版本


printf("===========BOM(history上网记录)===========");
try{   //try尝试运行
    //history.go(-1);//后退或前进n页，
    //history.go("525heart");//跳转到最近的 网址包含指定字符号的网址上
    //history.back();  //后退一页
    //history.forward();  //前进一页
    throw "hello world";  //代码遇到异常会报错，停止运行，除非try，catch捕获异常
}catch (err){  //catch错误提示
    //if(err instanceof TypeError)     //异常类型，基类型Error，EvalError，RangeError，ReferenceError，SyntaxError，TypeError，URIError
    printf("异常："+err);
    console.log("log将消息记录到控制台");  //将消息打印到控制台，在工具开发者选项中。Console菜单下。error打印错误消息，info打印信息消息，log打印一般消息，warn打印警告消息
}
finally {
    printf("始终要运行的语句");
}


// ================
function printf(str){
    //var hint =  document.getElementById("hint2");  //根据id获取元素，document是一个文件节点，因此document可以替换成某个节点，
    //var hint =  document.getElementsByName("tity")[2];  //getElementsByName根据name获取元素集合，通过[]获取元素
    //var hint = document.body.children[0].children[2]; //获取body的第一个子节点的第三个子节点。有时注释也会被当成一个节点
    //document.anchors包含带name的所有a，document.forms所有form，document.images所有img，document.links所有带href的a
    //var hint =  document.getElementsByTagName("label")[2];  //getElementsByTagName根据元素类型获取元素集合，通过[]获取元素。参数可以为"*"表示全部元素，[]内可以是元素name。因为返回的是hash集合
    var hint = document.getElementsByClassName("hintclass")[0];//可以添加多个类名
    hint.innerText += str.toString()+"\n";  //设置label显示的文字，也可以自动调用其他js文件中的hint变量
}

printf("===========DOM文档信息===========");
var docinf={};
docinf["html"]=document.documentElement;   //document表示对文件的引用。
docinf["title"]=document.title;//获取标题节点，可设置标题
docinf["body"]=document.body;//获取body节点
docinf["url"]=document.URL;  //网址
docinf["domain"]=document.domain;  //域名，可设置
docinf["referrer"]=document.referrer;  //来源页面的url
printf(JSON.stringify(docinf));
//writeln写入h5代码并添加换行。document.write在文件加载期间写入内容，在文件加载后写入会重写全部文件。
document.write("<script type='text/javascript' src='index3.js'>"+"</script>");  //write写入h5代码(动态加载js代码index3.js，若在<script>添加内部<script><\/script>)

printf("===========DOM元素节点信息===========");
var elementinfo={};
var hint =  document.getElementById("hint2");
elementinfo["tagName"] =hint.tagName;  //元素标签名，nodename也是获取节点标签名
elementinfo["id"] =hint.id;  //唯一标识符，可修改，修改透明
elementinfo["className"] =hint.className;//特性名称，可修改，修改立即可见
elementinfo["title"] =hint.title;//元素说明，可修改，鼠标经过可见
elementinfo["lang"] =hint.lang;//语言，可修改，修改透明
elementinfo["dir"] =hint.dir;//方向，可修改，属性重写可见
hint.setAttribute("myname",hint.dataset.myname);//setAttribute设置或创建属性。自带属性也可以直接赋值hint.id="xxxx"。dataset元素的数据属性
elementinfo["myname"] =hint.getAttribute("myname");//getAttribute获取自定义属性，也可以获取自带属性
printf(JSON.stringify(elementinfo));
hint.removeAttribute("myatt"); //删除属性

printf("===========DOM元素节点操作===========");  //元素是一种节点。注意区分
//动态创建布局元素
hint3 = document.createElement("label");  //创建元素，传入标签名，元素节点类型值为1
//label = document.createElement("<label class='hintclass' style='background-color: #123456;' id='hint3' name='tity'></label>");  //创建元素，传入h5代码
//label = document.getElementById("hint2").cloneNode("true");//也可以使用cloneNode复制节点，参数为true表示深层复制，即复制节点内部子节点，false表示浅复制
hint3.id = "hint3";
hint3.className = "hintclass";
hint3.setAttribute("name","tity");
hint3.style.background="#123456";//
var computedstyle = document.defaultView.getComputedStyle(hint3,null);//获取元素计算后样式，只读对象，不能通过此对象进行设置
printf(JSON.stringify(computedstyle));  //包含了所有样式属性
printf(hint3.style.cssText); //style是通过style设置的，cssText样式的字符串表示，length样式属性的长度，[index]或者item(index)给定位置的样式属性名，getPropertyValue(propertyName)给定属性名的属性值，removeProperty删除属性
//appendChild在父元素内部末尾添加子元素，insertBefore在指定子元素前添加子元素，replaceChild替换子元素
if(!hintdiv.contains(hint3))//contains判断元素是否包含子元素
    hintdiv.appendChild(hint3); //在末尾添加子节点
//子节点可能是元素，文本节点，注释或者处理指令，不同的浏览器看待不同
hint3 =hintdiv.removeChild(hintdiv.lastChild);//removeChild删除子节点，lastChild最后一个子节点，firstChild第一个子节点
var hint1=hintdiv.children[1];//childNodes父节点的子节点集合,parentNode获取节点的父节点。children表示子元素集合
var hint2=hint1.nextElementSibling;//nextSibling获取下一个兄弟节点，previousSBiling获得上一个兄弟节点,nextElementSibling下一个同辈元素,previousElementSibling前一个同辈元素
label = hintdiv.insertBefore(hint3,hint2.nextElementSibling);//hint2.nextSibling为空，因为最后一个子节点的下一个兄弟节点和第一个节点的上一个兄弟节点均为空。参数为空，表示在末尾插入节点。

//动态加载脚本文件和内嵌脚本
var script = document.createElement("script");
script.type="text/javascript";
script.src = "index4.js";
//script.text = "function sayHi(){printf('动态加载内嵌脚本';)}"
document.body.appendChild(script);


//动态创建样式文件
var link = document.createElement("link");
link.rel = "stylesheet";
link.type="text/css";
link.href="index.css";
//script.text = "function sayHi(){printf('动态加载内嵌脚本';)}"
document.head.appendChild(link);  //样式文件是添加到head中，不是body中
//动态添加内嵌样式
var style = document.createElement("style");
style.type = "text/css";
try{
  style.appendChild(document.createTextNode("body{background:red}"));  //非IE浏览器
}catch (err){
  style.stylesheet.cssText  ="body{background:red}";  //IE浏览器
}
document.head.appendChild(style);//document.head在chrome和safari5中包含。属于后添加的css样式，会覆盖重复样式

printf("===========DOM文本节点等===========");//另外还有注释节点、属性节点、文档类型、CDATA区域和文档片段等一系列，不是只有元素才是节点
//文本节点(类型为3)父节点为元素，没有子节点。元素、文本都是节点的一种。文本节点的节点类型值为3
var textnode = document.createTextNode("<strong>hello</strong>world\r\n");//可以是h5格式的文本，也可以直接为字符串
hint2 = document.getElementById("hint2");
hint2.appendChild(textnode);//将本文节点添加到元素中
textnode.appendData(textnode.nodeValue);//nodeValue文本节点所包含的文本，appendData添加文本。deleteData(offset,count)删除，insertData(offset,text)插入，replaceData(offset,count,text)替换，splitText分割文本节点



printf("===========DOM扩展===========");
var body = document.querySelector("body");  //取得标签类别获取元素
var mydiv = document.querySelector("#hintdiv"); //根据id获取元素
var hint2 = document.querySelector(".hintclass");  //根据类class获取匹配的第一个元素。通过文档document查询，在整个文档范围内查询。
hint2 = mydiv.querySelector("label.hintclass");//根据元素类别和类名获取元素。通过元素Element查询，在元素之后查询。
var hintarr = document.querySelectorAll("div label");  //querySelectorAll查询匹配的全部元素。获得div中的label元素
if(hint2==hintarr[2])
    printf("同一个元素");

hint2.classList.toggle("user");  //classList元素样式类控制，add添加样式，contain是否包含，remove去除，toggle添加或删除。也可以通过className设置类字符串
hint2.focus();//focus使元素获取节点。document.actuveElement获取当前聚焦元素，文档加载完毕后，聚焦元素由null转为body，hasFocus判断元素是否聚焦。浏览器会自动滚动至聚焦元素
printf(hintdiv.outerHTML.replace(hintdiv.innerHTML,""));//outerHTML获取和设置元素及其所有子元素字符串表示//innerHTML获取和设置元素的所有子元素字符串表示,innerText用于获取元素中的夹杂文本，outerText用于替换子元素成文本节点。不是标准的h5
hintdiv.insertAdjacentHTML("beforeend","<strong>hello</strong> world");//添加了三个节点，<strong>元素、hello、world两个文本节点。
//insertAdjacentHTML插入元素。beforebegin在元素前插入一个兄弟元素，afterbegin在元素下首部插入子元素，beforeend在元素下尾部插入子元素，afterend在元素后插入兄弟元素
hintdiv1.scrollIntoView();//使元素滚动至视口中，不传参数或传入true，保持顶部对齐，传入false保持底部对齐。

printf("===========DOM2  DOM3===========");
style = document.getElementsByTagName("style")[0];  //获取第一个style元素
var sheet = style.sheet||style.styleSheet;  //通过link或style元素获取样式对象。IE浏览器支持styleSheet获取样式表，其他浏览器支持sheet获取样式表CSSStyleSheet对象
if(document.styleSheets[document.styleSheets.length-2]==sheet);  //document.styleSheets应用到文档的所有样式表，css文件中每个样式算一个样式表，h5中每个style元素算一个样式表。
    printf(JSON.stringify(sheet));

var rules = sheet.cssRules || sheet.rules;   //根据样式表，获取规则列表。因为一个样式表可能有多个规则。
var rule = rules[1];//获取第2个规则。即hint1的样式，每个规则有多个样式属性
printf(rule.style.cssText);  //与元素的style.cssText类似，不过规则cssText不能重写
rule.style.color = "black";  //修改样式规则，添加样式属性
sheet.insertRule("#hint{color: #883456}",0);//动态添加样式规则，第一个参数为规则为字符串，第二个参数为规则数组索引,IE使用addRule。删除规则使用deleteRule或removeRule
printf(hint2.scrollWidth);  //即html的包含滚动内容的大小，元素属性//scrollHeight、scrollWidth包含滚动内容的大小,scrollTop滚动高度，scrollLeft滚动左偏移，属性可读取和设置
printf(hint2.clientHeight); //clientWidth和clientHeight包括内边距，但不包括边框
printf(hint2.offsetHeight);//offsetLeft、offsetTop、offsetHeight(包括边框，内边距)、offsetWidth、offsetParent
printf(JSON.stringify(hint2.getBoundingClientRect()));//返回元素的位置矩阵，包含left、top、right、bottom属性

printf("===========遍历===========");
if(document.implementation.hasFeature("Traversal","2.0"))   //检查浏览器某项功能能力
{
    var filter = function(node){   //设置查询过滤器
        return node.tagName.toLowerCase()=="label"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;  //在TreeWalker中还有NodeFilter.FILTER_REJECT表示跳过该节点及该节点的子节点
    };
    var iterator = document.createNodeIterator(hintdiv,NodeFilter.SHOW_ELEMENT,filter,false);  //创建NodeIterator迭代器。参数：查询根节点，查询节点，过滤器。NodeFilter.SHOW_ELEMENT为查询节点类型为元素节点，可以使用|包含多种查询节点类型，
    var node = iterator.nextNode();   //第一个节点，
    while(node!=null){  //最后一个节点的后续节点为null，第一个节点的前序节点为null
        printf(node.id);
        node = iterator.nextNode();  //向后迭代，previousNode向前迭代
    }
    iterator = document.createTreeWalker(hintdiv,NodeFilter.SHOW_ELEMENT,filter,false);  //创建TreeWalker迭代器，迭代器包含nextNode、previousNode、parentNode、firstChild、lastChild、nextSibling、previousSibling等方法
}
//范围
var range = document.createRange();  //创建一个节点范围
range.selectNodeContents(hintdiv);  //selectNode方法包含节点和子节点，selectNodeContents只包含子节点
printf(range.startContainer.id);//startContainer范围中首节点的父节点，startOffset首节点在父节点中的偏移，endContainer尾节点的父节点，endOffset尾节点在父节点中的偏移。
range.setStart(hintdiv,0);//也可以通过setStart和setEnd设置范围。setStart的参数为startContainer和startOffset
range.setStartBefore(hintdiv.lastChild);//也可以通过setStartBefore，setStartAfter，setEndBefore、setEndAfter设置。这里获取hintdiv的最后一个节点，即上面代码添加的world文本节点
printf(range.toString());//打印范围的字符串表示 world
var fragment = range.extractContents();  //提取范围成文档片段，range.deleteContents删除文档，range.cloneContents复制文档
hintdiv.appendChild(fragment);//添加文档片段。
range.detach();range=null;  //清理DOM范围，var newRange = range.cloneRange可以复制DOM范围



// =============

function printf(str){
    var hint =  document.getElementById("hint3");  //根据id获取元素，document是一个文件节点，因此document可以替换成某个节点，
    hint.innerText += str.toString()+"\n";  //设置label显示的文字，也可以自动调用其他js文件中的hint变量
}
printf("===========事件绑定===========");
//时间可以在h5代码中直接添加也可以在js代码中添加
var input1=document.getElementById("input1");
input1.onclick = function(event){   //事件也是元素对象的方法属性，可以直接设置和调用input1.onclick(),删除input1.onclick=null;
    alert("又点击了"+event.type);  //event事件对象，包含属性bubbles是否冒泡，currentTarget事件执行元素，等价于this，target事件的目标，触发事件的元素(引起事件的元素)。因为一个事件会向上冒泡
    event.stopPropagation();  //阻止事件传播，不会继续捕获或冒泡，但是本元素绑定的其他事件会继续执行，preventDefault取消事件默认行为。eventPhase表示事件的阶段，捕获阶段为1，目标对象上为2，冒泡阶段为3
};
input1.addEventListener("click",function(event){alert("又又点击了"+event.target.id)},true);  //参数：事件类型，函数引用，false表示冒泡段执行，true表示捕获段执行。addEventListener函数也可以为元素添加事件,不覆盖已有事件。removeEventListener删除事件，删除了必须和添加时是相同的函数引用。(本句中的匿名函数无法删除)
//IE浏览器使用attachEvent何detachEvent设置事件
//IE浏览器中event = window.event，

printf("===========事件类型===========");
//UI事件：load加载完成事件 unload卸载完成事件，abort取消事件，error错误事件，resize大小变化事件，select文本框选择事件，scroll元素滚动条滚动事件
//焦点事件：blur失去焦点，focus获得焦点(不冒泡)，focusin获得焦点(冒泡)，focusout失去焦点。（执行顺序：原元素失去焦点focusout，新元素获取焦点focusin，原元素失去焦点blur，新元素获得焦点focus）

//鼠标事件：click点击事件、dblclivk双击事件，mousedown按下鼠标事件，mouseenter鼠标进入事件(不冒泡，进入子元素不触发)，mouseleave鼠标离开事件(不冒泡，进入子元素不触发)，mousemove鼠标元素内移动事件，mouseout鼠标离开事件，mouseover鼠标经过事件，mouseup鼠标弹起事件。//双击的执行顺序：按下、弹起、点击、按下、弹起、点击、双击
//鼠标事件信息：event.button鼠标按钮信息。event.clientX表示点击点在视口的位置，event.pageX表示在页面中的位置(视口+滚轮)，event.screenX表示屏幕位置，event.shiftKey表示修改键shift是否按下(shift、ctrl、alt、meta键(windows键或cmd键))。event.relatedTarget相关元素，在鼠标跨元素移动时的关联元素
//滚轮事件：mousewheel冒泡到window对象，event.wheelDelta存储滚动量

//键盘与文本事件：keydown按任意键事件，长按重复触发，keypress按字符键事件(影响文本的键，删除键触发)，长按重复触发，keyup释放键事件。textInput文本输入事件(实际字符键，删除键不触发)，显示之前触发。触发顺序：keydown、keypress、textInput、keyup
//键盘事件信息：event.keyCode键盘码，event.charCode字符ASCII码，有些浏览器还支持key、keyIdentifier、char属性
//文本事件信息：event.data用户输入的字符，event.inputMethod文本输入方式(键盘，粘贴，拖放，语音...)


//DOM结构变化事件：DOMNodeRemoved事件，在removeChild和replaceChild删除节点前触发，会冒泡，event.target为被删除的节点，event.relatedNode为目标节点的父节点，
//DOM结构变化事件：DOMNodeInserted事件，在appendChild、replaceChild、insertBefore插入节点后触发，会冒泡，event.target为被插入的节点，event.relatedNode为目标节点的父节点，
//DOMNodeRemoved删除节点前触发，DOMNodeInserted在一个节点作为子节点插入到另一个节点时触发。DOMAttrModified元素属性被修改后触发，DOMNodeInsertedIntoDocument节点直接或间接被插入文档后触发(不冒泡)。DOMNodeRemovedFromDocument节点直接或间接被删除前触发(不冒泡)。DOMSubtreeModified结构改变均触发，最后执行
//删除插入节点执行顺序：目标节点执行DOMNodeRemoved(冒泡)，目标节点执行DOMNodeRemovedFromDocument(不冒泡)，目标节点在所有子节点执行DOMNodeRemovedFromDocument(不冒泡)，目标节点父节点执行DOMSubtreeModified(不冒泡)


//h5事件：contextmenu右键菜单事件(取消默认，获取位置，显示自定义菜单，左键单击隐藏菜单事件)。
//window事件beforeunload页面卸载前事件，DOMContentLoaded事件DOM树形成后触发，load事件资源文件全部下载完成后触发
//window事件hashchange，网址#后的所有字符串发生变化触发。触发后用location查询当前参数列表


//剪切板事件


//设备事件：orientationchange屏幕旋转事件，MozOrientation(deviceorientation)方向旋转事件，devicemotion移动事件，
//触摸事件，手势事件



//为节省内存，优化性能，对子元素含有较多冒泡事件的节点上，可以设置总事件，总事件中eventTarget获取目标子元素执行相应函数，进而取消子元素的事件节省内存。
//innerHTML删除子元素前要取消子元素绑定事件，节省内存


printf("===========事件模拟===========");


//window.addEventListener("beforunload",function(event){event.returnValue = "确认关闭么？";return "确认关闭么";});



function printf(str){
    var hint =  document.getElementById("hint2");  //根据id获取元素，document是一个文件节点，因此document可以替换成某个节点，
    hint.innerText += str.toString()+"\n";  //设置label显示的文字，也可以自动调用其他js文件中的hint变量
}
printf("===========表单脚本===========");
myform = document.getElementById("myform");
//acceptCharset服务器能够处理的字符集，action请求地址，elements表单字段input集合，enctype请求的编码类型，length表单控件数量，method请求方式，name名称，reset()表单恢复默认值，submit()表单提交，提交前触发，target请求发送和接收相应的窗口名称
//表单字段共有属性：disabled是否可用，form字段所属表单，name字段名称，readOnly是否只读，tabIndex字段切换序号，type字段类型(控件类型)，value字段的值，checkValidity字段是否有效
//表单字段共有方法：focus聚焦，blur失去焦点函数，
text1.onkeyup = function(event){
    var target = event.target; //获取事件目标元素，也就是this
    if(target.value.length == target.maxLength) {  //value字段的值，maxLength属性
        var form = target.form;  //form目标所属表单
        if(form.elements[1] && !form.elements[1].readOnly){  //elements表单元素集合，readOnly字段属性
            form.elements[1].focus();  //focus字段函数-聚焦
            form.reset();  //表单函数-恢复默认
        }
    }
};
//文件脚本
myfile = document.getElementById("myfile");
myfile.onchange = function(event){
    var files = event.target.files;
    var reader = new FileReader();  //异步读取文件
    var type = "default";
    if(/image/.test(files[0].type)){ //test判断是否匹配，"名称"：files[0].name，"类型"：files[0].type，"大小"：files[0].size
        type  = "image";
        reader.readAsDataURL(files[0]);  //readAsdataURL读取文件已数据URL的形式保存，readAsText以纯文本形式读取指定编码形式文件，readAsBinaryString读取文件成字符串，readAsArrayBuffer读取文件成数组
    }else{
        reader.readAsText(files[0]);
        type="text";
    }
    reader.onerror = function(){alert("读取文件出错"+reader.error.code);};
    reader.onprogress = function(event){   //每50ms更新一次进度
        if(event.lengthComputable)
            var rate = event.loaded/event.total;
        alert("加载比例"+rate);
    };
    reader.onload=function(){
        switch (type){
            case "image":hintdiv.insertAdjacentHTML("beforeend","<img src='"+reader.result+"'>");break;
            case "text":hintdiv.insertAdjacentHTML("beforeend",reader.result);break;
        }
    };
};

//文本框脚本
text1 = document.getElementById("text1");
text1.select();//text和textarea文本内容被全部选择，会自动聚焦
text1.setSelectionRange(1,4);  //选择部分文本，参数为起点和终点索引，会选中包含起点，但不包含终点的文本
printf(text1.value.substring(text1.selectionStart,text1.selectionEnd-1));  //selectionStart选择的文本的起点，selectionEnd选择的文本的终点


//选择框脚本
//选择框属性：add(newoption,reloption)，multiple是否允许多选,options选项元素合集，remove(index)删除选项，selectedIndex选中项索引，size选中框可见行数
//选项属性：index选项索引，label选项标签，selected是否被选中，text选项的文本，value选项的value值，
var myselect = document.getElementById("myselect");
var newoption = document.createElement("option");//创建选项元素
newoption.appendChild(document.createTextNode("第3个选项"));  //选项添加文本
newoption.setAttribute("value","myoption3");//选项添加value
myselect.appendChild(newoption);  //添加选项
newoption = new Option("第4个选项","myoption4");  //创建选项元素
myselect.appendChild(newoption);  //插入新选项
newoption = new Option("第5个选项","myoption5");  //创建选项元素
myselect.add(newoption,undefined);  //插入新选项
myselect.removeChild(myselect.options[0]);  //options选项合集，removeChild删除子元素
myselect.remove(0);//删除第一个选项，
myselect.options[0]=null;//删除第一个选项，
myselect.insertBefore(myselect.options[1],myselect.options[0]); //调换选项位置
myselect.options[1].selected=true;  //设置第二个选项被选中
var selectoption = myselect.options[myselect.selectedIndex];//selectedIndex当前选中项索引
printf(selectoption.text+selectoption.value);




printf("===========canvas绘图===========");
var mycanvas = document.getElementById("mycanvas");
if(mycanvas.getContext){  //判断浏览器是否支持
    var context = mycanvas.getContext("2d");//context是画布，getContext获取绘图上下文对象，也有名为WebGL的3d上下文
    //绘制矩形
    context.fillStyle = "#0000ff";  //填充颜色
    context.fillRect(10,10,70,70);  //填充矩形，xy宽高(像素)
    context.lineWidth = 20; //边框宽度
    context.lineCap = "round";//线条末端形状，butt平头，round圆头，square方头，
    context.lineJoin = "round";//线条交叉方式，round圆交，bevel斜交，miter斜接
    context.strokeStyle = "red"; //描边颜色
    context.strokeRect(50,50,50,50);//描边矩形
    context.clearRect(50,50,20,20);  //清除一块矩形区域
    //绘制路径
    context.beginPath();  //创建路径
    context.arc(200,100,20,0,2*Math.PI,false);//绘制圆参数：圆心坐标，半径，起始角度，是否顺时针。 arcTo绘制圆弧
    context.moveTo(200,100);  //移动绘图游标
    context.lineTo(200,15);  //绘制直线，从游标位置惠子直线到参数，bezierCurveTo绘制曲线，quadraticCurveTo绘制二次曲线，reac绘制矩形，
    context.fillStyle = "rgba(0,0,0,1)"
    context.stroke();//用strokeStyle描边
    context.fill(); //用fillStyle填充

    //绘制文本
    context.font = "bold 14px Arial";  //设置文本样式，大小，字体
    context.textAlign="center";//文本对齐方式，start、end
    context.textBaseline = "middle";//上下对齐方式，top、middle、bottom
    context.fillText("文本",200,15);  //fillText使用fillStyle，strokeText使用strokeStyle
    context.globalAlpha =0.5;  //设置全局透明度
    //context.save();  //保存当前状态
    context.translate(10,10);  //坐标平移，transform矩阵变换，setTransform先恢复默认再矩阵变换
    context.rotate(1);//旋转角度，scale缩放比例，

    //drawImage绘制图像
    //shadowColor、shadowOffsetX、shadowOffsetY、shadowBlur阴影
    //createLinearGradient渐变
    //createPattern填充描边模式
    //getImageData获取图像数据
    var imgurl = mycanvas.toDataURL("image/png");
    var image = document.createElement("img");
    image.src = imgurl;
    hintdiv1.appendChild(image);

    //WebGL绘图3D
}

// ========




function printf(str){
    var hint =  document.getElementById("hint3");  //根据id获取元素，document是一个文件节点，因此document可以替换成某个节点，
    hint.innerText += str.toString()+"\n";  //设置label显示的文字，也可以自动调用其他js文件中的hint变量
}
printf("===========XML,E4X===========");

printf("===========JSON===========");
var person0={name:"person0",age:11};  //定义js对象
var person1 = {"name":"person1","age":12,toJSON:function(){return this.name;}};  //定义一个JSON数据结构下的对象，与js对象的对象字面量的区别在于属性必须加引号
var person2 = {"name":"person2","age":13,"school":{"name":"school1","age":122}};  //JSON中对象可以嵌套。key和value内用:连接，不同key-value用,连接，最后一个value后不加符号。每个JSON对象使用{}包含
var persons = [person0,person1,person2];  //JSON中对象数组
persons[2].age=person0.age;  //JSON中数组对象与js对象使用方法相同
var personstr = JSON.stringify(persons);  //JSON.stringify将对象(正常的或JSON数据结构下的)转化为JSON字符串(称为序列化)。可以序列化对象或对象数组。会自动滤出值为underfined的属性
printf(personstr);   //调用stringify，执行顺序：toJSON虚函数或对象本身，函数过滤器，存在属性进行序列化，缩进参数进行格式化
person2str =JSON.stringify(person2,["name","age"],"--");  //第二个参数是过滤器，表示只保留name和age两个属性。第三个参数是换行缩进，可为数字缩进空格数目，最大缩进为10，可为字符串，表示缩进字符串
printf(person2str);
/*personstr = JSON.stringify(person2,function(key,value){  //使用函数为过滤器
   if(key=="name"||key=="age")
        return value;
    else
        return undefined;  //返回undefined就不会再被序列化
},4);//由于在label元素中连续空格会被自动缩减成一个空格*/
persons = JSON.parse(personstr);  //JSON.parse将字符串转化为js对象或数组
/*
person2 = JSON.parse(person2str,function(key,value){  //使用函数控制转化操作
  if(key=="name") return "family"+value;
    else return value;
});
*/



printf("===========AJAX请求与Comet推送===========");
//请求
var xhr = new XMLHttpRequest();  //创建XHR对象
xhr.onreadystatechange=function(){//onreadystatechange状态变化函数，
    printf("readstate="+xhr.readyState.toString());//readyState的取值0为未初始化，未调用open，1已open未send，2已send未回复，3回复部分，4全部回复
    if(xhr.readyState==3)   //在后台使用推送机制的话，前端会间断的收到推送数据，状态为3。
        printf(xhr.responseText);  //responseText包含曾经的所有推送数据，所以每次读取应该根据旧数据长度查找最新的数据的位置。这里省略了
};
xhr.onload=function(){printf("接收响应完成");};  //响应完成事件，无论什么响应，接收完成就触发
//xhr.onerror=function(){printf("响应出错");};  //响应出错事件
xhr.onprogress=function(event){  //进度事件
    if(event.lengthComputable){  //lengthComputable表示进度信息是否可用
        printf("进度"+event.position*1.0/event.totalSize);  //position表示已接收数，totalSize表示预期接收数
    }
};
xhr.open("get","example.php?qunid=12",false);  //opet准备启动请求，参数：请求类型post或get，请求地址，是否异步发送。同步的话会等待程序返回方可继续
xhr.setRequestHeader("myheader","myvalue");  //自定义头部信息，发送自定义信息
xhr.send(null); //发送请求，如果是同步，会直到响应完毕才会继续运行。参数：请求主体。xhr.abort()取消异步请求
if((xhr.status>200 && xhr.status<300)|| xhr.status==304)
{
    printf(xhr.responseText);  //responseText返回数据，responseXML在响应类型为text/xml和application/xml时返回XML的响应数据
    printf(xhr.getResponseHeader("myback"));  //读取服务器返回在自定义头部信息
    printf(xhr.getAllResponseHeaders());  //返回所有信息
}
else printf("失败："+xhr.status);//statusText表示HTTP状态描述，各浏览器不同

//请求数据序列化
var data = new FormData();   //序列化表单new FormData(myform)，参数可以为空，即空的对象
data.append("qunid","21");  //添加键值对
//data.append("file1",files[0]);  //可以在包含file的表单中直接添加文件
//xhr.timeout=1000;  //响应超时，仅IE8+支持
xhr.ontimeout = function(){printf("响应超时")};
xhr.open("post","example.php",true);
xhr.send(data);  //发送序列化数据

//推送（SSE）：长轮训，短轮训，http流(响应事件的MIME类型为text/event-stream)，
// 在接收推送数据时可以使用onreadystatechange函数中readyState=3时读取responseText
var source = new EventSource("myevent.php");  //参数：入口点。必须与创建对象的页面同源(url模式，域、端口)。连接断开会自动建立,或者使用source.close()强制断开
source.onmessage = function(event){  //open在连接建立时触发，message在接收到新数据时触发，error在无法建立连接时触发
    printf(event.data);  //推送数据保存在event.data中
};
source.onerror=function(){printf("连接失败");printf("连接状态"+source.readyState)};  //readyState属性0表示正在连接，1表示打开了链接，2表示关闭了链接

//web sockets使用自定义协议，需要专门服务器支持。
/*var socket = new WebSocket("ws://www.example.com/server.php");  //未加密的链接不使用http，而是ws，加密的使用wss
socket.send("hello world");  //发送数据
socket.onmessage=function(event){  //web socket有open、error、close事件
    printf(event.data);
    printf(socket.readyState);  //0表示正在建立，1已经建立，2正在关闭，3已经关闭
};*/




printf("===========离线应用与客户端存储===========");
if(navigator.onLine)  //检测离线还是在线。也可以通过window事件online和offline设置离线或在线。chrome11-即之前的版本始终为true
    printf("当前处于在线状态");
else printf("当前处于离线状态");

//cookie集成自定义类。cookie会在每次请求绑定网址的时候添加到http头部。
var CookieUtil = {
  get:function(name){
      var  cookiename = encodeURIComponent(name)+"=",cookiestart = document.cookie.indexOf(cookiename),cookievalue = null;
      if(cookiestart>-1){
          var cookieend = document.cookie.indexOf(";",cookiestart);
          if(cookieend==-1) cookieend = document.cookie.length;
          cookievalue = decodeURIComponent(document.cookie.substring(cookiestart+cookiename.length,cookieend));
      }
      return cookievalue;
  },
    set:function(name,value,expires,path,domain,sexure){
        var cookietext = encodeURIComponent(name)+"="+encodeURIComponent(value);
        if(expires instanceof  Date) cookietext+="; expires="+expires.toGMTString();
        if(path) cookietext+="; path="+path;
        if(domain) cookietext+="; domain="+domain;
        if(sexure) cookietext+="; secure";
        document.cookie = cookietext;
    },
    unset:function(name,path,domain,secure){
        this.set(name,"",new Date(0),path,domain,secure);
    }
};
CookieUtil.set("name","luanpeng","/books/projs/","www.example.com",new Date("January 1,2020"));//添加设置
CookieUtil.get("name");//读取
CookieUtil.unset("name","/books/projs/","www.example.com");  //删除

printf("===========storage存储===========")
//sessionstorage保存到浏览器关闭
 sessionStorage.setItem("name","luanpeng");  //添加设置存储key-value
sessionStorage.age = 12;  //读取设置数据
for(var key in sessionStorage)//key函数迭代属性
    printf(sessionStorage.getItem(key));//getItem读取属性值
delete  sessionStorage.name;
sessionStorage.removeItem("age");


//localstorage同一个对象访问必须域名相同。数据保留至用户删除或清除缓存
localStorage.setItem("name","luanpeng");  //添加设置属性
localStorage.age = 12;  //添加设置
printf(localStorage.getItem("age"));  //读取
printf(localStorage.name);  //读取

