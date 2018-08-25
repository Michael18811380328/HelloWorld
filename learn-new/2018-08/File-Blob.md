### Blob对象

上一次我们通过File API 里面的 FileReader类型里的readAsText,readAsDataURL等方法来读取文件File。但是如果一个文件十分大的时候,或者只需要读取部分内容，如(文本文件)，那么我们就可以通过这次介绍的slice方法对文件进行分割成二进制Blob对象。这次我们还是根据上次说的图片上传为例，讲解一下如何分割读取图片的。

一 : 介绍Blob对象 
Blob对象自带属性 
1.size 表示二进制对象的大小 
2.type 表示二进制对象的类型 (如果是File对象分割的,会继承type属性) 
3.slice 方法 分割文件

二：介绍blob.slice方法 
1. 方法介绍 : blob.slice(); 属于Blob对象的一个方法,而File对象是继承Blob对象的,因此File对象也含有slice方法 
2. 参数介绍 : blob.slice(startByte,endByte); 这里需要注意它的参数,第一个参数startByte表示文件起始读取Byte字节,第二个参数则是结束读取字节。这里重点注意一下第二个参数,一开始我以为它是读取的长度。结果我在进行文件分割上传的时候,一直获取不到第二次请求后的数据。 
    3.返回值 ： newBlob = blob.slice(startByte,endByte); 它返回的仍然是一个Blob类型。

AB备注：对于slice的参数的问题，通常情况直接全部上传，不需要断点续传。最后一个结束字节对于不同文件的重要性不同。对于png和gif，损失一部分字节不会影响图像的全部显示。但是对于jpg和bpm等格式的图片，缺失一部分字节（尤其是在最后一个字节）就不能显示图片。那么，如果涉及到文件上传，文件大小在合理的范围内，最好直接全部上传。

当前端通过input的type-file表单上传文件后，使用onchange事件可以获得上传的文件: e.target.files[0]如果是多文件上传获得一个数组，

三 : 兼容slice方法
~~~js
function blobSlice(blob,startByte,endByte){
  if(blob.slice){
    return  blob.slice(startByte,endByte);
  }
  if(blob.mozSlice){
    return  blob.mozSlice(startByte,endByte);
  }
  if(blob.webkitSlice){
    return  blob.webkitSlice(startByte,endByte);
  }
    return null;
}
~~~
四 : 分割文件上传 
曾经我有介绍过如何将File对象指定的文件上传到服务器中，其中就是通过了FormData对象封装表单数据,通过Ajax请求进行传输。在这里我也要强调一下,一般的 jQuery库和zepto库是不支持FormData对象.因此我们想要调用它们的方法进行发送是不行的,除非你使用了某某插件。既然这样我们就自己用原生的方法把文件上传至服务器吧。

我们还是借用上次写好的一个生产XMLHttpRequest对象的方法。 */
~~~js
function  createXHR(){

  if( typeof XMLHttpRequest != "undefined"){
    return  new XMLHttpRequest();
  }
  if(typeof ActiveXobject == "undefined"){
    throw new Error(" not support ");
  }
  //判断是否为 IE
  if(typeof arguments.callee.activeString != "string"){
    var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp3.0","MSXML2.XMLHttp"],
      i,len;

    for (var i = 0;i<versions.length;i++) {
      try{
          new ActiveXobject(versions[i]);
          arguments.callee.activeString=versions[i];
          break;
      }catch(ex){
        //  no action
      }
    };
  }
  return  new ActiveXobject(arguments.callee.activeString);
}

/* 
<body>
  <article>
    <header id="header"><h1>读取部分内容</h1></header>

    <section class="box">
    <form id="form" enctype='multipart/form-data' method='post'   action='#'>
      <div class="upload-label"><h2>请选择文件</h2></div>
      <div class="upload-box add-button"></div>
      <button class="upload-button" type="submit">上传</button>
      <input type="file" name="files"  id="files" >
    </form>
    </section>
  </article>
</body>
 */ 

$（function(){
  var maxlen = 1,
    filelist = [],  //文件列表
    targetId = 'files',
    isUpload = false;
  /*上回介绍的本地读取图片方法 add filter 方法 就不在介绍 */
  $(".add-button").bind('click',add);
  $("#files").bind('change',filter); 

   $(".upload-button").bind("click",function(e){
    e.preventDefault();
    if(filelist.length <= 0){  /* 没有需要上传的文件 */
      return ;
    }
    if(!isUpload){  /*文件未上传*/
      //测试 只发送第一个filelist数组的第一个file对象 
      uploadImage(targetId,filelist[0]);//执行uploadImage方法
    }else{
      /* '文件正在上传'*/;
    }
  });
   // 修改了addImage方法,这个方法是被filter方法所调用
  function addImage(file){
  //给文件对象添加了一个id标示
  file.id = (file.lastModifiedDate + "").replace(/\W/g, '')+ file.size;
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e){
    // 显示图片
     reader.myload.wrapInner('<img style="width:100%;height:100%; padding:.2rem;" src="'+reader.result+'" alt="'+file.name+'" />');
     delete reader ;
  }
  reader.onprogress =function(e){
    // 显示加载进度状态
    if(e.lengthComputable){
      reader.myload = reader.myload || $('<div class="upload-box" id="'+file.id+'"></div>').insertBefore('.add-button');
      reader.myload.text( Math.ceil((e.loaded / e.total) * 100) +"%");
      console.log(e.loaded / e.total);
    }
  }

  }
  function uploadImage(target,file){
    /*详细代码在后面介绍*/
  }
});

/*  
大家肯定是来看slice方法使用的,至于后面的都是例子了,写的不是很好,我就挑重点的说了。核心就是将File对象分割成小的blob对象,通过FormData对象的append方法添加至表单中,因为是分割发送的所以要保证文件发送在服务端的唯一性。上面我自己添加的 file.id 只是作为一个示范id，可以有许多改进。（问题大大的存在） 
下面我们来看看uploadImage方法的代码
*/ 

function uploadImage(target,file){

 if(file == undefined){
  AnimateUtils.info('至少选择一个文件');
  return ;
 }

 var formData,
   //创建一个XMLHttpRequest对象
   xhr = createXHR(), 
   //服务端接收tmp文件的键名
   targetId = target; 
   //创建一个携带数据的FormData对象
   function createData(data){
    var formData = new FormData();
    for(var name in data){
      formData.append(name,data[name]);
    }
      return formData;
   }
     // 数据封装
    var data = {
      'startbyte' : 0,
      'loadsize'  : 1024 * 128,
      'totalsize' : file.size,
      'filetype'  : file.type,
      'filename'  : file.name,
      'key'     : targetId
    };
  //新的文件名  
  data['fileid'] = file.id; 
  //新的文件名后缀
  data['suffix'] = file.name.substr(file.name.lastIndexOf('.'));
  //分割的文件二进制对象
  data[targetId] = blobSlice(file,data.startsize,data.startbyte+data.loadsize);
  //封装值FormData对象中
  formData = createData(data);
  //ajax请求前的参数设置
  xhr.open('post','upload.php');

    xhr.onload  = function (){
      if (this.status == 200) {
      // 要求传递的为json格式数据
        var json = JSON.parse(xhr.responseText);
        if( !json.complete ){
            //尚未完全上传, 更新下次上传数据
            data.startbyte = json.nextbyte;
            data.loadsize  = json.loadsize;
            data[targetId] = blobSlice(file,data.startbyte,data.startbyte+json.loadsize);
        //生成新的表单对象
            formData = createData(data);
            // 延时 1s发送请求, 可自定义
            setTimeout(function(){
              //再次发送
              xhr.open('post','upload.php');
              xhr.send(formData);
            },1000);
        }else if(json.complete){
         // 上传成功 删除 filelist数组的指定的file对象
         // 设置上传的状态为未上传.
          isUpload = false;
        }
      }
    };
  //开始发送数据
  xhr.send(formData);
  isUpload = true;
}
~~~

如果大家想要加点什么duangduang的效果也是可以的，不过我写的效果一般,就不拿出来说了。这里比较重要的就是那个data数据里面的内容. 
2.data数据介绍 
{ 
fileid : 上传后保存的文件id 
startbyte : 起始的文件位置 针对 file对象 
loadsize : 准备分割的大小 
totalsize : 整个文件的大小 
filetype : 文件类型 
filename : 文件原始名称 
suffix : 文件后缀名 
key ：上传至服务器的file文件键名 
targetId : 文件二进制对象 
} 
其实有很多数据可以不必要传送的,测试的时候就把相关的数据都放上去了。

3.回送的json数据介绍 
回送的时候有两种情况,一种是未全部上传完,另外一种就是以及全部上传完毕。 
未上传 
{ 
complete : false, 
nextbyte : xxx 下一次需要上传的其实位置 
loadsize : 下一次需要读取的大小 
} 
上传完成 
{ 
complete : true 
imageURL : 文件上传后服务器的地址 
} 
介绍到这里,我们就需要去看看服务器端的代码了,由于没有用任何框架,也没有太多判断变量类型和请求源,因此肯定不是安全的，但还是比较可用的.

~~~php
<?php

$filename = $_POST['fileid'].$_POST['suffix'];
$uploadDir = "/upload/img/";
//验证上传类型是否合法
if(($_POST['totalsize'] - $_POST['startbyte']) > 0 || intval($_POST['loadsize']) != 0){
//上传文件的键名
$key = $_POST['key'];

$uploadDir = $_SERVER['DOCUMENT_ROOT'].$uploadDir;
$filename = $uploadDir.$filename;
//以追加的形式写入文件 所以fileId 十分关键,如果服务端已经存在的话,会导致文件再次填写,源文件破坏
file_put_contents($filename,file_get_contents($_FILES[$key]['tmp_name']), FILE_APPEND);

$nextbyte =  $_POST['loadsize']  + $_POST['startbyte'];
$lesssize =  $_POST['totalsize'] - $nextbyte;
// 检测是否需要更改 loadsize大小
$loadsize =  ($_POST['loadsize']  - $lesssize) > 0 ? $lesssize : $_POST['loadsize'];
echo json_encode(
        array( 'complete'=>false,
             'nextsize'=> $nextbyte,
             'loadsize'=> $loadsize
        ));
}else{
  $imageURL = $uploadDir.$filename;
  echo json_encode(array('complete'=>true,'imageURL'=>$imageURL));
}
exit;
?>
~~~


### 图片预览

~~~html
//filereader 的方法
<form action="" enctype="multipart/form-data">
    <input id="file" class="filepath" onchange="changepic(this)" type="file"><br>
    <img src="" id="show" width="200">
</form>
<script>
    function changepic() {
        var reads= new FileReader();
        f=document.getElementById('file').files[0];
        reads.readAsDataURL(f);
        reads.onload=function (e) {
            document.getElementById('show').src=this.result;
        };
    }
</script>

//createObjectURL的方法
<form action="" enctype="multipart/form-data">
    <input id="file" class="filepath" onchange="changepic(this)" type="file"><br>
    <img src="" id="show" width="200">
</form>
<script>
    function changepic(obj) {
        //console.log(obj.files[0]);//这里可以获取上传文件的name
        var newsrc=getObjectURL(obj.files[0]);
        document.getElementById('show').src=newsrc;
    }
    //建立一個可存取到該file的url
    function getObjectURL(file) {
        var url = null ;
        // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }
</script>
~~~


### FileReader 和 FormData

1.检测浏览器对FileReader兼容性的方法：

~~~js
if(window.FileReader) {  
    var fr = new FileReader();  
    // add your code here  
}  
else {  
    alert("Not supported by your browser!");  
} 
/*方法二：检测FileReader类型*/
if(typeof FileReader==='undefined'){
    alert('您的浏览器不支持图片上传，请升级您的浏览器');
      return false;
 }
~~~

2.调用fileReader对象的方法 
FileReader实例拥有四个方法，其中三个是用来读取文件，另一个是用来中断读取的。需要注意的是，无论读取成功或是失败，方法并不会返回读取结果，这一结果(储存在result属性中)要用FileReader处理事件去获取；

| 方法名             | 参数            | 描述                 |
| ------------------ | --------------- | -------------------- |
| abort              | none            | 中断读取             |
| readAsBinaryString | file            | 将文件转化为二进制码 |
| readAsDataURL      | file            | 将文件读取为DataURL  |
| readAsText         | file,[encoding] | 将文件读取为文本     |

**readAsText**：该方法有两个参数，其中第二个参数是文本的编码方式，默认值为 UTF-8。这个方法非常容易理解，将文件以文本方式读取，读取的结果即是这个文本文件中的内容。 
**readAsBinaryString**：该方法将文件读取为二进制字符串，通常我们将它传送到后端，后端可以通过这段字符串存储文件。 
**readAsDataURL**：这是例子程序中用到的方法，该方法将文件读取为一段以 data: 开头的字符串，这段字符串的实质就是 Data URL，Data URL是一种将小文件直接嵌入文档的方案。这里的小文件通常是指图像与 html 等格式的文件。

3.处理事件 
FileReader 包含了一整套完成的事件模型，用于捕获读取文件时的状态,下面这个表格归纳了这些事件。

 

| 事件        | 描述                               |
| ----------- | ---------------------------------- |
| onabort     | 中断时触发                         |
| onerror     | 出错时触发                         |
| onload      | 文件读取成功完成时触发             |
| onloadend   | 读取完成时触发，无论读取成功或失败 |
| onloadstart | 读取开始时触发                     |
| onprogress  | 读取中                             |

------

> XMLHttpRequest Level 2添加了一个新的接口 - - - **FormData** 对象，我们可以通过 javascript 用一些键值对来模拟表单提交，我们还可以用XMLHttpRequest 的 send() 方法来异步的提交表单。与普通的 Ajax 相比，使用 FormData 的最大优点就是我们可以异步上传二进制文件。

#### 创建一个FormData 对象

你可以创建一个空的FormData对象，然后使用append()方法想该对象添加字段，如下：

~~~js
var oMyForm = new FormData();

oMyForm.append("username", "Groucho");
oMyForm.append("accountnum", 123456); // 数字123456被立即转换成字符串"123456"

// fileInputElement中已经包含了用户所选择的文件
oMyForm.append("userfile", fileInputElement.files[0]);

var oFileBody = "<a id="a"><b id="b">hey!</b></a>"; // Blob对象包含的文件内容
var oBlob = new Blob([oFileBody], { type: "text/xml"});

oMyForm.append("webmasterfile", oBlob);

var oReq = new XMLHttpRequest();
oReq.open("POST", "http://foo.com/submitform.php");
oReq.send(oMyForm);
~~~

注：字段 “userfile” 和 “webmasterfile” 的值都包含了一个文件。通过 FormData.append() 方法赋给字段 “accountnum” 的数字被自动转换为字符（字段的值可以是一个 Blob 对象，File对象或者字符串，剩下其他类型的值都会被自动转换成字符串）。 
在该例子中，我们创建了一个名为 oMyForm 的 FormData 对象，该对象中包含了名为”username”，”accountnum”，”userfile” 以及 “webmasterfile” 的字段名，然后使用XMLHttpRequest的 send() 方法把这些数据发送了出去。”webmasterfile” 字段的值不是一个字符串,还是一个 Blob 对象。

#### 使用form表单初始化一个FormData对象

可以用一个已有的 form 元素来初始化 FormData 对象，只需要把这个 form 元素作为参数传入 FormData 构造函数即可：

~~~js
var formElement = document.getElementById("myFormElement");
var oReq = new XMLHttpRequest();
oReq.open("POST", "submitform.php");
oReq.send(new FormData(formElement));
~~~

#### 浏览器兼容性

| Feature          | Chrome | Firefox(Gecko) | IE   | Opera | Safari |
| ---------------- | ------ | -------------- | ---- | ----- | ------ |
| Basic support    | 7+     | 4.0(2.0)       | 10+  | 12+   | 5+     |
| 支持filename参数 | (yes)  | 22.0(22.0)     | ?    | ?     | ?      |

------

**下面是我的项目代码：**

~~~html
<div class="issue-project-main clearfix" id='issue_project_main'>
<form  v-on:submit.prevent="submit_issue_project()" id="project_form">
       <div class="issue-project-left">
        <div v-if="images.length >0">
            <ul>
                <li v-for="(image,key) in images" style="position:relative;">
                    <img :src="image" @click='delImage(key)' class="image-upload"/>
                    <a href="#" class="remove-box" @click='delImage(key)'>
                        <span class="image-remove"></span>
                    </a>
                </li>
            </ul>
            <!-- <button @click="removeImage">移除全部图片</button> -->
            <!-- <button @click='uploadImage' >上传</button> -->
        </div> 
        <div v-show="showbutton">
            <a id='addPic' href="" v-on:click="addPic">上传项目图片 </a>
            <input type="file" id="imagebox" v-on:change="getImage()"     @change="onFileChange" name="image" style="display: none;">
        </div>
    </div>
   <div class="issue-project-form-list issue-project-form-btn">
                  <p class='errormsg' v-text='errormsg'></p>
                  <div class="mask-submit" v-if='disabled'></div>
                  <input type="submit" class="issue-project-btn" value="完成"/>
                  <input type="button" class="cancel-project-btn" value="取消" @click='back' />
              </div>
          </div>
      </form>
 </div>
~~~

~~~js
var issue_project = new Vue({
        el:'#issue_project_main',
        data:{
            showbutton:true,
            disabled:false,
            url_ajax:'',
            images: []//显示的图片
        },
        watch:{
            images:function(){
                if(this.images.length >0){
                    this.showbutton = false
                }else{
                    this.showbutton = true
                }
            }
        },
        methods: {
            /*以下是上传图片的js*/
            getImage:function(){
                file = $("#imagebox")[0].value
            },
            addPic:function(e){
                e.preventDefault();
                $('input[type=file]').trigger('click');
                return false;
            },
            onFileChange:function(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return; 
                this.createImage(files);
            },
            createImage:function(file) {
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var image = new Image();         
                var vm = this;
                var leng=file.length;
                for(var i=0;i<leng;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]); 
                    reader.onload =function(e){
                    vm.images.push(e.target.result);                                    
                    };                 
                }                        
            },
            delImage:function(index){
                this.images.shift(index);
            },
            removeImage: function(e) {
                this.images = [];
            },
            /*以上是上传图片的js*/
            submit_issue_project:function(){
                var _this = this;
                _this.url_ajax = '/vdg/api/project/create'
                if(edit){
                    _this.url_ajax = '/vdg/api/project/update'
                }
                var formElement = document.getElementById("project_form");
                var formData = new FormData(formElement);
                axios({
                    method: 'post',
                    url: _this.url_ajax,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(function(res){
                    console.log(res);
                }).catch(function(error) {
                    console.log(error);
                });
            }
        },
    })
~~~

### FileReader和FormData实现图片预览和上传(base64转二进制文件)

预览：预览使用 `FileReader` 对象来读：

~~~js
function preview(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
 
    reader.onloadend = function () {
        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
        var dataURL = reader.result;
        var img = new Image();
        img.src = dataURL;
        // 插入到 DOM 中预览
        // ...
    };
    reader.readAsDataURL(file); // 读出 base64
}
~~~

##### 提交图片文件（二进制文件 非 base64）

base64 转 二进制文件

~~~js
/**
 * dataURL to blob, ref to https://gist.github.com/fupslot/5015897
 * @param dataURI
 * @returns {Blob}
 */
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
}
var fd = new FormData();
var blob = dataURItoBlob(dataURL);
fd.append('file', blob);
 
 
$.ajax({
    type: 'POST',
    url: '/upload',
    data: fd,
    processData: false, // 不会将 data 参数序列化字符串
    contentType: false, // 根据表单 input 提交的数据使用其默认的 contentType
    xhr: function() {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                console.log('进度', percentComplete);
            }
        }, false);
 
        return xhr;
    }
}).success(function (res) {
    // 拿到提交的结果
}).error(function (err) {
    console.error(err);
});
~~~

注意：不要漏了指定 `processData` 和 `contentType` 为 `false` 。

#### 压缩

业务中不需要前端不需要压缩，因为后端有更靠谱的压缩方案，但是前端其实也可以压缩，那就是用 `canvas` 把图画出适合的大小，然后上传。

#### 主要流程：

- 在 `new` 出来的 `Image` 对象，我们监听它的 `onload` 事件
- 按照压缩比例，算出压缩后的图片尺寸
- 创建 `canvas` ，尺寸设置成上一步骤算出来的压缩后的图片尺寸
- 调用 `drawImage` 方法，把图片绘制到 `canvas` 中
- 调用 `canvas` 的 `toDataURL` ，取出 `base64` 格式的数据
- 后续的传图步骤和上面的原图上传一样

~~~js
var img = new Image();
 
img.onload = function () {
    // 当图片宽度超过 400px 时, 就压缩成 400px, 高度按比例计算
    // 压缩质量可以根据实际情况调整
    var w = Math.min(400, img.width);
    var h = img.height * (w / img.width);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
 
    // 设置 canvas 的宽度和高度
    canvas.width = w;
    canvas.height = h;
 
    // 把图片绘制到 canvas 中
    ctx.drawImage(img, 0, 0, w, h);
 
    // 取出 base64 格式数据
    var dataURL = canvas.toDataURL('image/png');
 
    // ...
};
 
img.src = reader.result;
~~~

PS：需要注意的是，通过 `canvas` 绘制的图片，低版本 `IOS` 会出现比例不正确的情况

###  上传本地图片遇到的问题

~~~js
/**
 * @description 校验文件类型是否是图片文件
 * @param file_id 图片文件选择对应的id
 */
function validateFileType(file_id) {
    try {
        var filePath = $("#"+file_id+"").val() ;    //获取文件路径
        var extStart = filePath.lastIndexOf(".") ;
        var ext = filePath.substring(extStart, filePath.length).toUpperCase() ;    //获取文件拓展名
        //判断文件是否是图片文件
        if(ext !=".JPG" && ext != ".PNG" && ext != ".BMP" && ext != ".DIF" && ext != ".JPEG"){
            return false;
        }
        return true ;    
    } catch (e) {
        // TODO: handle exception
        alert('错误','校验图片类型异常','error') ;
    }
}

/**
 * @description 获取图片文件大小
 * @param file_id 图片文件选择对应的id
 * @returns fileSize 图片文件大小（单位为byte）
 */
function getFileSize(file_id) {
    try {
        var fileInput = $("#"+file_id+"")[0] ;
        var fileSize = fileInput.files[0].size ;
        return fileSize ;        
    } catch (e) {
        // TODO: handle exception
        alert('错误','获取文件大小异常','error') ;
    }
}
//查看图片
$("#showPicture").click(function(){
   var reader = new FileReader();  
   reader.readAsDataURL($("#file")[0].files[0]);
   reader.onload = function(evt){
   　　var imgSrc = evt.target.result;
      $("#picture").attr("src", imgSrc) ;
   } ;
   return false ;
}) ;

/**
 * @description 图片大小自适应
 * @param maxWidth: 最宽限；  maxHeight： 最高限；  width： 图宽；   height： 图高
 * @returns param 
 */
function pictureFit_auto( maxWidth, maxHeight, width, height ){
    //图片返回信息   
    var param = {top:0, left:0, width:width, height:height};  
    if(width > height){        //宽 > 高
        param.width = maxWidth-4 ;
        param.height = (param.width/width)*height ;
        param.left = 2;  
        param.top = Math.round((maxHeight - param.height) / 2);  
    }else{
        param.height = maxHeight-4 ;
        param.width = (param.height/height)*width
        param.left = Math.round((maxWidth - param.width) / 2);  
        param.top = 2;  
    }   
    return param;  
}  

~~~

