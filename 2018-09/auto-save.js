/*put these codes in the last part of html page*/
if (!window.localStorage) {
  alert('Your browser don't adequate localStorage');// IE8 lower

/*注意: 本js脚本请在网页源代码最后的地方放置*/
if (!window.localStorage) {
  alert('Your browser don't adequate localStorage');// IE8 lower
} else {
  var spanObj = document.getElementById('s1');
  var saveTimer = setInterval(function() {
    var str = "";

    if (document.all) {
      /*IE*/
      str = document.frames[1].document.body.innerHTML; }
    else {
      /*Chrome,ff*/
      str = document.getElementById("ueditor_0").contentDocument.body.innerHTML;
    }
    if (str.length > 20 && (str.indexOf("。") > -1 || str.indexOf("，") > -1)) {

      localStorage.setItem("ctValue", str);
      var d = new Date();
      var YMDHMS = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      spanObj.innerText = 'time ' + YMDHMS ;
      setTimeout(function() { spanObj.innerText = ''; }, 5000);
    }
  }, 25000);

  function stoplocs() {
    clearInterval(saveTimer);
    //localStorage.removeItem("ctValue");
    if (document.all) { /*IE*/ str = document.frames[1].document.body.innerHTML; } else { /*Chrome,ff*/ str = document.getElementById("ueditor_0").contentDocument.body.innerHTML; }
    if (str.length > 20 && (str.indexOf("。") > -1 || str.indexOf("，") > -1)) { /*有内容才保存 且有句号或逗号*/

      localStorage.setItem("ctValue", str);
      var d = new Date();
      var YMDHMS = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      spanObj.innerText = 'time ' + YMDHMS ;
      setTimeout(function() { spanObj.innerText = ''; }, 5000);
    }
  }, 25000);

  function stoplocs() {
    clearInterval(saveTimer);
    //localStorage.removeItem("ctValue");
  }

  function showlocs() {
    var html = localStorage.getItem("ctValue");
    editor.setContent(html);
    //alert(localStorage.getItem("ctValue"));
  }
}
