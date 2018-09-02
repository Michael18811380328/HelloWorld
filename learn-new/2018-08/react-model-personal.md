### react-modal 解决方案

目的：通过这个案例优化自己解决问题的思维方式

##### 1.分析需求和实现方案：

* 按钮触发：点击按钮弹出弹窗。主页上需要设置按钮触发弹窗的显示和隐藏属性（toggleDialog-setState）。
* 窗体设置：标题+内容+按钮（确定提交表单，取消关闭窗口）——需要设置外部API（submit-cancel）。
* 背景设置：背景半透明黑色，窗口活动时不能拖动。
* 调研现有组件能否完成功能：如果没有自己写（通常有这个组件）。

##### 2.实现静态界面和样式（css）

  ~~~html
  <div class="m-modal">
      <div class="modal_align"></div>
    	/* 窗体水平居中辅助类 */
      <div class="modal_wrap">
          <div class="modal_head"></div>
          <div class="modal_body"></div>
          <div class="modal_foot">
              <a href="" class="confirm"></a>
              <a href="" class="cancel"></a>
          </div>
      </div>
  </div>
  ~~~

  定义基本的样式

~~~css
.m-modal{
    text-align:center;
}
.modal_align,.modal_wrap{
    display:inline-block;
    vertical-align:middle;
}
.modal_align{
    height:100%;
    width:1px;
    line-height:100%;
}
~~~

##### 3.定义公共接口

窗体内容函数，窗体动画函数，确定提交函数，取消函数，显示关闭弹窗。

这部分JS代码是原作者写的，代码可以继续优化。

~~~js
var modal = new Modal({
    cotent: "内容在此",
    animation: {
        enter: 'bounceIn',
        leave: 'bounceOut'
    }
    onConfirm: function(){
        console.log('ok')
    },
    onCancel: function(){
        console.log('cancel')
    }
})
~~~

~~~js
function Modal(options){
options = options || {};

//每个Modal被示例后都应该是独立的，所以我们需要复制传入的目标节点
this.container = this._layout.cloneNode(true);

// body 用于插入自定义内容
this.body = this.container.querySelector('.modal_body');
// 注意：在React中避免使用原生DOM的方法找对象——采用组件变化的方法找对象

// 窗体节点，在应用动画时有用
this.wrap = this.container.querySelector('.modal_wrap');

// 将options 复制到 组件实例上
extend(this, options);

this._initEvent();
}

// 显示弹窗
extend(Modal.prototype,
    show: function(content){
      //如果传入内容久设置内容
      if(content) this.setContent(content);
    
      document.body.appendChild(this.container);
      animateClass(this.wrap, this.animation.enter)
    },
    hide: function(){

      var container = this.container;

      animateClass(this.wrap, this.animation.leave, function(){
        document.body.removeChild(container);
      })
      
    }
}
~~~

##### 4. 测试代码

假设前面的代码逻辑正确，没有语法错误，最后需要进行测试。

进行黑盒测试：使用测试工具JEST或者直接在浏览器中运行代码，查看能否得到预期的效果。

进行白盒测试：人工分析，方法逻辑是否完善，参数的定义域和取值是否符合规范，用户是否有误操作。

##### 5.整理代码后提交PR

代码中不必要的注释，全局变量需要删除，设计初期变量名和参数名，最后需要根据实际功能进行更改。自己可能看不出代码中的潜在的问题，通过其他前端或者后端人员从其他角度分析检测代码。

最后，没有最好的代码，只有更好的代码。在实现功能的基础上，不断追求性能优化，追求逻辑优化。