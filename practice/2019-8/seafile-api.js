// Seafile-api-learning
// 这是学习文件，正常文件还在原处
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
// 引入外部文件

class SeafileAPI {
// class相当于构造函数创建对象，ES6

  init ({ server, username, password, token }) {
    this.server = server;
    this.username = username;
    this.password = password;
    this.token = token;  //none
    // token：减轻服务器的压力，减少频繁查询数据库。token是客户端频繁向服务器端请求数据，服务器频繁的去数据库查询用户名和密码，并做出相应的提示。
    // 在用户登录成功后，后台需要返回一个token给前端，需要把token保存到本地，每次发送请求，只需要在header中带上token，不需要带上用户名和密码，本地的token和后台token进行验证，如果两者相同就请求成功。
    // 通常使用设备号-mac地址（客户端需要带设备好或者mac地址作为参数传递），或者session值作为token。
    // 与前端相关内容：在ajax中需要设置请求头
    if (this.token && this.server) {
      this.req = axios.create({
        baseURL: this.server,
        headers: { 'Authorization': 'Token ' + this.token }
      });
    }
    // create是ES5的方法，可以创建一个新对象，被创建的对象继承自新对象的原型。
    return this
  }

  initForSeahubUsage ({ siteRoot, xcsrfHeaders }) {
    // csrf：跨域请求伪造；跨站点伪造请求，是一种不利于网站的行为
    if (siteRoot && siteRoot.charAt(siteRoot.length-1) === "/") {
      var server = siteRoot.substring(0, siteRoot.length-1);
      this.server = server;
    } else {
      this.server = siteRoot;
    }

    this.req = axios.create({
      headers: {
        'X-CSRFToken': xcsrfHeaders,
      }
    });
    return this;
  }

  /**
   * 获取token函数
   * @return 使用post发送一个url，以及用户名和用户密码，将响应值作为token并返回。
   */
  getToken() {
    const url = this.server + '/api2/auth-token/';
    // const定义的变量不能改变
    axios.post(url, {
      username: this.username,
      password: this.password
      // 使用post将name和password传过去
    }).then((response) => {
      this.token = response.data;
      return this.token;
    })
    // 回调函数响应值存储为当前token值
  }

  /**
   * Login to server and create axios instance for future usage
   */
  // 登录服务器并创建axios实例，以后会用
  // Axios 是一个基于 promise 的HTTP 库，可以用在浏览器和node.js中。当前理解axios就是ajax，具有get和post方法传递数据。
  /* 例如：发送 POST 请求
      axios({
        method: 'post',
        url: '/user/12345',
        data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
        }
      });
  */
 
  /**
   * 登录函数
   * @return {} [返回一个post请求，将用户名和密码传递，对响应值进行处理，设置token和req（request）]
   */
  login() {
    const url = this.server + '/api2/auth-token/';
    return axios.post(url, {
      username: this.username,
      password: this.password
    }).then((response) => {
      this.token = response.data.token;
      this.req = axios.create({
        baseURL: this.server,
        headers: { 'Authorization': 'Token ' + this.token }
      });
    })
  }

  /**
   * 自动Ping
   * @return ping：判断网络是否连通，客户端向服务器发送一个包，服务器返回一个包用来判断网络是否连通。
   */
  authPing() {
    const url = this.server + '/api2/auth/ping/';
    return this.req.get(url);
  }

  // 账户API
  //---- Account API

  /**
   * 获取用户信息
   * @return 返回get方法获取的对象
   */
  getAccountInfo() {
    const url =  this.server + '/api2/account/info/';
    return this.req.get(url)
  }

  //---- repo API
  //reops——repository 文件仓库

  listRepos() {
    const url = this.server + '/api2/repos/';
    return this.req.get(url);
  }

  //---- folder API
  //文件夹API

  listDir(repoID, dirPath, opts = {}) {
    const { recursive } = opts;
    // 这一句不懂（opts对象的递归？）
    var url =  this.server + '/api2/repos/' + repoID + '/dir/?p=' + dirPath;
    // 把服务器、仓库ID和dirPath拼接成url
    if (recursive) {
      url = url + '&recursive=1';
    }
    return this.req.get(url);
  }

  // slug：动作迟缓？
  // wiki 多人写作的目录
  // 多人写作的目录迟缓？
  listWikiDir(slug) {
    const url = this.server + '/api/v2.1/wikis/' + slug + '/dir/';
    return this.req.get(url);
  }

  //---- file api
  //文件API

  /**
   * 获取共享文件的内容
   * @param  {[type]} slug     [动作迟缓]
   * @param  {[type]} filePath [文件路径]
   * @return {[type]}          [一个请求]
   */
  getWikiFileContent(slug, filePath) {
    const path = encodeURIComponent(filePath);
    const url = this.server + '/api/v2.1/wikis/' + slug + '/content/' + '?p=' + filePath;
    return this.req.get(url)
    // 把slug和文件路径拼接成url并get
  }

  /**
   * 获取文件信息
   * @param  {[type]} repoID   [ID]
   * @param  {[type]} filePath [文件路径]
   * @return {[type]}          [一个请求]
   */
  getFileInfo(repoID, filePath) {
    const url = this.server + '/api2/repos/' + repoID + '/file/detail/?p=' + filePath;
    return this.req.get(url);
    // 把repoID和文件路径拼接成url并get发送
  }

  /**
   * 给文件加星号
   * @param  {[type]} repoID   [ID]
   * @param  {[type]} filePath [文件路径]
   * @return {[type]}          [description]
   */
  starFile(repoID, filePath) {
    const url = this.server + '/api2/starredfiles/';
    // 拼接URL
    let form = new FormData();
    // var定义全局变量或者函数变量，let定义块级变量，const定义不变量。
    form.append('repo_id', repoID);
    form.append('p', filePath);
    return this.req.post(url,form)
  }

  /**
   * 删除星号文件
   * @param  {[type]} repoID   [ID]
   * @param  {[type]} filePath [文件路径]
   * @return {[type]}          [description]
   */
  unStarFile(repoID, filePath) {
    const url = this.server + "/api2/starredfiles/?repo_id=" + repoID + "&p=" + filePath;
    return this.req.delete(url);
  } 

  // 获取文件下载的链接
  getFileDownloadLink(repoID, filePath) {
    // reuse default to 1 to eliminate cross domain request problem
    //   In browser, the browser will send an option request to server first, the access Token
    //   will become invalid if reuse=0
    const url = this.server + '/api2/repos/' + repoID + '/file/?p=' + filePath + '&reuse=1';
    return this.req.get(url);
  }


  // 获取文件内容
  getFileContent(downloadLink) {
    return axios.create().get(downloadLink);
  }
  // axios 是一个在前端开发中是使用频率极高的库。它既能运行在浏览器中，又可在 Node.js 后端项目中使用。
  // 可以通过 axios.create 创建一个实例，对该实例进行一些配置，便得到了一个专门用来与后端服务器进行通信的 ajax 函数。

  // 获取上传的链接
  getUpdateLink(repoID, folderPath) {
    const url = this.server + '/api2/repos/' + repoID + '/update-link/?p=' + folderPath;
    return this.req.get(url)
  }

  /**
   * 上传文件
   * @param  {[type]} uploadLink [上传路径]
   * @param  {[type]} filePath   [文件路径]
   * @param  {[type]} fileName   [文件名称]
   * @param  {[type]} data       [数据]
   * @return {[type]} [返回一个axios对象]
   */
  updateFile(uploadLink, filePath, fileName, data) {
    let formData = new FormData();
    // 创建局部变量
    formData.append("target_file", filePath);
    formData.append("filename", fileName);

    let blob = new Blob([data], { type: "text/plain" });

    formData.append("file", blob);

    return (
      axios.create()({
        method: 'post',
        url: uploadLink,
        data: formData,
      })
    );
    // 返回一个axios对象
  }

  // 上传图片
  uploadImage (uploadLink, formData) {
    return (
      axios.create()({
        method: "post",
        data: formData,
        url: uploadLink
      })
    );
  }

  // 获取文件历史？
  getFileHistory(repoID, folderPath) {

    const url = this.server + "/api2/repos/" + repoID + "/file/history/?p=" + folderPath;

    return this.req.get(url);
  }

   
  // 获取上传链接
  getUploadLink(repoID, folderPath) {
    const url = this.server + '/api2/repos/' + repoID + '/upload-link/?p=' + folderPath + '&from=web';
    return this.req.get(url);
  }

  // reops——repository 
  // 获取已分享的仓库
  getSharedRepos() {
    const url = this.server + '/api2/shared-repos/';
    return this.req.get(url);
  }

  // 获取被分享的仓库
  getBeSharedRepos() {
    const url = this.server + '/api2/beshared-repos/';
    return this.req.get(url);
  }

  // 创建目录
  createDirectory(repoID, folderPath) {
    const url =  this.server + '/api2/repos/' + repoID + '/dir/?p=' + folderPath;
    // 拼接路径
    let form = new FormData();
    form.append('operation', 'mkdir');

    return this.req.post(url, form, {
      headers: form.getHeaders()
    });
  }

}

export { SeafileAPI };
