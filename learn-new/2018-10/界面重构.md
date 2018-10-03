### 界面重构

页面重构是一种思想，页面的二次构造（在实现层次）

包括设计稿的重构、过时页面的重构、功能不全页面的重构、代码重构。 

设计稿的重构：设计稿可能不是特别符合页面效果，当拿到设计稿时需要通过二次重构和修改达到预期效果。 

功能不全页面的重构：页面功能不符合用户体验、用户交互。 

过时页面的重构：使用的是过时的代码和标签，跟不上时代的发展。 

代码重构：代码质量、SEO优化、页面性能、更好的语义化、浏览器兼容、CSS优化。 



#### CSS重构

页面重构要注意一下几点： 不滥用id,尽量用class代替id。

CSS选择器最好控制在2-3个以内，不要使用内联样式，转移到样式表中。 

根据上下结构命名id和class,而不是设计元素，避免html结构模糊化，尝试重网页中分离出设计元素，还可以减少代码的冗余。

避免css冗余和重复，能通用的写在一起。

写 css 的时候心中对 html 层级结构要有个大致的规划，思考不同的设计元素之间的层级和关系，我们规划得越清晰，最终输出的 css 也越精简。 精简单位，字体大小em，px、pt;建议用em。 

尽量向下兼容。向低端浏览器兼容。

避免无意义的、无作用的样式、元素命名等。

使用Hack负的 (margin 边距，!important等等)放在单独的hack.css中后者样式表的特定区域并注释区别于其他样式。

在必须的地方要做好注释，使用工具把css文件中的注释转换成一个合适的文档。推荐用css_doc和KSS。



#### JS重构

##### 1.自执行函数，严格模式

将当前的模块对象写在一个自执行函数内。

需要使用ES5的严格模式。

该模块需要用到的全局变量需要用入参的方式传入自执行函数，供函数内部使用。
```js
(function (global, $, doc, lsObj, zhugeSwitch, zhuge) {
    'use strict';
    /* 这里是代码 */
})(this, this.jQuery, document, lsObj, zhugeSwitch, zhuge);
```
##### 2.构造函数与原型

为当前模块对象创建一个构造函数，和他的原型。

我们将构造函数作为模块的入口函数。入口函数里通常会执行初始化变量、绑定事件等等。

```js
(function (global, $, doc, lsObj, zhugeSwitch, zhuge) {
    'use strict';
    var something = function(){

    };
    something.prototype = {
          constructor: something,
    }

})(this, this.jQuery, document, lsObj, zhugeSwitch, zhuge);
```
##### 3.选择器统一管理

将选择器对象写在类属性中。

将初始化选择器的函数写在原型中，在构造函数内调用。

```js
    var something = function(){
        this.initializeElements();  
    };
    something.Eles = {
        name: '.name',
        password: '.password',      
    };
    something.prototype = {
        initializeElements: function () {
            var eles = loginClass.Eles;
            for (var name in eles) {
                if (eles.hasOwnProperty(name)) {
                    this[name] = $(eles[name]);
                }
            }
        }   
    }
```

##### 4.事件统一管理

将事件Map统一写在构造内。

```js
    var something = function(){
        this.eventsMap = {
            'focus .name input': 'nameFocus',
            'blur .name input': 'nameBlur',
            'focus .password input': 'pswdFocus',
            'blur .password input': 'pswdBlur',
            'click .btn': 'login',
        };        
    };
```
将事件要触发的函数写进原型中。

（注意此时this的指向）
```js
  something.prototype = {
        login: function () {
            var p = this.passwordInput;
            var n = this.nameInput;
            var pt = this.pTip;
            var nt = this.nTip;
            this.nameVal = n.val().trim();
            this.passwordVal = MD5(p.val().trim());
            var nameVal = this.nameVal;
            var passwordVal = this.nameVal;
            var phoneReg = /^1\d{10}$/;
            if (nameVal == "" || nameVal == null) {
                nt.text('手机号码不能为空');
                p.val('')
            } else if (!phoneReg.test(nameVal)) {
                nt.text('您输入的手机号码不正确');
            } else if (passwordVal == '' || passwordVal == null) {
                nt.text('');
                pt.text('密码不能为空');
            } else {
                nt.text('');
                pt.text('');
                this._requestIfTelregisted();
            }
        },  
  }
```
我们会使用事件代理的方式对这些事件进行循环绑定。

在原型中书写一个扫描事件Map的函数。
```js
  something.prototype = {
        _scanEventsMap: function (maps, isOn) {
            var delegateEventSplitter = /^(\S+)\s*(.*)$/;
            var type = isOn ? 'on' : 'off';
            for (var keys in maps) {
                if (maps.hasOwnProperty(keys)) {
                    if (typeof maps[keys] === 'string') {
                        maps[keys] = this[maps[keys]].bind(this); //改变this的指向
                    }
                    var matchs = keys.match(delegateEventSplitter);
                    $('body')[type](matchs[1], matchs[2], maps[keys]);
                }
            }
        },        
  }
```
在原型中写入以下函数，优化我们的逻辑。

```js
  something.prototype = {
        initialization: function () { //初始化
            this.bindEvent();
        },
        bindEvent: function () { //绑定事件
            this.initializeOrdinaryEvent(this.eventsMap);
        },
        unbindEvent: function () { //解绑事件
            this.uninitializeOrdinaryEvent(this.eventsMap);
        },
        initializeOrdinaryEvent: function (maps) { //绑定普通事件
            this._scanEventsMap(maps, true);
        },
        uninitializeOrdinaryEvent: function (maps) { //解绑普通事件
            this._scanEventsMap(maps);
        },    
        _scanEventsMap: function (maps, isOn) { //扫描事件地图，绑定或者解绑
        },        
  }
```

在构造函数内调用初始化函数。

```js
var something = function(){
    this.initialization();        
};
```

##### 5.添加属性和方法

当前模块对象会有一些初始化参数，可以理解为我们自己定义的全局变量。我们将这些参数写进构造函数中。

```js
    var something = function(){
       this.passwordVal = null;
       this.nameVal = null;
    };
```

将其他用到的函数写入原型中。


```js
something.prototype = {
        _requestIfTelregisted: function () { // 验证手机号是否注册接口
            var _data = {
                "registNum": this.nameVal
            };
            var nt = this.nTip;
            var that = this;
            $.ajax({
                type: "GET",
                url: "/cloudlink-core-framework/login/isExist",
                contentType: "application/json",
                data: _data,
                dataType: "json",
                success: function (data, status) {
                    var res = data.rows.isExist;
                    if (res == 0) {
                        nt.text('账号未注册');
                        utils.zhugeTrackForFailed(that.nameVal,'账号未注册');
                        return false;
                    } else {
                        that._requestData();
                        return true;
                    }
                }
            });
        },
    }
```

##### 6.抽离工具类（对象）

例如：

```js
    var utils = {
        hide:function(ele){ //元素的显隐
            $(ele).addClass('hidden'); 
        },
        show:function(ele){
            $(ele).removeClass('hidden'); 
        },      
        zhugeTrackForFailed: function (tel, sRsn) { //诸葛埋点
            if (zhugeSwitch == 1) {
                zhuge.track('登陆失败', {
                    '手机号': tel,
                    '原因': sRsn
                });
            }
        },
    };
```

##### 7.执行构造函数

可以选择是否把类或new出的对象暴露出去。

~~~js
    //global.something = something; 选择是或否暴露    
    $(function() {
        global.somethingObj = new something(); //暴露出对象，供其他使用
        //new something(); 直接执行
    }); 
~~~

~~~js
//最终结构
(function (global, $, doc, lsObj, zhugeSwitch, zhuge) {
    'use strict';

    var something = function(){ 
        this.eventsMap = {
            'focus .name input': 'nameFocus',
        };
        this.initializeElements();
        this.initialization();      
    };
    
    something.Eles = {     
        password: '.password',      
    };
    
    var utils = {
        zhugeTrackForFailed: function(tel, sRsn) {
            if (zhugeSwitch == 1) {
                zhuge.track('登陆失败', {
                    '手机号': tel,
                    '原因': sRsn
                });
            }
        },      
    };
    
    something.prototype = {
        constructor: something,
        initialization: function() {
            this.bindEvent();
        },
        initializeElements: function() {
            var eles = loginClass.Eles;
            for (var name in eles) {
                if (eles.hasOwnProperty(name)) {
                    this[name] = $(eles[name]);
                }
            }
        },
        bindEvent: function() {
            this.initializeOrdinaryEvent(this.eventsMap);
        },
        unbindEvent: function() {
            this.uninitializeOrdinaryEvent(this.eventsMap);
        },
        initializeOrdinaryEvent: function(maps) {
            this._scanEventsMap(maps, true);
        },
        uninitializeOrdinaryEvent: function(maps) {
            this._scanEventsMap(maps);
        },
        _scanEventsMap: function(maps, isOn) {
            var delegateEventSplitter = /^(\S+)\s*(.*)$/;
            var type = isOn ? 'on' : 'off';
            for (var keys in maps) {
                if (maps.hasOwnProperty(keys)) {
                    if (typeof maps[keys] === 'string') {
                        maps[keys] = this[maps[keys]].bind(this);
                    }
                    var matchs = keys.match(delegateEventSplitter);
                    $('body')[type](matchs[1], matchs[2], maps[keys]);
                }
            }
        },      
        destroy: function() {
            this.unbindEvent();
        }       
    }
    //global.something = something; 选择是或否暴露
    
    $(function() {
        global.somethingObj = new something(); //暴露出对象，供其他使用
        //new something(); 直接执行
    });    
})(this, this.jQuery, document, lsObj, zhugeSwitch, zhuge);
~~~

