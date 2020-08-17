# React使用axios进行ajax操作

#### GET:

```js
axios.get('/user?ID=12345').then(function (response) {
  console.log(response);
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);
}).catch(function (error) {
  console.log(error);
});
```

------

#### POST:

```js
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
}).then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.log(error);
});
```

------

#### 执行多个并发请求

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
  // 两个请求现在都执行完成
}));
```

------

#### 在React中使用:

```js
componentDidMount() {
  ajax_get('http://localhost:3000/',{'data':111},this,callback);
}

function ajax_post(url,data,that,callback){
  axios({
    method:"POST",
    headers:{'Content-type':'application/json',},
    url:URL+url,
    data:data,
    //withCredentials:true
  }).then(function(res){
    //alert('post:'+res)
    console.log(url+'\tPost请求到:');
    console.log(res);
    //alert('post-response:'+res);
    callback(that,res);
    //ajax_get('/manage/getinfo',this);
  }).catch(function(error){
    alert('post失败')
    console.log(error);
  });
}

function ajax_get(url,that,callback){
  axios({
    method:"GET",
    headers:{'Content-type':'application/json',},
    url:URL+url,
    withCredentials:true
  }).then(function(res){
    console.log(url+'\tGet请求到:')
    console.log(res);
    //alert('get:'+this.res);
    callback(that,res);

  }).catch(function(error){
    alert('get下载失败')
    console.log(error);
  });
}

function ajax_post_params(url,data,that,callback=()=>{}){
  axios({
    method: 'post',
    url: URL+url,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    params:data,
  })
    .then(function(res){
    //alert('post:'+res)
    console.log(url+'\tPost请求到:');
    console.log(res);
    //alert('post-response:'+res);
    callback(that,res);
    //ajax_get('/manage/getinfo',this);
  }).catch(function(error){
    alert('post失败')
    console.log(error);
  });
}
```