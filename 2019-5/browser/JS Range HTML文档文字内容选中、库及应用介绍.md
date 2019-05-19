## JS Range HTML文档/文字内容选中、库及应用介绍

这篇文章发布于 2011年04月14日，星期四，01:00，归类于 [Web综合](https://www.zhangxinxu.com/wordpress/category/web/)。 阅读 241948 次, 今日 1 次 [17 条评论](https://www.zhangxinxu.com/wordpress/2011/04/js-range-html文档文字内容选中、库及应用介绍/#comments)

by [zhangxinxu](http://www.zhangxinxu.com/) from [http://www.zhangxinxu.com](http://www.zhangxinxu.com/)
本文地址：[http://www.zhangxinxu.com/wordpress/?p=1591](http://www.zhangxinxu.com/wordpress/?p=1591)

### 一、前面的些话

本文的内容基本上是基于“区域范围对象(Range objects)”这个概念来说的。这个玩意，可以让你选择HTML文档的任意部分，并可以拿这些选择的信息做你想做的事情。其中，最常见的Range是用户用鼠标选择的内容(user selection)。

本文有不少篇幅就是讲如何将用户的这种选择转换为`W3C Range`或`Microsoft Text Range对象`。

### 二、什么是Range？

所谓”Range”，是指HTML文档中任意一段内容。一个Range的起始点和结束点位置任意，甚至起始点和结束点可以是一样的（也就是空Range）。最常见的Range是用户文本选择范围(user text selection)。当用户选择了页面上的某一段文字后，你就可以把这个选择转为Range。当然，你也可以直接用程序定义Range。

例如下面这个模样的例子：

```
2011-04-12
负责调查切尔诺贝利核事故对人与环境造成影响的俄科学家亚布罗科夫博士指出，因福岛核电站使用的燃料较切尔诺贝利核电站多，且有反应堆使用了含有高毒性的钚的燃料，因此"福岛核电站事故可能会比切尔诺贝利带来更严重的后果"。
```

上面选中状态的那些文字就可以转换成`Range对象`（下面会详细讲述）。通过`Range对象`你可以找到Range的起始点和结束点，如果你实在有心，还可以删除或是复制这些内容，或是用其他文字替换，甚至是简单的HTML。

上面的例子可以说是最简单的`Range对象`的例子，因为其只包含了文字。而实际上，`Range对象`也是可以包含HTML代码内容的，例如下面这个示例：

```
<time>2011-04-12</time>
<p>据日本广播协会电视台12日报道，日本经济产业省原子能安全保安院决定将福岛第一核电站核泄漏事故等级提高至7级。这使日本核泄漏事故等级与苏联切尔诺贝利核电站核泄漏事故等级相同。</p>
<p>负责调查切尔诺贝利核事故对人与环境造成影响的俄科学家亚布罗科夫博士指出，因福岛核电站使用的燃料较切尔诺贝利核电站多，且有反应堆使用了含有高毒性的钚的燃料，因此"福岛核电站事故可能会比切尔诺贝利带来更严重的后果"。</p>
```

同样的，`Range对象`被创建，且包含HTML，现在的问题是选择的内容正好跨过了楚河和汉界（跨标签），如果就单纯的论选择的内容的话，应该如下：

```
泄漏事故等级与苏联切尔诺贝利核电站核泄漏事故等级相同。</p>
<p>负责调查切尔诺贝
```

显然，上面的HTML属于1级残废，基本无效。然而幸运的是，所有的浏览器都会自动调整HTML片段使其有效，就像变成下面这样：

```
<p>泄漏事故等级与苏联切尔诺贝利核电站核泄漏事故等级相同。</p>
<p>负责调查切尔诺贝</p>
```

可以看到，浏览器自动补全了一定数目的HTML来让Range有效。如果你复制或是移动Range，你所复制或移动的HTML内容一定是有效的。

### 三、浏览器的兼容性

在真正操刀JavaScript之前我们需要大致知道`Range对象`的浏览器兼容性情况。实际上，问题是比较麻烦的，因为至少有3种`类似Range对象`，且你有必要全部理解。先展示详细的兼容性情况表：

**支持：**![支持](https://www.zhangxinxu.com/study/image/ok.gif)**不支持：**![不支持](https://www.zhangxinxu.com/study/image/error.gif)**部分支持：**![部分支持](https://www.zhangxinxu.com/study/image/part.gif)

##### 1. W3C Range

|                                           |                        Explorer 6/7                         |                       Firefox 2                        |                          Safari 1.3                          |                           Opera 9                            |
| :---------------------------------------: | :---------------------------------------------------------: | :----------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|              cloneContents()              | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![部分支持](https://www.zhangxinxu.com/study/image/part.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|               cloneRange()                | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|                collapse()                 |                             tbd                             |                          tbd                           |                             tbd                              |                             tbd                              |
|                 collapsed                 | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|          commonAncestorContainer          | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|          compareBoundaryPoints()          | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|       comparePoint() – Mozilla 扩展       | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif)  | ![不支持](https://www.zhangxinxu.com/study/image/error.gif)  |
| createContextualFragment() – Mozilla 扩展 | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|             deleteContents()              | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|                 detach()                  | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|               endContainer                | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|                 endOffset                 | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    | ![部分支持](https://www.zhangxinxu.com/study/image/part.gif) |
|             extractContents()             | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|               insertNode()                | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|      isPointInRange() – Mozilla 扩展      | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif)  | ![不支持](https://www.zhangxinxu.com/study/image/error.gif)  |
|               selectNode()                | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|           selectNodeContents()            | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|                 setEnd()                  | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|               setEndAfter()               | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|              setEndBefore()               | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|                setStart()                 | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|              setStartAfter()              | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|             setStartBefore()              | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|              startContainer               | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|                startOffset                | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    | ![部分支持](https://www.zhangxinxu.com/study/image/part.gif) |
|            surroundContents()             | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |

**说明：**
`cloneContents()`的用法类似`docFrag = rangeObject.cloneContents()`，`Range对象`内容被克隆同时被添加到文档片段上，并返回自身。但是在Safari下有个问题，即如果选择范围是空，将会返回`null`而不是空的文档片段。可以通过类似`docFrag = rangeObject.cloneContents() || document.createDocumentFragment()`这样的代码修复。

`deleteContents()`处，Range内容会被永久删除，无返回值。

`endContainer`指用户选择内容结尾处的容器节点。通常是文本节点。

`extractContents()`用法`docFrag = rangeObject.extractContents()`。从DOM树上剪切`Range对象`并返回文档片段。该片段可以粘贴到页面上。

`startContainer`指用户选择内容起始处的容器节点。通常是文本节点。

`startOffset`在Opera浏览器下，在选择内容为空的时候返回`0`。

##### 2. Mozilla Selection

|                           |                        Explorer 6/7                         |                       Firefox 2                        |                         Safari 1.3                          |                           Opera 9                            |
| :-----------------------: | :---------------------------------------------------------: | :----------------------------------------------------: | :---------------------------------------------------------: | :----------------------------------------------------------: |
|        addRange()         | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|        anchorNode         | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|       anchorOffset        | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    | ![部分支持](https://www.zhangxinxu.com/study/image/part.gif) |
|        collapse()         |                             tbd                             |                          tbd                           |                             tbd                             |                             tbd                              |
|      collapseToEnd()      | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|     collapseToStart()     | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|      containsNode()       | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|   deleteFromDocument()    | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|         extend()          | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|         focusNode         | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|        focusOffset        | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    | ![部分支持](https://www.zhangxinxu.com/study/image/part.gif) |
|       getRangeAt()        | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|        isCollapsed        | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|        rangeCount         | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|     removeAllRanges()     | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|       removeRange()       | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|    selectAllChildren()    | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
| selectionLanguageChange() | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |

**说明：**
`anchorNode`用法为`userSelection.anchorNode`。指用户选择内容起始处的容器节点。通常是文本节点。

`anchorNode`在Opera浏览器下，在选择内容为空的时候返回`0`。

`focusNode`用法为`userSelection.focusNode`。指用户选择内容结尾处的容器节点。通常是文本节点。

`focusOffset`在Opera浏览器下，在选择内容为空的时候返回`0`。

`getRangeAt()`用法为``rangeObject = userSelection.getRangeAt(0)，作用是将Mozilla Selection转换为W3C Range。

##### 3. Microsoft TextRange

|                     |                      Explorer 6/7                      |                          Firefox 2                          |                         Safari 1.3                          |                           Opera 9                           |
| :-----------------: | :----------------------------------------------------: | :---------------------------------------------------------: | :---------------------------------------------------------: | :---------------------------------------------------------: |
|   boundingHeight    | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|    boundingLeft     | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|     boundingTop     | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|    boundingWidth    | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|     collapse()      |                          tbd                           |                             tbd                             |                             tbd                             |                             tbd                             |
| compareEndPoints()  | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|     duplicate()     | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|      expand()       | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|     findText()      | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|      htmlText       | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|       move()        | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|      moveEnd()      | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|     moveStart()     | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
| moveToElementText() | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|    moveToPoint()    | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|     offsetLeft      | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|      offsetTop      | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|   parentElement()   | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|     pasteHTML()     | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|  scrollIntoView()   | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |
|      select()       | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
|        text         | ![支持](https://www.zhangxinxu.com/study/image/ok.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |

**说明：**
`htmlText`用法为`htmlString = userSelection.htmlText`。返回字符串，为`TextRange`的HTML内容，相当于`innerHTML`。只读。

`pasteHTML()`，当粘贴HTML到一个文本节点时，该文本节点自动分隔。

`text`用法为`string = userSelection.text`。返回字符串，为`TextRange`的文本内容，相当于`innerText`。可读/写。

##### 4. 总的兼容性

|                                                              |                        Explorer 6/7                         |                          Firefox 2                          |                          Safari 1.3                          |                           Opera 9                            |
| :----------------------------------------------------------: | :---------------------------------------------------------: | :---------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| W3C Range[详述](http://www.w3.org/TR/2000/REC-DOM-Level-2-Traversal-Range-20001113/ranges.html) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
| Mozilla Selection[详述](http://developer.mozilla.org/en/docs/DOM:range) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    | ![部分支持](https://www.zhangxinxu.com/study/image/part.gif) |    ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    |
| Microsoft Text Range[详述](http://msdn2.microsoft.com/en-us/library/ms535872.aspx) |   ![支持](https://www.zhangxinxu.com/study/image/ok.gif)    | ![不支持](https://www.zhangxinxu.com/study/image/error.gif) | ![不支持](https://www.zhangxinxu.com/study/image/error.gif)  | ![部分支持](https://www.zhangxinxu.com/study/image/part.gif) |

**说明：**

- W3C Range对象是唯一官方指定。基本上其是将Range作为包含DOM的文档片段。
- Mozilla Selection对象显得有些多余，其存在是为了向后兼容Netscape 4。其类似于W3C Range对象，也是基于DOM树的。
- Microsoft Text Range对象跟上面两个就是郭德纲和玄彬的区别了，因为其是基于字符串的。事实上，Text Range包含的字符串是很难一下子跳变成DOM节点的。

总的来说，Mozilla Selection对象就是个打酱油的命，仅有的闪光点能够直接将用户选择任何内容变成完全Range对象以及一些额外的方法或是属性可以向后兼容Netscape 4。但是不幸的是除了IE浏览器外的其他浏览器都支持此Selection对象。

### 四、获得用户选择内容

婆婆妈妈的解释就免了，直接看相关代码：

```
var userSelection;
if (window.getSelection) { //现代浏览器
    userSelection = window.getSelection();
} else if (document.selection) { //IE浏览器 考虑到Opera，应该放在后面
    userSelection = document.selection.createRange();
}
```

由于兼容性的问题，IE浏览器吃IE的包子，其他浏览器吃Mozilla的馒头。

在Mozilla、Safari、Opera下上面的`userSelection`是个`Selection对象`，而在IE下则是`Text Range对象`。这种差异会影响到你后面的脚本：Internet Explorer的`Text Ranges`完全不同于Mozilla的`Selection`或是W3C的`Range对象`，你需要分别为IE和其他浏览器写两套不同的脚本。

需要注意脚本书写的顺序：*Mozilla Selection需放在前面*。原因在于Opera支持两种对象，如果你使用`window.getSelection()`去读取用户选择的内容，Opera会创建一个`Selection对象`；而使用`document.selection`则会创建一个`Text Range对象`。

因为Opera支持Mozilla Selection和W3C Range非常好，但是其对Microsoft Text Range的支持却差强人意。所以显然优先考虑标准浏览器，即使用`window.getSelection()`。

### 五、userSelection的内容

`userSelection`变量现在的内容要么是Mozilla Selection要么就是Microsoft Text Range对象。因此它允许访问定义在对象上的全部方法和属性。

Mozilla Selection对象包含用户选择的文本内容，如下操作：

```
console.log(userSelection.toString())
```

虽然格式并不是字符串，但是在现代浏览器下还是会弹出类似下面的内容：

```
泄漏事故等级与苏联切尔诺贝利核电站核泄漏事故等级相同。负责调查切尔诺贝
```

为了从`Microsoft Text Range 对象`上获得同样的信息，你需要使用`userSelection.text`。为了读取旋转的文字，可以使用类似下面代码：

```
var selectedText = userSelection;
if (userSelection.text) {
    selectedText = userSelection.text;
}
```

现在`selectedText`就包含了用户所选中的文字了。

我们组合一下，完整获取用户选择文本代码如下：

```
var userSelection, selectedText = '';
if (window.getSelection) { //现代浏览器
    userSelection = window.getSelection();
    selectedText = userSelection.toString();
} else if (document.selection) { // 老IE浏览器
    userSelection = document.selection.createRange();
    selectedText = userSelection.text;
}
```

您可以狠狠地点击这里：[获取用户所选文字demo](https://www.zhangxinxu.com/study/201104/get-selection-text.html)

例如在IE7浏览器下，选中一段文字再点击demo页面上的测试按钮，就会有类似下面的弹出内容：

![获取用户选中的文字截图](https://image.zhangxinxu.com/image/blog/201104/2011-04-13_153812.png)

**input输入框IE下选择文本的获取**
如果是`<input>`或者`<textarea>`输入框，在支持`getSelection()`方法的浏览器中，`selectedText`值是空字符串，需要使用其他方法获取。如下：

```
// input指输入框DOM元素
selectedText = input.value.slice(input.selectionStart, input.selectionEnd);
```

### 六、从Selection对象创建Range对象

在IE浏览器下，`userSelection`是`Text Range`，在现代浏览器下，`userSelection`仍然是`Selection对象`，要想同样创建和`Selection对象`内容一样的`Range对象`可以使用类似下面代码：

```
var getRangeObject = function(selectionObject) {
    if (selectionObject.getRangeAt)
        return selectionObject.getRangeAt(0);
    else { // 较老版本Safari!
        var range = document.createRange();
        range.setStart(selectionObject.anchorNode,selectionObject.anchorOffset);
        range.setEnd(selectionObject.focusNode,selectionObject.focusOffset);
        return range;
    }
}
var rangeObject = getRangeObject(userSelection);
```

理想情况下，我们通过`Selection`对象的`getRangeAt()`方法就可以得到`W3C Range对象`。此方法可以返回给定索引值的`range对象`。通常情况下，在JavaScript中第一个Range的索引值是`0`。

**使用程序创建Range**

Safari 1.3不支持`getRangeAt()`，因此我们要想兼顾此浏览器，需要使用其他的方法创建新的`Range对象`。显然，显示创建一个对象：

```
var range = document.createRange();
```

上面的一行代码创建了一个空的Range，为了插入内容，我们需要通过`setStart()`和`setEnd()`方法定义起止点。

这两个方法需要两个参数：
\1. Range起止的DOM节点
\2. Range起止的文本偏移。该偏移指选中文字第一个字符和最后一个字符在文本节点中的位置。

`setStart()`的两个参数属性为`startContainer`和`startOffset`；`setEnd()`两个参数属性为`endContainer`和`endOffset`。

以下面这个例子举例：

```
<p>男人，即使到了50岁，也千万不要碰超过26岁还没有结婚的女人。她可以是离婚，丧偶等等的，但是绝对不能是没有结婚。超过了26岁没有结婚，这种女人一般心理变态，不然就是有严重问题。市场很少犯错。即使它犯了错，那被你捡到宝的概率也很小。</p>
<p>婚姻市场未来的变化将会是很有趣的问题，而且对未来大陆经济的走势也有举足轻重的影响，对于行业的分布，经济的整体效率有决定性的影响。</p>

<ol>
    <li>为什么是26这个准确的数字？</li>
    <li>找骂帖</li>
    <li>言论是对的，在100年前，lz穿越了而已。</li>
</ol>
```

此处Range开始于第二个`<p>`节点，结束与第一个`<li>`节点。（通常文本节点的第一个字符的索引是`0`。）

由于`<p>`节点处的文字偏移值是8, `<li>`节点处的偏移是5，因而有：

```
var startP = [the p node];
var endLi = [the second li node];
range.setStart(startP, 8);
range.setEnd(endLi, 5);
```

**读取起止选中内容**

上面提到了`setStart(startContainer, startOffset)`以及`setEnd(endContainer, endOffset)`。考虑到实际情况，你很难准确知道用户选择的文字的起始位置，所以，上面一板一眼赋予偏移值的方法显然有很大的局限性。好在任何（看参见上面的兼容性表格）`Range对象`有4个属性是用来定义选择内容起止点的，这4个属性与`Selection对象相似`，但是却是不同的名称：`anchorNode/anchorOffset`定义选择的起始，`focusNode/focusOffset`定义结束。

因此，上面的脚本创建选区可以使用如下代码实现：

```
range.setStart(selectionObject.anchorNode,selectionObject.anchorOffset);
range.setEnd(selectionObject.focusNode,selectionObject.focusOffset);
```

**Safari的多虑**

现在已经是2011年了，释小龙都有绯闻了，Safari 5已经出来好些日子了。所以，如果仅仅是为了兼顾低版本的Safari而去使用程序创建Range，我觉得是一点必要都没有。尤其在我们这个神奇的国度上，首先使用Safari就少，低版本的就少之又少，Safari老早就已经支持`getRangeAt()`了，Chrome浏览器也是如此。

您可以狠狠地点击这里：[Safari下getRangeAt测试demo](http://www.zhangxinxu.com/study/201104/safari-get-range-at-test.html)

选择demo页面中的任意一部分文字，然后点击测试按钮，在较新版本的Safari浏览器下就会出现类似下图的结果：

![Safari下getRangeAt弹出](https://image.zhangxinxu.com/image/blog/201104/2011-04-13_144100.png)

所以，在当前环境下，要想将`Selection对象`转换成`Range对象`，直接如下代码就OK了(完整版)：

```
var userSelection, rangeObject;
if (window.getSelection) { 
    //现代浏览器
    userSelection = window.getSelection();
} else if (document.selection) { 
    //IE浏览器 考虑到Opera，应该放在后面
    userSelection = document.selection.createRange();
}

//Range对象
rangeObject = userSelection;
if (userSelection.getRangeAt) {
    //现代浏览器
    rangeObject = userSelection.getRangeAt(0);
}
```

### 七、rangy – JavaScript Range&Selection库

项目地址：[http://code.google.com/p/rangy/](http://code.google.com/p/rangy/)

就在几天前，rangy更新到了版本1.1，作者还新更新了四五个示意的页面，展示了相关的API，方法和属性等。虽然如此，由于实例较少，还是让人很难知道此JavaScript库如何使用。这里就举几个简单的例子示意下。//zxx:此插件非压缩达115K，个人觉得有些庞大，在实际项目中的应用价值不大

![img](https://image.zhangxinxu.com/image/blog/201104/2011-04-13_162520.png)

**示例1**，获取用户选中的文字：

您可以狠狠地点击这里：[rangy获取用户选中文字demo](http://www.zhangxinxu.com/study/201104/rangy-get-selected-text.html)

选中部分文字点击按钮，会有如下弹出（截自Firefox3.6）：

![rangy获取用户选中文字](https://image.zhangxinxu.com/image/blog/201104/2011-04-13_170536.png)

相关JavaScript代码如下：

```
var sel = rangy.getSelection();
alert(sel.toString());
```

**示例2**，给选中文字添加背景

您可以狠狠地点击这里：[文字选中添加背景图demo](http://www.zhangxinxu.com/study/201104/rangy-selected-text-bg.html)

选中页面上一段文字，然后失去焦点，就会看到文字后面有了个美女背景图，如下截图，截自IE7浏览器：

![img](https://image.zhangxinxu.com/image/blog/201104/2011-04-13_180343.png)

完整JavaScript代码如下：

```
<script src="//www.zhangxinxu.com/study/201104/rangy/rangy-core.js"></script>
<script src="//www.zhangxinxu.com/study/201104/rangy/rangy-cssclassapplier.js"></script>
<script>
    var cssApplier;
    window.onload = function() {
        rangy.init();
        cssApplier = rangy.createCssClassApplier("selectClass", true); 
        document.body.onmouseup = function() {
            cssApplier.toggleSelection();
        };
    };
</script>
```

### 八、实际的应用

**微博之插入话题**

差不多去年这个时候，自己折腾过JS 文本域光标处添加文字并选中的内容，也是拿的新浪微博示例的，文章是“[新浪微博插入话题后部分文字选中的js实现](http://www.zhangxinxu.com/wordpress/?p=755)”，但是去年这篇文章多实现的话题插入效果是比较弱的：
\1. 选中普通文字不能作为话题插入
\2. 话题只能插在文本域最后二不是光标处
\3. 默认文字的话题可以重复插入

所以，趁这个机会，正好把微博之插入话题这个功能完善下。

您可以狠狠地点击这里：[微博插入话题的效果实现demo](http://www.zhangxinxu.com/study/201104/range-miniblog-insert-topic.html)

欢迎输入内容，点击测试。大致会有类似下面的效果(截自Chrome)：

![img](https://image.zhangxinxu.com/image/blog/201104/2011-04-14_003625.png)

源代码有些高度，为了节约篇幅，这里就不展示出来了，您可以在demo页面中看到完整的CSS/HTML/JS代码。不过JS部分半封装，您要是有兴趣可以在外面包裹一个函数使其插件化，我是懒得再去折腾了。

### 九、结语相关

对于Range相关的知识即使到现在都是半生不熟的，所以文章的内容更多的算是翻译性质的内容。自己并没有从深入理解的基础上很浅显地剖析相关知识点，文章很多地方会显得不怎么通俗易懂。

文中多展示的Range等兼容性表格的数据都是N年前的，还是Safari 1.3时代的数据，老的牙都掉了，实用价值大打折扣，不过可以告知的是先前现代浏览器所不支持的个别属性现早就支持了。

跌跌撞撞，滚滚爬爬。文章难免有表述不准确的地方，欢迎指正。也欢迎提交相关的脚本的bug。

**参考文章及相关页面：**

1. [Introduction to Range](http://www.quirksmode.org/dom/range_intro.html)
2. [W3C DOM Compatibility – Range](http://www.quirksmode.org/dom/w3c_range.html)
3. [rangy – A cross-browser JavaScript range and selection library](http://code.google.com/p/rangy/)
4. [Reveal a Background Image upon Text Selection](http://css-tricks.com/reveal-a-background-image-upon-text-selection/)

![img](https://image.zhangxinxu.com/image/emtion/emoji/1f603.svg)

[《CSS世界》](https://weidian.com/item/?itemID=2225312451)签名版独家发售，包邮，可指定寄语，[点击显示购买码](https://image.zhangxinxu.com/image/blog/201801/my-weidian.png)

（本篇完）// 想要打赏？点击[这里](javascript:)。有话要说？点击[这里](https://www.zhangxinxu.com/wordpress/2011/04/js-range-html文档文字内容选中、库及应用介绍/#comment)。

« [页面可用性之img标签longdesc属性与HTML5](https://www.zhangxinxu.com/wordpress/2011/04/页面可用性之img标签longdesc属性与html5/)

[MooTools下简易自定义滚动条小插件](https://www.zhangxinxu.com/wordpress/2011/04/mootools下简易自定义滚动条小插件/) »

猜你喜欢

- [新浪微博插入话题后部分文字选中的js实现](https://www.zhangxinxu.com/wordpress/2010/04/新浪微博插入话题后部分文字选中的js实现/)(0.554)
- [使用CSS3 ::selection伪元素改变文本选中颜色](https://www.zhangxinxu.com/wordpress/2010/10/css-css3-selection-range/)(0.272)
- [伪元素表单控件默认样式重置与自定义大全](https://www.zhangxinxu.com/wordpress/2013/06/伪元素-表单样式-pseudo-elements-style-form-controls/)(0.255)
- [js页面文字选中后分享到新浪微博实现](https://www.zhangxinxu.com/wordpress/2011/02/js页面文字选中后分享到新浪微博实现/)(0.213)
- [小tip: 如何让contenteditable元素只能输入纯文本](https://www.zhangxinxu.com/wordpress/2016/01/contenteditable-plaintext-only/)(0.170)
- [深入CSS ::first-letter伪元素及其实例等](https://www.zhangxinxu.com/wordpress/2016/09/css-first-letter-pseudo-element/)(0.170)
- [利用剪切板JS API优化输入框的粘贴体验](https://www.zhangxinxu.com/wordpress/2018/09/js-clipboard-api-paste-input/)(0.170)
- [JavaScript实现最简单的拖拽效果](https://www.zhangxinxu.com/wordpress/2010/03/javascript实现最简单的拖拽效果/)(0.102)
- [JavaScript实现http地址自动检测并添加URL链接](https://www.zhangxinxu.com/wordpress/2010/04/javascript实现http地址自动检测并添加url链接/)(0.102)
- [不同CSS布局实现与文字鼠标选择的可用性](https://www.zhangxinxu.com/wordpress/2012/05/不同css布局实现与文字鼠标选择的可用性/)(0.102)
- [让IE6/IE7/IE8浏览器支持CSS3属性](https://www.zhangxinxu.com/wordpress/2010/04/让ie6ie7ie8浏览器支持css3属性/)(RANDOM - 0.009)

分享到：1

标签： [createTextRange](https://www.zhangxinxu.com/wordpress/tag/createtextrange/), [plugin](https://www.zhangxinxu.com/wordpress/tag/plugin/), [range](https://www.zhangxinxu.com/wordpress/tag/range/), [selection](https://www.zhangxinxu.com/wordpress/tag/selection/), [setSelectionRange](https://www.zhangxinxu.com/wordpress/tag/setselectionrange/), [兼容性](https://www.zhangxinxu.com/wordpress/tag/兼容性/), [插入文字](https://www.zhangxinxu.com/wordpress/tag/插入文字/), [文字选中](https://www.zhangxinxu.com/wordpress/tag/文字选中/), [新浪微博](https://www.zhangxinxu.com/wordpress/tag/新浪微博/)