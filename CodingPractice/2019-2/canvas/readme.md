#### canvas
canvas is an important tool to draw a vector diagram under new HTML5 standard。
recently,people use this method to make some Wechat small games. And all in all, these games gained such a large success.
So, for most web coder, H5 and canvas is absolutely essential skill.
Don't hesitate to learn to code!

#### canvas导入图片

canvas导入图形必须在图形加载之后导入。首先获取ctx和img对象。

img.onload = function(){
	ctx.drawImage(参数)；
}

drawImage参数具有三种情况：

1. img对象，canvasX坐标，canvasY坐标。图像按照1:1形式进行绘制。超出画布的部分不可见。

2. img对象，canvasX坐标，canvasY坐标，canvasδX，canvasδY。——指定导入图像的大小。（将导入的图像按照比例缩放后，放入canvas中）

3. Img对象，X,Y,δX,δY(表示导入图像裁剪的像素和位置)，canvasX坐标，canvasY坐标，canvasδX，canvasδY。(放在canvas中的位置)参数较复杂。

实际操作过程中，优先进行图像裁剪处理，之后再使用css或者canvas，当然需要和设计组沟通好。

#### canvas帧动画

原理：设置定时器，每隔一段时间变化导入图像的位置即可。导入图像的位置是时间的函数。

总结：面向对象初级或者DOM中面对的对象已经具备默认属性和方法，直接进行使用即可。JS高级需要自己创建对象，并且给与这些对象属性和方法，使用mix混入当前方法和已有方法，最终调用对象的方法。

实现步骤：1.获取已有对象canvas或者构造函数创建新对象Person 2.将构造函数输入的属性使用this绑定在新对象上，或者经过计算后获得二次属性绑定到对象上。3.清除计时器，清除画布，设置定时器计数器。4.给对象绑定方法（使用混入min方法绑定到对象的原型，或者直接修改对象原型等四种方式）到此，新对象具有属性和方法 5.事件触发对象的方法。如果涉及时间间隔、循环、递归，需要设置if判断跳出上述条件。如果有必要，单独将代码封装成一个JS文件独立出来，做一个闭包避免数据污染，向外暴露新对象（将新对象加入window对象中）。

#### canvas保存回滚

ctx.save();
ctx.restore();
保存当前状态（属性）恢复到之前的属性（线颜色、线宽度、线头形状）

ctx.translate(100,100);
平移坐标系（已存在的图形不受到影响，新图形的坐标在新坐标轴上绘制）

ctx.rotate(Math.PI/6);
旋转坐标系

ctx.scale(0.5,0.5);
缩放坐标系

绘制旋转图像：将坐标轴放到图像的几何中心（width/2），设置时间函数，旋转坐标轴绘制新图形。
