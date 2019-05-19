## AdBlock Plus 过滤规则介绍

1. 顶部导航栏中的图片广告。方法：通过正则表达式拦截这些图片 `http://example.com/ads/*`
2. 对URL请求的拦截，这种URL广告一般是网页中div元素嵌入了一个iframe/image元素，然后加载一个广告链接或者GIF图片。
3. 页面DOM嵌入广告内容的处理，这种一般是通过CSS3 Selector定位到这些DOM元素，然后设置其display等于none !important。最好是在浏览器内核里做一个DOM Mutation事件监控的daemon：如果检测到有新的DOM节点加入，当然必须是在DOM Content Loaded之后，就发送一个通知给客户端，客户端再调度广告屏蔽脚本的重新执行。这样在彻底清除广告的同时，又降低对性能的影响。
4. 引入协作式过滤：当用户标明网页中的某个元素属于广告，那么，浏览器内核可以智能地定位到这个DOM元素，并生成一个有效的CSS Selector，这样就可以动态地扩展用户的本地过滤规则库，然后再通过上传到云端服务器形成大数据，从中挖掘出公共的广告拦截规则库
5. 加cookies，对于有些广告，比如网站的app推广，第一次进入网站时会弹出来，然后叉掉后加入cookie，第二次访问就不会出现了。对于这种广告可以通过浏览器主动添加到cookie的方式，这样用户第一次访问也不会跳出广告。
6. 模拟点击，对于有些可以叉掉的广告，而又没有cookie，每次访问都会出现，可以写脚本让浏览器帮你进行网页模拟点击，直接帮点击那个叉，但碰到网速不好，特别是移动端很可能出现广告出现一下就消失的效果，用户体验可能不是很好

2.**ADBlock官方过滤规则**

​         从官方的easylistchina.txt规则表中([https://easylist-downloads.adblockplus.org/](https://link.jianshu.com?t=https://easylist-downloads.adblockplus.org/)easylistchina.txt)，总结了几种常用规则：1）基本过滤规则，要拦截的url地址，如：[http://example.com](https://link.jianshu.com?t=http://example.com/)。 

​        2）定义例外规则，可以使用@@表示后面的是例外，不会拦截；也可以配合|使用。如：@@|http://example.com。

​        3）匹配网址开头和结尾，使用管线符号|表示最前端或者最末端。如：阻挡以swf结尾，swf|；阻挡以http开头的，|http。||开头可以匹配http://、https://和http://www.等协议的开头。

​        4）标记分隔符，通常需要接受过规则的任何分隔符，分隔符可以除了字母、数字或_-.%之外的任意字符。

​        5）注释，使用！作为注释的开始，也可以在注释的上面书写任何想些的文案。

​        6）限定的特定域名，如果在域名之前有“~”，该过滤规则不适用于这个域名的页面（需要AdBlock Plus 1.1或更高版本）。例如，~example.com##*.sponsor将适用于除了“example.com”之外的域名。

​        7）标记分隔符，通常您需要接受过滤规则的任何分隔符。例如，您可能写这样一个规则阻挡http://example.com/和http://example.com:8000/但不能阻挡http://example.com.ar/。在这里，符号(^)用作一个分隔符。分隔符可以是除了字母、数字或者_ – . %之外的任何字符。

​       8）CSS元素，使用##开头，classname用.，id用#。

特殊处理：

如果部分网页或者图片是合适的图片，在正则表达之前定义额外的规则。

参考网址：https://adblockplus.org/zh_CN/filters