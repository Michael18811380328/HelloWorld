### 跨域访问解决方案

跨域访问常见报错：

No 'Access-Control-Allow-Origin' header is present on the requested resource.'Ajax

#### 跨域访问

在一个网站中，使用ajax获得另一个不同域的网站的内容。两个域名之间不能跨越域名发送请求或者请求数据，否则就是不安全的。跨域访问违反了同源策略。浏览器的ajax只能访问和他同源的HTML页面同源的资源。

#### 服务器端解决方案

在服务器端的filter或者servlet里面添加 
response.setHeader("Access-Control-Allow-Origin", "*"); 
“Access-Control-Allow-Origin”表示允许跨域访问，“*”表示允许所有来源进行跨域访问，这里也可以替换为特定的域名或ip。 
很显然，这种方式对非网站拥有人员来说是不能做到的。而且此种方式很容易受到CSRF攻击。

#### 浏览器（客户端解决方案）

将ajax中的请求设置为jsonp（专门为了解决跨域问题使用的）
~~~js

$(function($){
	var url = 'http://www.baidu.com/index';
	$.ajax(url, {
		data: {
				'data': '20180818'
			},
		dataType: 'jsonp',
		crossDomain: true,
		success: fucntion(data) {
				if (data && data.resultcode == '200'){
					console.log(data.result.today);
				}
			}
		});
});

~~~



