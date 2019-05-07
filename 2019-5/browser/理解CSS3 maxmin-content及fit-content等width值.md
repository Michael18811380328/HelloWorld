## 理解CSS3 max/min-content及fit-content等width值

这篇文章发布于 2016年05月20日，星期五，02:06，归类于 [CSS相关](https://www.zhangxinxu.com/wordpress/category/css/)。 阅读 59858 次, 今日 3 次 [39 条评论](https://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/#comments)

by [zhangxinxu](https://www.zhangxinxu.com/) from [https://www.zhangxinxu.com](https://www.zhangxinxu.com/)
本文地址：https://www.zhangxinxu.com/wordpress/?p=5392

### 一、为何要蹦出这些新玩意？

在CSS3的世界里，`width`属性又多了几个关键字成员，`fill-available`, `max-content`, `min-content`, 以及`fit-content`。

想必很多小伙伴都没见过。不知大家有没有跟我一样的感觉，去厕所蹲了个大号，再回到办公室就会遇到之前没见过的前端新特性。

像我这种只学HTML和CSS都有些应接不暇，我想，那些CSS3, HTML5, ES6/ES7, React, Angular, bootstrap, postcss, node都会的小伙伴，应该每天都只睡3-4个小时吧，好厉害！

凡是存在就有其道理。那为何规范里要给稀松常见的`width`属性加几个关键字呢？

大家说我是先讲各个属性值表示的含义，还是先讲讲为什么要弄这些新属性值呢？

一番深思熟虑，我决定……先讲讲[兼容性](https://caniuse.com/intrinsic-width/embed)……![img](https://mat1.gtimg.com/www/mb/images/face/13.gif)

![宽度尺寸兼容性](https://image.zhangxinxu.com/image/blog/201801/2018-01-10_004814.png)

基本上，移动端已经可以愉快地使用了。![img](https://mat1.gtimg.com/www/mb/images/face/99.gif)

据我测试，目前还离不开私有前缀，例如：

```
.min-content {
    width: -webkit-min-content;
    width: -moz-min-content;
    width: min-content;    
}
```

好了，要开始往深的地方讲了。

虽然，作为名词`fill-available`, `max-content`, `min-content`, 以及`fit-content`都是新鲜面孔，但是，实际上，在CSS2.1的时候，就有类似的尺寸概念……

### 二、CSS2.1的尺寸体系

在CSS2.1的世界中，常见的尺寸分为这几类：
**1. 充分利用可用空间**
例如，一些`div`元素默认宽度100%父元素，这种充分利用可用空间的行为就称为“`fill-available`”。

**2. 收缩与包裹**
典型代表就是浮动，绝对定位以及`inline-block`，英文称为“shrink-to-fit”，直译为“收缩到合适”，这种直译往往都是不准确的，这种行为表现确实很难描述，有些只可意会不能言传的感觉，而我自己一直以“包裹性”作为理解。在CSS3中有个专有的关键名称，`fit-content`.

**3. 收缩到最小**
这个基本上就出现在`table-layout`为`auto`的表格中，想必有经验的小伙伴一定见过下面这样一柱擎天的盛况的吧！

![表格一柱擎天截图示意](https://image.zhangxinxu.com/image/blog/201605/2016-05-19_231505.png)

大家空间都不够的时候，文字能断的就断，中文是随便断的，英文单词不能断。于是乎，第一列被无情地每个字都断掉，形成一柱擎天。这种行为称之为“preferred minimum width”或者“minimum content width”。

也就是本文的重点角色之一`min-content`，换了一个更加规范好听的名字了。实际上，大家也看到了，`min-content`这种尺寸特性，`display:table-cell`实际上就有，但是，由于没有明确的名词或概念，大家都不知道，都是稀里糊涂有此表现，究其根本就不清楚了。

**4. 超出容器限制**
上面1~3情况，除非有明确的`width`相关设置，否则尺寸都不会主动超过容器宽度的，但是，存在一些特殊情况，例如，连续的英文数字，好长好长；或者内联元素被设置了`white-space:nowrap`，则表现为一江春水向东流。

例如下面：

```
.box {
    display: inline-block;
    width: 100px; height: 20px; 
    padding: 10px;
    background-color: #f0f3f9;
    white-space: nowrap;
}
```

*尺寸主动超过容器宽度，恰如一江春水向东流。*

`max-content`的表现与之有些类似，具有收缩特性，同时最大内容宽度。

// ——— 有必要来根低调的分隔线 ———-

好了，至此，大家会发现，`fill-available`, `max-content`, `min-content`, 以及`fit-content`确实在CSS2.1的时候，就有类似概念。

下面问题来了，既然CSS2.1这些特性都有了，那还要额外弄一些新值过来干嘛呢？岂不是白白增加学习成本啊？

我认为有3个好处：

1. 方便某些布局的实现；
2. **最重要的作用：** 在原有的display水平不变的情况下拥有元素其他display值才有的特性！
3. 让整个CSS世界的size体系更加直观和完善；

我们下面不妨一边了解下各个`width`值的作用和表现，一边验证我上面所说的好处！

### 三、理解width:fill-available

`width:fill-available`比较好理解，比方说，我们在页面中扔一个没有其他样式的`<div>`元素，则，此时，该`<div>`元素的`width`表现就是`fill-available`自动填满剩余的空间。也就是我们平常所说的盒模型的`margin`,`border`,`padding`的尺寸填充。

出现`fill-available`关键字值的价值在于，我们可以让元素的100%自动填充特性不仅仅在`block`水平元素上，其他元素，例如，我们一直认为的包裹收缩的`inline-block`元素上：

```
div { display:inline-block; width:fill-available; }
```

此时，元素兼具了块状元素的自动填充特性以及内联元素的定位对齐等特性。于是，（例如）我们就可以直接使用`line-height`让一个块状表现的元素垂直居中。

您可以狠狠地点击这里：[CSS3 width:fill-available下的垂直居中demo](https://www.zhangxinxu.com/study/201605/width-fill-available.html)

![块状元素尺寸表现内联元素垂直居中行为](https://image.zhangxinxu.com/image/blog/201605/2016-05-20_004332.png)

完整关键CSS代码如下：

```
.box {
    height: 200px; 
    /* 行高控制垂直居中 */
    line-height: 200px;
}
.fill-available {
    /* 元素内联，响应行高和vertical-align控制 */
    display: inline-block;
    vertical-align: middle;
    
    /* 宽度如块状元素般表现 */
    width: -webkit-fill-available;
    width: -moz-fill-available;
    width: -moz-available;    /* FireFox目前这个生效 */
    width: fill-available;
}
```

正如上面注释所提到的，FireFox浏览器下，目前(2016-05-20)不是标准的`-moz-fill-available`，而是`-moz-available`，估计过个几个版本可能会调整过来。

### 四、理解width:max-content

`max-content`的行为表现可以这么理解，假设我们的容器有足够的宽度，足够的空间，此时，所占据的宽度是就是`max-content`所表示的尺寸。

不懂没关系，我们看一个对比示例，保证立马就知道！

您可以狠狠地点击这里：[CSS3 width:max-content对比测试demo](https://www.zhangxinxu.com/study/201605/width-max-content.html)

这是一个`display:inline-block`和`width:max-content`的对比demo，如果妹子下面的文字描述短，大家是看不出区别的。但是，如果文字内容像demo所展示的这么长，嘻嘻嘻嘻~~

![周星驰 笑](https://image.zhangxinxu.com/image/blog/201605/xixi.jpg)

会发现，`width:max-content`表现得好像设置了white-space:nowrap一样，文字一马平川下去，元素的宽度也变成了这些文字一行显示的宽度！为什么会这么表现呢？定义就是这样的，对吧，我们对照下，首先，假设我们的容器有足够的空间，你想呀，容器足够空间，那下面的描述文字肯定一行显示了，此时，上面的图片和下面的文字那个内容宽度大，自然是文字啦，所谓`max-content`就是值采用宽度大的那个内容的宽度。

![max-content的表现对比示意](https://image.zhangxinxu.com/image/blog/201801/2018-01-10_005106.png)

### 五、理解width:min-content

`min-content`宽度表示的并不是内部那个宽度小就是那个宽度，而是，采用内部元素最小宽度值最大的那个元素的宽度作为最终容器的宽度。

首先，我们要明白这里的“最小宽度值”是什么意思。替换元素，例如图片的最小宽度值就是图片呈现的宽度，对于文本元素，如果全部是中文，则最小宽度值就是一个中文的宽度值；如果包含英文，因为默认英文单词不换行，所以，最小宽度可能就是里面最长的英文单词的宽度。So，大家明白的说。

还没完全弄懂没关系，我们看一个对比例子，您可以狠狠地点击这里：[CSS3 width:min-content对比demo](http://www.zhangxinxu.com/study/201605/width-min-content.html)

同样的是和`display:inline-block`做比较，`display:inline-block`虽然也具有收缩特性，但宽度随最大长度长的那一个（同时不超过可用宽度）。而`width:min-content`的最终宽度是图片和文字最小宽度值里面大的那一个。

在本例子中，图片的宽度最小值是256像素，不能再缩了；而文字的最小宽度值是字符`display:inline-`所占据的宽度，因为`inline-block`后面的`block`可以换行，中文不用谈，天生被换行的命，显然`display:inline-`所占据的宽度要远远小于256像素，因此，最终我们元素的宽度就是256像素，肉眼看到的就是自适应图片宽度的一个效果。在CSS2.1的世界里，这种效果实际上是不好实现的，要借助单元格特性。

![没有图片文字的最小宽度值](https://image.zhangxinxu.com/image/blog/201605/2016-05-20_014028.png)

下图为对比效果截图：

![min-content下的对比效果截图](https://image.zhangxinxu.com/image/blog/201801/2018-01-10_005340.png)

### 六、理解width:fit-content

`width:fit-content`也是应该比较好理解的，“shrink-to-fit”表现，换句话说，和CSS2.1中的`float`, `absolute`, `inline-block`的尺寸收缩表现是一样的。

OK，然后，有小伙伴会疑问，既然跟很多CSS声明有一样的表现，那为什么还要再弄个新东西呢？

就拿水平居中效果举例，首先浮动肯定不行，因为只有左浮动和右浮动；绝对定位压根不占据空间，普通流中根本无法应用，而`inline-block`需要父级使用`text-align:center`，而本身可能还需要`text-align:left`略烦。

而`width:fit-content`可以没有这些烦恼，因为，`width:fit-content`可以实现元素收缩效果的同时，保持原本的block水平状态，于是，就可以直接使用`margin:auto`实现元素向内自适应同时的居中效果了。

您可以狠狠地点击这里：[CSS3 width:fit-content使用与margin auto下水平居中demo](https://www.zhangxinxu.com/study/201605/width-fit-content.html)

结果，简简单单就居中了，也不要担心其他元素会跟在后面一行显示了：

![收缩表现下margin:auto居中效果](https://image.zhangxinxu.com/image/blog/201801/2018-01-10_005451.png)

### 七、结束语

CSS中的元素尺寸分为两类，一类叫做“内部尺寸”，英文写作”Intrinsic Sizing”，尺寸由内部元素决定；还有一类叫做“外部尺寸”，英文写作”Extrinsic Sizing”，宽度由外部元素决定。

考考大家：
`fill-available`, `max-content`, `min-content`, `fit-content`这4个关键字，哪个是“内部尺寸”，哪个是“外部尺寸”呢？

看本文之前难度90，看完本文之后，难度10. 如果你觉得还是很难，建议再看一遍，然后不断递归。 ![img](https://mat1.gtimg.com/www/mb/images/face/13.gif)

好了，其他废话就不多说了，感谢阅读，欢迎交流！

![img](https://mat1.gtimg.com/www/mb/images/face/14.gif)