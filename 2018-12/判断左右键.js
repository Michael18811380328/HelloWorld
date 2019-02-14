document.onmousedown=judgeMouseButton; 

function judgeMouseButton(e){ 
  var e = window.event||e;
  var value = e.button; 
  if (value == 2 || value == 3) { 
    alert('点击的是鼠标右键'); 
  }
  else{ 
    alert('点击的是鼠标左键'); 
  } 
} 