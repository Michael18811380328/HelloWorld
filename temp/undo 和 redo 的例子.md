# undo 和 redo 的例子

~~~html
<HTML>
  <HEAD>
    <TITLE> test command </TITLE>
    <META NAME="Author" CONTENT="emu">
      <SCRIPT LANGUAGE="JavaScript">
        var actionStack = [];//操作栈
        var actionIndex = 0; //操作栈中当前操作的指针

        //-----------------------  command对象基类 ------------------------------
        function BaseAction(){
        }
        BaseAction.prototype.exec=function(){
          actionStack[actionIndex++] = this;
        }
        BaseAction.prototype.undo=function(){
          alert("此操作未定义相应的undo操作");
        }
        BaseAction.prototype.redo=function(){
          alert("此操作未定义相应的redo操作");
        }

        //-----------------------  move操作的command对象 ------------------------------
        function MoveAction(elm){
          this.oldX = elm.oldX;
          this.oldY = elm.oldY;
          this.newX = elm.newX;
          this.newY = elm.newY;
          this.sourceElement = elm;
          this.status = "done";
        }
        MoveAction.prototype = new BaseAction();
        MoveAction.prototype.undo=function(){
          if (this.status != "done") return;
          this.sourceElement.style.left = this.oldX;
          this.sourceElement.style.top = this.oldY;
          this.status = "undone";
        }
        MoveAction.prototype.redo=function(){
          if (this.status != "undone") return;
          this.sourceElement.style.left = this.newX;
          this.sourceElement.style.top = this.newY;
          this.status = "done";
        }

        //-----------------------  change操作的command对象 ------------------------------
        function ChangeAction(elm){
          this.sourceElement = elm;
          this.oldValue = elm.defaultValue;
          this.newValue = elm.value;
          elm.defaultValue = elm.value;
          this.status = "done";
        }
        ChangeAction.prototype = new BaseAction();
        ChangeAction.prototype.undo = function(){
          if (this.status != "done") return;
          this.sourceElement.value = this.sourceElement.defaultValue = this.oldValue;
          this.status = "undone";
        }

        ChangeAction.prototype.redo = function(){
          if (this.status != "undone") return;
          this.sourceElement.value = this.newValue;
          this.status = "done";
        }
        ChangeAction.prototype.exec=function(){
          actionStack[actionIndex++] = this;
        }

        //---------------------  全局函数  ----------------------------
        function undo(){
          if (actionIndex>0){
            actionStack[--actionIndex].undo();
          }
        }
        function redo(){
          if (actionIndex<actionStack.length){
            actionStack[actionIndex++].redo();
          }
        }

        function checkMouseMove(){
          if (window.activeElement){
            var elm = window.activeElement;
            elm.style.left = event.x-elm.innerX;
            elm.style.top = event.y-elm.innerY;
          }
        }
        function releaseMouse(){
          if (window.activeElement){
            activeElement.newX = event.x;
            activeElement.newY = event.y;
            new MoveAction(activeElement).exec();
            window.activeElement = null;
          }
        }
        function drag(){
          if (event.button!=2) return;
          var elm = event.srcElement;
          window.activeElement = elm;
          elm.oldX = elm.offsetLeft;
          elm.oldY = elm.offsetTop;
          elm.innerX = event.x - elm.oldX;
          elm.innerY = event.y - elm.oldY;
        }

        function changeValue(){
          new ChangeAction(event.srcElement).exec();
        }
      </SCRIPT>
      </HEAD>

    <BODY onmousemove="checkMouseMove()" onmouseup="releaseMouse()" oncontextmenu="return false">
      <input type=button onclick=undo() value=undo>
      <input type=button onclick=redo() value=redo>
      <input value="drag me" onmousedown="drag()" onchange="changeValue()">
      <input value="drag me" onmousedown="drag()" onchange="changeValue()">
      <input value="drag me" onmousedown="drag()" onchange="changeValue()">
    </BODY>

</HTML>
~~~

