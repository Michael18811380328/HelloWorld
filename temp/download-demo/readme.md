# 前端下载并打包文件

### 需求分析

现在后端给了一个借口，可以下载对应的文件（图片）

前端需要把文件打包成 zip 格式，然后通过浏览器下载

使用到的技术：jquery 异步请求；请求多个文件；获取文件并使用 zipJS 打包下载

### 技术难点

多文件下载异步处理

如果下载中出错，需要怎样处理

是否考虑大文件分片下载

### 项目使用

主要使用下面三个第三方库。jquery使用CDN实现，其他的可以执行 npm install 安装到本地环境

~~~html
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script src="./node_modules/jszip/dist/jszip.min.js"></script>
<script src="./node_modules/file-saver/dist/FileSaver.min.js"></script>
~~~

### 主要代码


~~~js
// 全局创建 zip 对象
var zip = new JSZip();

// 设置全部文件数量和已下载文件数量（初始值为0）
var urlLength = 0;
var zipLength = 0;

// 发出请求（获取下载多个文件的链接数组）
$.ajax({
  type: "GET",
  url: "http://m.tpfep.com/api/test/index",
  async: false,
  success: function (res) {
    if (Array.isArray(res)) {
      let urls = res;
      urlLength = urls.length;
      for (let j = 0; j < urlLength; j++) {
        download(urls[j]);
      }
    }
  }
});

// 下载每一个子文件，异步把下载好的文件存储到压缩对象中
function download(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("If-Modified-Since","0");
  xhr.responseType = "blob";

  xhr.onload = function() {
    if (this.status == 200) {
      var blob = this.response;
      zipFile(blob);
    }
    $("#export").attr("disabled",false);
  }
  xhr.send();
}

// 压缩文件（当压缩的文件数量等于全部文件数量，压缩完成，开始下载压缩包）
function zipFile(blob) {
  zip.file(urlLength + "Hello.doc", blob);      
  zipLength++;
  if (zipLength === urlLength) {
    console.log(zipLength);
    downLoadZip();
  }
}

// 产生压缩包并保存到本地
function downLoadZip() {
  // zip.folder("docs");
  zip.generateAsync({type:"blob"}).then(function(content) {
    saveAs(content, "example.zip");
  });
}
~~~


### 参考博客

https://blog.csdn.net/weixin_36896049/article/details/99287297

https://blog.csdn.net/weixin_41697143/article/details/89027238