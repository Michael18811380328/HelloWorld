# React使用axios进行ajax操作

![96](https://upload.jianshu.io/users/upload_avatars/4559317/ec0b63b0-c0d2-421f-9984-8a93a00295cf.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96)

 

[小幸运Q](https://www.jianshu.com/u/3ec15e31acf0)

 

关注

2018.05.08 17:49* 字数 18 阅读 11103评论 2喜欢 3

------

#### GET:

```
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  })
  .catch(function (error) {
    console.log(error);
  });
```

------

#### POST:

```
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
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

------

#### 执行多个并发请求

```
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

```
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