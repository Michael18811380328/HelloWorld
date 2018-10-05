# MarkDown 图片大小问题

MarkDown里显示图片的方式可以引入HTML方法, 
 以512×512的lena图像为例, 
 直接以MarkDown插入图片的方法，图片就会靠在左侧，大小也不由自己决定：

```
![lena](https://img-blog.csdn.net/20151129213701642)1
```

其中<https://img-blog.csdn.net/20151129213701642>是本人上传的lena图像链接。

固定图片显示大小：

```
<img src="https://img-blog.csdn.net/20151129213701642" width=256 height=256 />1
```

其中src后面接的就是图像对象，width和height设置的是显示图像的尺寸。

根据一定比例显示：

```
<img src="https://img-blog.csdn.net/20151129213701642" width="50%" height="50%" />1
```

其中width和height后面的50%就是根据窗口的大小以一定的比例显示图片。值得一说的是，这种按照百分比显示方法，是以width方向为准，并保持纵横比的，换句话说，把设置width的部分去掉，height的值改为任意百分比，显示的图像都是原图大小（个人觉得这根博客窗口有关，毕竟现实截面的宽度相对是固定的，而高度/长度却是变化着的）。因此用此方法的时候，可以把height设置缺省。(亲测，好用，只设width，可以维持原图比例）

如：

```
<img src="https://img-blog.csdn.net/20151129213701642" height="5%" />1
```

是不是，还是原图的大小……

如果想给图像加个标注，可以这么做：

```
<center>
<img src="https://img-blog.csdn.net/20151129213701642" width="25%" height="25%" />
Figure 1. Lena
</center>
12345
```

 如果想让图和标注间距离增大，可以这么做：

```
<center>
<img src="https://img-blog.csdn.net/20151129213701642" width="25%" height="25%" />
$ $
Figure 1. Lena
</center>12345
```

亲测，只设width:

```
<center>
<img src="https://img-blog.csdn.net/20151129213701642" width="40%" />
Figure 1. Lena
</center>1234
```
