# axios中文文档

![96](https://upload.jianshu.io/users/upload_avatars/3529092/a83d1595c0ec.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96)

 

[Lewis19990](https://www.jianshu.com/u/99de97f4a484)

 

关注

 5.6 2018.02.16 10:22* 字数 855 阅读 263734评论 7喜欢 127

原文地址：[lewis1990@amoy](https://link.jianshu.com/?t=http%3A%2F%2Fblog.lee-cloud.xyz%2Fpost%2F1%2FAxios-zhong-wen-wen-dang)

# axios

基于promise用于浏览器和node.js的http客户端

## 特点

- 支持浏览器和node.js
- 支持promise
- 能拦截请求和响应
- 能转换请求和响应数据
- 能取消请求
- 自动转换JSON数据
- 浏览器端支持防止CSRF(跨站请求伪造)

## 安装

npm安装

```
$ npm install axios
```

bower安装

```
$ bower install axios
```

通过cdn引入

```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## 例子

发起一个`GET`请求

```
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

发起一个`POST`请求

```
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

同时发起多个请求

```
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
```

## axios api

可以通过导入相关配置发起请求

#### axios(config)

```
// 发起一个POST请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
// 获取远程图片
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
```

#### axios(url[, config])

```
// 发起一个GET请求（GET是默认的请求方法）
axios('/user/12345');
```

### 请求方法别名

为了方便我们为所有支持的请求方法均提供了别名。

##### axios.request(config)

##### axios.get(url[, config])

##### axios.delete(url[, config])

##### axios.head(url[, config])

##### axios.options(url[, config])

##### axios.post(url[, data[, config]])

##### axios.put(url[, data[, config]])

##### axios.patch(url[, data[, config]])

###### 注释

当使用以上别名方法时，`url`，`method`和`data`等属性不用在config重复声明。

### 同时发生的请求

一下两个用来处理同时发生多个请求的辅助函数

##### axios.all(iterable)

##### axios.spread(callback)

### 创建一个实例

你可以创建一个拥有通用配置的axios实例

#### axios.creat([config])

```
var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

### 实例的方法

以下是所有可用的实例方法，额外声明的配置将与实例配置合并

##### axios#request(config)

##### axios#get(url[, config])

##### axios#delete(url[, config])

##### axios#head(url[, config])

##### axios#options(url[, config])

##### axios#post(url[, data[, config]])

##### axios#put(url[, data[, config]])

##### axios#patch(url[, data[, config]])

## 请求配置

下面是所有可用的请求配置项，只有`url`是必填，默认的请求方法是`GET`，如果没有指定请求方法的话。

```
{
  // `url` 是请求的接口地址
  url: '/user',

  // `method` 是请求的方法
  method: 'get', // 默认值

  // 如果url不是绝对路径，那么会将baseURL和url拼接作为请求的接口地址
  // 用来区分不同环境，建议使用
  baseURL: 'https://some-domain.com/api/',

  // 用于请求之前对请求数据进行操作
  // 只用当请求方法为‘PUT’，‘POST’和‘PATCH’时可用
  // 最后一个函数需return出相应数据
  // 可以修改headers
  transformRequest: [function (data, headers) {
    // 可以对data做任何操作

    return data;
  }],

  // 用于对相应数据进行处理
  // 它会通过then或者catch
  transformResponse: [function (data) {
    // 可以对data做任何操作

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // URL参数
  // 必须是一个纯对象或者 URL参数对象
  params: {
    ID: 12345
  },

  // 是一个可选的函数负责序列化`params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // 请求体数据
  // 只有当请求方法为'PUT', 'POST',和'PATCH'时可用
  // 当没有设置`transformRequest`时，必须是以下几种格式
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // 请求超时时间（毫秒）
  timeout: 1000,

  // 是否携带cookie信息
  withCredentials: false, // default

  // 统一处理request让测试更加容易
  // 返回一个promise并提供一个可用的response
  // 其实我并不知道这个是干嘛的！！！！
  // (see lib/adapters/README.md).
  adapter: function (config) {
    /* ... */
  },

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // 响应格式
  // 可选项 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认值是json

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // 处理上传进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // 处理下载进度事件
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // 设置http响应内容的最大长度
  maxContentLength: 2000,

  // 定义可获得的http响应状态码
  // return true、设置为null或者undefined，promise将resolved,否则将rejected
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  // 最大重定向次数？没用过不清楚
  maxRedirects: 5, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' defines the hostname and port of the proxy server
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  // 代理
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  // 用于取消请求？又是一个不知道怎么用的配置项
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

### 响应组成

response由以下几部分信息组成

```
{
  // 服务端返回的数据
  data: {},

  // 服务端返回的状态码
  status: 200,

  // 服务端返回的状态信息
  statusText: 'OK',

  // 响应头
  // 所有的响应头名称都是小写
  headers: {},

  // axios请求配置
  config: {},

  // 请求
  request: {}
}    
```

用`then`接收以下响应信息

```
axios.get('/user/12345')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

## 默认配置

### 全局修改axios默认配置

```
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### 实例默认配置

```
// 创建实例时修改配置
var instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 实例创建之后修改配置
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

### 配置优先级

配置项通过一定的规则合并，`request config` > `instance.defaults` > `系统默认`，优先级高的覆盖优先级低的。

```
// 创建一个实例，这时的超时时间为系统默认的 0
var instance = axios.create();

// 通过instance.defaults重新设置超时时间为2.5s，因为优先级比系统默认高
instance.defaults.timeout = 2500;

// 通过request config重新设置超时时间为5s，因为优先级比instance.defaults和系统默认都高
instance.get('/longRequest', {
  timeout: 5000
});
```

## 拦截器

你可以在`then`和`catch`之前拦截请求和响应。

```
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
```

如果之后想移除拦截器你可以这么做

```
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

你也可以为axios实例添加一个拦截器

```
var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

## 错误处理

```
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // 发送请求后，服务端返回的响应码不是 2xx   
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 发送请求但是没有响应返回
      console.log(error.request);
    } else {
      // 其他错误
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

你可以用`validateStatus`定义一个http状态码返回的范围.

```
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // Reject only if the status code is greater than or equal to 500
  }
})
```

## 取消请求

你可以通过`cancel token`来取消一个请求

> The axios cancel token API is based on the withdrawn [cancelable promises proposal](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-cancelable-promises).

You can create a cancel token using the `CancelToken.source` factory as shown below:

```
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');
```

You can also create a cancel token by passing an executor function to the `CancelToken` constructor:

```
var CancelToken = axios.CancelToken;
var cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
```

> Note: you can cancel several requests with the same cancel token.

## Using application/x-www-form-urlencoded format

By default, axios serializes JavaScript objects to `JSON`. To send data in the `application/x-www-form-urlencoded` format instead, you can use one of the following options.

### Browser

In a browser, you can use the [`URLSearchParams`](https://link.jianshu.com/?t=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FURLSearchParams) API as follows:

```
var params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

> Note that `URLSearchParams` is not supported by all browsers (see [caniuse.com](https://link.jianshu.com/?t=http%3A%2F%2Fwww.caniuse.com%2F%23feat%3Durlsearchparams)), but there is a [polyfill](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2FWebReflection%2Furl-search-params) available (make sure to polyfill the global environment).

Alternatively, you can encode data using the [`qs`](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fljharb%2Fqs) library:

```
var qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```

### Node.js

In node.js, you can use the [`querystring`](https://link.jianshu.com/?t=https%3A%2F%2Fnodejs.org%2Fapi%2Fquerystring.html) module as follows:

```
var querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

You can also use the [`qs`](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fljharb%2Fqs) library.

## Semver

Until axios reaches a `1.0` release, breaking changes will be released with a new minor version. For example `0.5.1`, and `0.5.4` will have the same API, but `0.6.0` will have breaking changes.

## Promises

axios depends on a native ES6 Promise implementation to be [supported](https://link.jianshu.com/?t=http%3A%2F%2Fcaniuse.com%2Fpromises).
If your environment doesn't support ES6 Promises, you can [polyfill](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fjakearchibald%2Fes6-promise).

## TypeScript

axios includes [TypeScript](https://link.jianshu.com/?t=http%3A%2F%2Ftypescriptlang.org) definitions.

```
import axios from 'axios';
axios.get('/user?ID=12345');
```

## Resources

- [Changelog](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Faxios%2Faxios%2Fblob%2Fmaster%2FCHANGELOG.md)
- [Upgrade Guide](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Faxios%2Faxios%2Fblob%2Fmaster%2FUPGRADE_GUIDE.md)
- [Ecosystem](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Faxios%2Faxios%2Fblob%2Fmaster%2FECOSYSTEM.md)
- [Contributing Guide](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Faxios%2Faxios%2Fblob%2Fmaster%2FCONTRIBUTING.md)
- [Code of Conduct](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Faxios%2Faxios%2Fblob%2Fmaster%2FCODE_OF_CONDUCT.md)

## Credits

axios is heavily inspired by the [$http service](https://link.jianshu.com/?t=https%3A%2F%2Fdocs.angularjs.org%2Fapi%2Fng%2Fservice%2F%24http) provided in [Angular](https://link.jianshu.com/?t=https%3A%2F%2Fangularjs.org%2F). Ultimately axios is an effort to provide a standalone `$http`-like service for use outside of Angular.

## License

MIT