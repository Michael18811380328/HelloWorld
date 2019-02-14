// cascade 级联
// 在函数调用过程中，函数执行中仅仅改变对象的状态或者属性，函数的返回值是自己this，就可以使用这种方式同时调用多个函数的方法（类似于canvas对象）
getElement('myBox')
  .moveTo(350, 100)
  .width(100)
  .height(100)
  .appendText("Please enter")
  .on('mousedown', function(m) {
    this.startDrag(m, this.getNinth(m));
  })
  .on('mousemove', 'drag')
  .on('mouseup', 'stopDrag')
  .later(2000, function() {
    this
      .color('yellow')
      .setHTML("hello")
      .slide(400, 400);
  })
  .tip("this box is resizeable");