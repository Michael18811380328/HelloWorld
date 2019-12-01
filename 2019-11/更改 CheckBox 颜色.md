# 更改 CheckBox 颜色

使用表单验证时，CheckBox 是不可缺少的一部分。

由于浏览器兼容性，checkbox 会显示不同的样式，直接设置 input 的 backgroundColor 属性，不能改变checkbox 的背景颜色和样式。

如果是用第三方库（例如 bootstrap），实际上是在原生的 input 上面进行改变，仍然不能解决浏览器兼容性问题。

所以，可以使用自定义的 CheckBox 解决这个问题

~~~html
<div class="container">
  <input type="checkbox" />
  <div class="show-box" />
</div>
~~~

下面是自定义的CSS

~~~css
.container {
  position: relative;
}

.container input:checked + .show-box {
  background: pink;
}

.container .show-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid #d8d8d8;
  background: white;
}

.container .show-box:before {
  content: '';
  position: absolute;
  top: 2px;
  left: 4px;
  width: 5px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
~~~

