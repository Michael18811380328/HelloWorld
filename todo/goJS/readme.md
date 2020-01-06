# GoJS 介绍

https://gojs.net/latest/index.html

一、前言
 Gojs提供了很多API给我们使用，下面只是提供完成关系图表（如下图）的某种方法，用其他方法也可以实现同样的效果。

![img](https://upload-images.jianshu.io/upload_images/4148840-f17908fcc664bfe9.png?imageMogr2/auto-orient/strip|imageView2/2/w/756/format/webp)

image.png

二、准备图表数据
 1、节点数据：

```bash
let nodeDataArray = [
{key: "iscroll容器-1", name: "iscroll容器-1", compId: "111", color: "pink", cursor: "grab",loc: "0 0"},
{key: "iscroll容器-2", name: "iscroll容器-1", compId: "222", color: "pink", cursor: "grab",loc: "0 -100"},
...
];
```

2、关系数据：

```csharp
let relation = [
{from: "111", fromNodeType: "component", to: "222", toNodeType: "event"},
...
];
```

三、开始画图
 由上图可以分析得到，图表由节点、文字、线、箭头组成。
 1、创建图表

```go
 //'go-graph-diagram'： dom节点id
Let diagram = new go.Diagram('go-graph-diagram');
```

2、新建节点

```go
let $ = go.GraphObject.make;
diagram.nodeTemplate = $(go.Node, 'Auto',  //'Auto'：与css设置width:auto同样效果
        {
          // 添加点击事件
          click: function(e, obj) {}
        },
         // 将节点数据nodeDataArray .loc与图表位置建立联系
         new go.Binding('position', 'loc', go.Point.parse),
        //设置节点形状：带圆角的长方形
         $(go.Shape, 'RoundedRectangle',
          // 设置大小，边框大小、颜色，背景色，鼠标手势
          {desiredSize: new go.Size(160, NaN), strokeWidth: 0, fill: 'white', cursor: 'grab'},
          //将节点数据nodeDataArray .color与节点背景色建立联系
          new go.Binding('fill', 'color'), 
         //将节点数据nodeDataArray .cursor与节点鼠标手势建立联系
          new go.Binding('cursor', 'cursor')
        ),
        // 设置文本节点
        $(go.TextBlock,
          // 设置文本样式：大小，是否换行，margin
          {
            desiredSize: new go.Size(100, NaN),
            wrap: go.TextBlock.WrapFit,
            margin: 8
          }, 
          // bind TextBlock.text to Node.data.name
          new go.Binding('text', 'name'), 
          new go.Binding('cursor', 'cursor')
        )
      );
```

3、设置线条和箭头

```jsx
this.diagram.linkTemplate = $(go.Link,
        $(go.Shape, // the link shape
          {strokeWidth: 2, stroke: 'white'}),
        $(go.Shape, // the arrowhead
          {toArrow: 'OpenTriangle',
            fill: null, stroke: 'white'})
      );
```

4、其他设置

```kotlin
// 将图表在画布中居中显示
this.diagram.initialContentAlignment = go.Spot.Center;
// 操作支持ctrl+z、ctrl+Y 实现undo和redo
this.diagram.undoManager.isEnabled = true;
```

5、新建关系图

```cpp
// 通过节点数据和关系数组完成关系图。
this.diagram.model = new go.GraphLinksModel(nodeDataArray, relation); //nodeDataArray:graph, linkDataArray: relation
```

这里只是简单介绍如何快速完成一个关系图，当然如果你想改成树形图或者改箭头为闭合，改形状为圆形，插入图片等等，强大的gojs都能帮你实现，而且有完善的api和例子可以参考。