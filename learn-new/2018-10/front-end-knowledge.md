### 前端主要技术点（总结记忆）

#### 概念

1、http工作原理

~~~markdown
HTTP协议定义Web客户端如何从Web服务器请求Web页面，以及服务器如何把Web页面传送给客户端。HTTP协议采用了请求/响应模型。客户端向服务器发送一个请求报文，请求报文包含请求的方法、URL、协议版本、请求头部和请求数据。服务器以一个状态行作为响应，响应的内容包括协议的版本、成功或者错误代码、服务器信息、响应头部和响应数据。下图表明了这种请求/响应模型。

以下是HTTP请求/响应的步骤：
（1）客户端连接到Web服务器
一个HTTP客户端，通常是浏览器，与Web服务器的HTTP端口（默认为80）建立一个TCP套接字连接。例如，http://www.oakcms.cn。
（2）发送HTTP请求
通过TCP套接字，客户端向Web服务器发送一个文本的请求报文，一个请求报文由请求行、请求头部、空行和请求数据4部分组成。
（3）服务器接受请求并返回HTTP响应
Web服务器解析请求，定位请求资源。服务器将资源复本写到TCP套接字，由客户端读取。一个响应由状态行、响应头部、空行和响应数据4部分组成。
（4）释放连接TCP连接
Web服务器主动关闭TCP套接字，释放TCP连接；客户端被动关闭TCP套接字，释放TCP连接。
（5）客户端浏览器解析HTML内容
客户端浏览器首先解析状态行，查看表明请求是否成功的状态代码。然后解析每一个响应头，响应头告知以下为若干字节的HTML文档和文档的字符集。客户端浏览器读取响应数据HTML，根据HTML的语法对其进行格式化，并在浏览器窗口中显示。
~~~

2、http缓存机制

~~~
https://blog.csdn.net/WuLex/article/details/77767855
https://blog.csdn.net/jutal_ljt/article/details/80021545#commentBox
~~~

3、首页性能优化

~~~
https://blog.csdn.net/weixin_41697143/article/details/81049804 移动端
https://www.cnblogs.com/MarcoHan/p/5295398.html
https://www.cnblogs.com/doseoer/p/5879749.html
~~~

4、vue双向数据绑定原理

5、vue依赖收集的实现

6、Promise实现原理



7、CDN缓存与客户端缓存

~~~
https://blog.csdn.net/weixin_41697143/article/details/82758630
~~~

8、get请求与post请求区别，优缺点

~~~markdown
GET请求
GET /books/?sex=man&name=Professional HTTP/1.1Host: www.wrox.comUser-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.6)Gecko/20050225 Firefox/1.0.1Connection: Keep-Alive
注意最后一行是空行
POST请求
POST / HTTP/1.1Host: www.wrox.comUser-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.6)Gecko/20050225 Firefox/1.0.1Content-Type: application/x-www-form-urlencodedContent-Length: 40Connection: Keep-Alivename=Professional%20Ajax&publisher=Wiley
1、GET提交，请求的数据会附在URL之后（就是把数据放置在HTTP协议头中），以?分割URL和传输数据，多个参数用&连接；例 如：login.action?name=hyddd&password=idontknow&verify=%E4%BD%A0 %E5%A5%BD。如果数据是英文字母/数字，原样发送，如果是空格，转换为+，如果是中文/其他字符，则直接把字符串用BASE64加密，得出如： %E4%BD%A0%E5%A5%BD，其中％XX中的XX为该符号以16进制表示的ASCII。
POST提交：把提交的数据放置在是HTTP包的包体中。上文示例中红色字体标明的就是实际的传输数据
因此，GET提交的数据会在地址栏中显示出来，而POST提交，地址栏不会改变
2、传输数据的大小：首先声明：HTTP协议没有对传输的数据大小进行限制，HTTP协议规范也没有对URL长度进行限制。
而在实际开发中存在的限制主要有：
GET:特定浏览器和服务器对URL长度有限制，例如 IE对URL长度的限制是2083字节(2K+35)。对于其他浏览器，如Netscape、FireFox等，理论上没有长度限制，其限制取决于操作系 统的支持。
因此对于GET提交时，传输数据就会受到URL长度的 限制。
POST:由于不是通过URL传值，理论上数据不受 限。但实际各个WEB服务器会规定对post提交数据大小进行限制，Apache、IIS6都有各自的配置。
3、安全性
POST的安全性要比GET的安全性高。比如：通过GET提交数据，用户名和密码将明文出现在URL上，因为(1)登录页面有可能被浏览器缓存；(2)其他人查看浏览器的历史纪录，那么别人就可以拿到你的账号和密码了，除此之外，使用GET提交数据还可能会造成Cross-site request forgery攻击
4、Http get,post,soap协议都是在http上运行的
（1）get：请求参数是作为一个key/value对的序列（查询字符串）附加到URL上的
查询字符串的长度受到web浏览器和web服务器的限制（如IE最多支持2048个字符），不适合传输大型数据集同时，它很不安全
（2）post：请求参数是在http标题的一个不同部分（名为entity body）传输的，这一部分用来传输表单信息，因此必须将Content-type设置为:application/x-www-form- urlencoded。post设计用来支持web窗体上的用户字段，其参数也是作为key/value对传输。
但是：它不支持复杂数据类型，因为post没有定义传输数据结构的语义和规则。
（3）soap：是http post的一个专用版本，遵循一种特殊的xml消息格式
Content-type设置为: text/xml 任何数据都可以xml化。
Http协议定义了很多与服务器交互的方法，最基本的有4种，分别是GET,POST,PUT,DELETE. 一个URL地址用于描述一个网络上的资源，而HTTP中的GET, POST, PUT, DELETE就对应着对这个资源的查，改，增，删4个操作。 我们最常见的就是GET和POST了。GET一般用于获取/查询资源信息，而POST一般用于更新资源信息.
我们看看GET和POST的区别
GET提交的数据会放在URL之后，以?分割URL和传输数据，参数之间以&相连，如EditPosts.aspx?name=test1&id=123456. POST方法是把提交的数据放在HTTP包的Body中.
GET提交的数据大小有限制（因为浏览器对URL的长度有限制），而POST方法提交的数据没有限制.
GET方式需要使用Request.QueryString来取得变量的值，而POST方式通过Request.Form来获取变量的值。
GET方式提交数据，会带来安全问题，比如一个登录页面，通过GET方式提交数据时，用户名和密码将出现在URL上，如果页面可以被缓存或者其他人可以访问这台机器，就可以从历史记录获得该用户的账号和密码.
~~~

9、进程与线程

~~~markdown
操作系统面试题

1、进程和线程的区别？
解析：（1）进程是资源的分配和调度的一个独立单元，而线程是CPU调度的基本单元
          （2）同一个进程中可以包括多个线程，并且线程共享整个进程的资源（寄存器、堆栈、上下文），一个进行至少包括一个线程。
          （3）进程的创建调用fork或者vfork，而线程的创建调用pthread_create，进程结束后它拥有的所有线程都将销毁，而线程的结束不会影响同个进程中的其他线程的结束
          （4）线程是轻两级的进程，它的创建和销毁所需要的时间比进程小很多，所有操作系统中的执行功能都是创建线程去完成的
          （5）线程中执行时一般都要进行同步和互斥，因为他们共享同一进程的所有资源
          （6）线程有自己的私有属性TCB，线程id，寄存器、硬件上下文，而进程也有自己的私有属性进程控制块PCB，这些私有属性是不被共享的，用来标示一个进程或一个线程的标志
2、死锁？死锁产生的原因？死锁的必要条件？怎么处理死锁？
解析：（--）相互等待资源而产生的一种僵持状态，如果没有外力的干预将一直持续这个状态
          （--）系统资源不足、相互竞争资源、请求资源顺序不当
          （2）互斥、不可抢占、循环等待、请求与保持
          （3）因为互斥是不可改变的，所以只能破坏其他三个条件中的一个来解除死锁，方法：剥夺资源、杀死其中一个线程
3、Windows内存管理方式：段存储、页存储、段页存储
解析：
4、进程的几种状态？
解析：（1）run（运行状态）：正在运行的进程或在等待队列中对待的进程，等待的进程只要以得到cpu就可以运行
          （2）Sleep（可中断休眠状态）：相当于阻塞或在等待的状态
          （3）D（不可中断休眠状态）：在磁盘上的进程
          （4）T（停止状态）：这中状态无法直观的看见，因为是进程停止后就释放了资源，所以不会留在linux中
          （5）Z（僵尸状态）：子进程先与父进程结束，但父进程没有调用wait或waitpid来回收子进程的资源，所以子进程就成了僵尸进程，如果父进程结束后任然没有回收子进程的资源，那么1号进程将回收
5、IPC通信方式？
解析：（1）管道（匿名管道（pipe亲缘关系的进程通信）、命名管道（mkfifo/mknod））
          （2）消息队列：是基于消息的、用无亲缘关系的进程间通信，主要函数：msgget、msgsend、msgrecv、msgctl
          （3）信号量：相当于一把互斥锁，通过p、v操作，主要函数：semget、semop、semctl
          （4）共享内存：是进程间通信速度最快的，所以用经常是集合信号量或互斥锁来实现同步，shmget、shmat、shmdt、shmctl
6、什么是虚拟内存？
解析：是将进程部分装入内存中，从而能实现一个很大的程序能在一个比它小的内存中运行，它的主要实现是靠程序的换进换出来实现的，因为内存中0~3G是用户使用，3~4G才是内存使用，通过映射来实现来进行逻辑地址到物理地址的映射

7、虚拟地址、逻辑地址、线性地址、物理地址的区别？
解析： 分段机制把一个逻辑地址转换为线性地址；接着，分页机制把一个线性地址转换为物理地址。
（1）虚拟地址：虚拟内存映射出来的地址
（2）逻辑地址：程序的段加偏移量形成的，C/C++程序中取地址求出来的地址就是逻辑地址
（3）线性地址：是逻辑地址到物理地址的中间层，只有启动分页机制的时候才有线性地址，如果没有分页机制，那么线性地址就是物理地址
（4）物理地址：是内存中实实在在存在的硬件地址，
逻辑地址（启动分段）--》线性地址（启动分页）--》物理地址
~~~

10、UDP与TCP，适用场景

~~~markdown
1、TCP与UDP区别总结：1、TCP面向连接（如打电话要先拨号建立连接）;UDP是无连接的，即发送数据之前不需要建立连接
2、TCP提供可靠的服务。也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP尽最大努力交付，即不保证可靠交付
Tcp通过校验和，重传控制，序号标识，滑动窗口、确认应答实现可靠传输。如丢包时的重发控制，还可以对次序乱掉的分包进行顺序控制。
3、UDP具有较好的实时性，工作效率比TCP高，适用于对高速传输和实时性有较高的通信或广播通信。
4.每一条TCP连接只能是点到点的;UDP支持一对一，一对多，多对一和多对多的交互通信
5、TCP对系统资源要求较多，UDP对系统资源要求较少。

2、为什么UDP有时比TCP更有优势?
UDP以其简单、传输快的优势，在越来越多场景下取代了TCP,如实时游戏。
（1）网速的提升给UDP的稳定性提供可靠网络保障，丢包率很低，如果使用应用层重传，能够确保传输的可靠性。
（2）TCP为了实现网络通信的可靠性，使用了复杂的拥塞控制算法，建立了繁琐的握手过程，由于TCP内置的系统协议栈中，极难对其进行改进。
采用TCP，一旦发生丢包，TCP会将后续的包缓存起来，等前面的包重传并接收到后再继续发送，延时会越来越大，基于UDP对实时性要求较为严格的情况下，采用自定义重传机制，能够把丢包产生的延迟降到最低，尽量减少网络问题对游戏性造成影响。

3、UDP和TCP编程步骤也有些不同，如下：
TCP: TCP编程的服务器端一般步骤是： 　　1、创建一个socket，用函数socket()；     SOCKET SocketListen =socket(AF_INET,SOCK_STREAM,
 IPPROTO_TCP);　　2、设置socket属性，用函数setsockopt(); * 可选 　　3、绑定IP地址、端口等信息到socket上，用函数bind();
 SOCKET_ERROR = bind(SocketListen,(const sockaddr*)&addr,sizeof(addr))　　4、开启监听，用函数listen()；                 SOCKET_ERROR
 == listen(SocketListen,2)　　5、接收客户端上来的连接，用函数accept()；    SOCKET SocketWaiter
 = accept(SocketListen,
                                                  _Out_    struct
 sockaddr *addr
 _Inout_  int
 *addrlen);　　6、收发数据，用函数send()和recv()，或者read()和write(); 　　7、关闭网络连接； closesocket(SocketListen);closesocket(SocketWaiter);　　8、关闭监听； SOCK_STREAM这种的特点是面向连接的，即每次收发数据之前必须通过connect建立连接，而SOCK_DGRAM这种是User
 Datagram Protocol协议的网络通讯，它是无连接的，不可靠的。TCP编程的客户端一般步骤是： 　　1、创建一个socket，用函数socket()； 　　2、设置socket属性，用函数setsockopt();* 可选 　　3、绑定IP地址、端口等信息到socket上，用函数bind();* 可选 　　4、设置要连接的对方的IP地址和端口等属性； 　　5、连接服务器，用函数connect()； 　　6、收发数据，用函数send()和recv()，或者read()和write(); 　　7、关闭网络连接；
int send(
  _In_  SOCKET s,         //向哪个socket发送，accept返回的socket。
  _In_  const char *buf,
  _In_  int len,
  _In_  int flags
);                               由于

send(SocketClient,(const char *)&fh,sizeof(fh),0);

recv(SocketClient,szbuf,sizeof(szbuf),0);UDP:与之对应的UDP编程步骤要简单许多，分别如下： 　　UDP编程的服务器端一般步骤是： 　　1、创建一个socket，用函数socket()； 　　2、设置socket属性，用函数setsockopt();* 可选 　　3、绑定IP地址、端口等信息到socket上，用函数bind(); 　　4、循环接收数据，用函数recvfrom(); 　　5、关闭网络连接； UDP编程的客户端一般步骤是： 　　1、创建一个socket，用函数socket()； 　　2、设置socket属性，用函数setsockopt();* 可选 　　3、绑定IP地址、端口等信息到socket上，用函数bind();* 可选 　　4、设置对方的IP地址和端口等属性; 　　5、发送数据，用函数sendto(); 　　6、关闭网络连接；

int recvfrom(
  _In_         SOCKET s,       //绑定的socket
  _Out_        char *buf,
  _In_         int len,
  _In_         int flags,
  _Out_        struct sockaddr *from,  //用来接收对方的
  _Inout_opt_  int *fromlen
);
int nres=recvfrom(pThis->m_socketListen,szBuf,sizeof(szBuf),0,(sockaddr*)&addrClient,&nSize);//0处标志位sendto(m_socketListen,szBuffer,nSize,0,(const sockaddr*)&addr,sizeof(sockaddr_in))TCP和UDP是OSI模型中的运输层中的协议。TCP提供可靠的通信传输，而UDP则常被用于让广播和细节控制交给应用的通信传输。

4、将socket设置为广播属性bool optval=true;setsockopt(m_socketListen,SOL_SOCKET,SO_BROADCAST,(const char *)&optval,sizeof(bool));
5、将Socket设置为非阻塞。//bool benable=true;//ioctlsocket(m_socketListen,FIONBIO,(u_long*)&benable);
6、Tcp头，20字节


7、UDP首部,8个字节

~~~



11、http与https区别



12、http1.0、http1.1与http2.0

13、webpack基本配置

14、OSI七层模型及对应协议

15、其中一间公司有问到MySQL、linux相关知识（其他公司很少见）

16、SQL注入的预防



17、对CSRF与XSS的认识与预防

18、浏览器渲染引擎相关知识

19、是否使用过express，谈谈express中间件机制及实现原理

20、跨域相关知识

21、git rebase作用及原理

22、回流与重绘

23、xss与csrf攻击

24、函数节流

25、前端性能优化

26、vue生命周期

27、flex布局，flex取值

28、提交的两种实现（input + type=”submit”, button+点击事件）

29、get和post对比

30、不同浏览器的事件机制

31、JS跨域及解决方法

32、浏览器不同tab之间通信

33、浏览器缓存机制

34、异步机制

35、amd、cmd规范

36、vue-router的原理

37、url构成

38、cookie有哪些安全的设置

39、cookie和session的区别

40、cookie、sessionStorage、localStorage

41、同源策略的认识

42、css盒模型

43、跨域请求方式有哪些，怎么实现

44、如何获取元素相对浏览器的位置

45、拖拽事件

46、从事件的角度，说明点击一个a标签，控制台输出其href值的具体过程

47、什么是事件代理

48、事件冒泡、捕获

49、进程、线程，进程间通信

50、同源标签之间如何通信

51、window.onload和document.ready是否是同时执行，为什么

52、cors请求和普通的http请求有什么区别

53、vue双向数据绑定原理

54、http与https区别

55、严格模式混杂模式

56、argument

57、进程间通信

58、tcp协议三次握手四次挥手过程

59、tcp和udp区别

60、JavaScript执行机制，事件循环、微任务、宏任务

61、Vue.js组件Render函数的作用是什么？简述使用场景

62、Vue Virtual DOM的作用是什么？浅析其原理

63、Vue.js的keep-alive的作用是什么？简述使用场景

64、Vue mixins作用

65、vur-router实现原理

#### 编程

1、自己实现一个parseInt函数

~~~js
function _parseInt(str, radix) {
 let str_type = typeof str;
 let res = 0;
 if (str_type !== 'string' && str_type !== 'number') {
  // 如果类型不是 string 或 number 类型返回NaN
  return NaN
 }

 // 字符串处理
 str = String(str).trim().split('.')[0]
 let length = str.length;
 if (!length) {
  // 如果为空则返回 NaN
  return NaN
 }

 if (!radix) {
  // 如果 radix 为0 null undefined
  // 则转化为 10
  radix = 10;
 }
 if (typeof radix !== 'number' || radix < 2 || radix > 36) {
  return NaN
 }

 for (let i = 0; i < length; i++) {
  let arr = str.split('').reverse().join('');
  res += Math.floor(arr[i]) * Math.pow(radix, i)
 }

 return res;
}
~~~

2、解析一个url，包括hash值

~~~js
一：﻿﻿URL举例

就以下面这个URL为例，介绍下普通URL的各部分组成

http://www.aspxfans.com:8080/news/index.asp?boardID=5&ID=24618&page=1#name



从上面的URL可以看出，一个完整的URL包括以下几部分：

1.协议部分：该URL的协议部分为“http：”，这代表网页使用的是HTTP协议。在Internet中可以使用多种协议，如HTTP，FTP等等本例中使用的是HTTP协议。在"HTTP"后面的“//”为分隔符

2.域名部分：该URL的域名部分为“www.aspxfans.com”。一个URL中，也可以使用IP地址作为域名使用

3.端口部分：跟在域名后面的是端口，域名和端口之间使用“:”作为分隔符。端口不是一个URL必须的部分，如果省略端口部分，将采用默认端口

4.虚拟目录部分：从域名后的第一个“/”开始到最后一个“/”为止，是虚拟目录部分。虚拟目录也不是一个URL必须的部分。本例中的虚拟目录是“/news/”

5.文件名部分：从域名后的最后一个“/”开始到“？”为止，是文件名部分，如果没有“?”,则是从域名后的最后一个“/”开始到“#”为止，是文件部分，如果没有“？”和“#”，那么从域名后的最后一个“/”开始到结束，都是文件名部分。本例中的文件名是“index.asp”。文件名部分也不是一个URL必须的部分，如果省略该部分，则使用默认的文件名

6.锚部分：从“#”开始到最后，都是锚部分。本例中的锚部分是“name”。锚部分也不是一个URL必须的部分

7.参数部分：从“？”开始到“#”为止之间的部分为参数部分，又称搜索部分、查询部分。本例中的参数部分为“boardID=5&ID=24618&page=1”。参数可以允许有多个参数，参数与参数之间用“&”作为分隔符。

二：﻿﻿URL通用格式

URL的语法：大多数URL语法都建立在9个部分构成的通用格式上，而其中最重要的是方案(scheme)、主机(host)和路径(path)

通用格式：方案://用户名:密码@主机名:端口/服务器上资源的路径;参数?查询#片段

1、方案：指访问服务器以获取资源时要使用哪种协议。比如，http、https和FTP等

2、主机和端口：指资源宿主服务器的主机名或IP地址。端口是指资源宿主服务器正在监听的端口，很多HTTP的默认端口号是80。比如，130.32.12.34:800，这里的IP地址是主机名，端口是800

3、用户名和密码：很多服务器都要求输入用户名和密码才会允许用户访问数据，如FTP服务器。

例子：joe是用户名、joepasswd是密码

ftp://joe:joepasswd@ftp.prep.edu/pub/name

4、路径：路径说明了资源位于服务器的什么地方。

例子：/cans/index.html就是URL中的路径

http://www.hda.com/cans/index.html

5、参数：为了向应用程序提供它们所需要的输入参数，以便正确地与服务器进行交互，URL中有个参数组件。由字符“;”将其与URL的其余部分分隔开来。

例子：;type=7;nam=true就是两个参数。

ftp://prep.mit.edu/pub;type=7;nam=true

6、查询：很多资源，比如数据库服务、搜索引擎，都可以通过提问题或进行查询来缩小请求资源的范围。由字符“?”将其与URL的其余部分分隔开来。

例子：查询组件有两个名/值对：name=csh和age=24

http://www.cheng.cn/si.html?name=csh&age=24

7、片段：#代表网页中的一个位置，其右面的字符就是该位置的标识符(一般情况下，锚链接会用到)

例子：下面的URL中，代表网页si.index的print位置，浏览器读取这个URL后，会自动将print位置滚动至可视区域。

http://www.cheng.cn/si.html#print

 

URL的分类：URL可以分为绝对URL和相对URL

绝对URL：绝对URL中包含了访问资源所需的全部信息。

案例：<a href=’http://cheng.com/si.html></a>

相对URL：相对URL包含的只是访问资源所需的部分信息。而要想得到访问资源的全部信息的话，就要和另一个被称为基础(base)的URL结合进行解析

案例：<script src="lib/sea.js"></script>

 

相对URL中的基础URL：转换相对URL的第一步就是找到基础URL

1、在资源中显式地指定基础URL。比如，HTML文档中可能会包含一个定义了基础URL的HTML标签<base>

2、封装资源的基础URL。在HTML中，基础URL可以从它们所属资源的基础URL中推导出来

三：﻿﻿URL特殊字符 

有些符号在URL中是不能直接传递的，如果要在URL中传递这些特殊符号，那么就要使用他们的编码了。编码的格式为：%加字符的ASCII码，即一个百分号%，后面跟对应字符的ASCII（16进制）码值。例如 空格的编码值是"%20"。

下表中列出了一些URL特殊符号及编码



:替换为%3A　

 
 
 
十六进制值
1.
+
URL 中+号表示空格
%2B
2.
空格
URL中的空格可以用+号或者编码
%20
3.
/
分隔目录和子目录
%2F
4.
?
分隔实际的 URL 和参数
%3F
5.
%
指定特殊字符
%25
6.
#
表示书签
%23
7.
&
URL 中指定的参数间的分隔符
%26
8.
=
URL 中指定参数的值
%3D


例：要传递字符串“this%is#te=st&o k?+/”作为参数t传给te.asp，则URL可以是:

te.asp?t=this%25is%23te%3Dst%26o%20k%3F%2B%2F 或者

te.asp?t=this%25is%23te%3Dst%26o+k%3F%2B%2F （空格可以用%20或+代替）



Java中URL
 的编码和解码函数

java.NET.URLEncoder.encode(String
 s)和java.Net.URLDecoder.decode(String
 s);



在JavaScript 中URL
 的编码和解码函数

escape(String s)和unescape(String s) ;

点的转义：. ==> u002E 

美元符号的转义：$ ==> u0024 

乘方符号的转义：^ ==> u005E 

左大括号的转义：{ ==> u007B 

左方括号的转义：[ ==> u005B 

左圆括号的转义：( ==> u0028 

竖线的转义：| ==> u007C 

右圆括号的转义：) ==> u0029 

星号的转义：* ==> u002A 

加号的转义：+ ==> u002B 

问号的转义：? ==> u003F 

反斜杠的转义： ==> u005C 

举例：

我们需要模拟的地址为：=1453725386008”>https://login.weixin.qq.com/jslogin?appid=wx782c26e4c19acffb&redirect_uri=https%3A%2F%2Fwx.qq.com%2Fcgi-bin%2Fmmwebwx-bin%2Fwebwxnewloginpage&fun=new&lang=en_US&=1453725386008 ，所以我们模拟的代码如下：
~~~



3、写一个url解析函数，解析出查询参数



4、原生ajax、jsonp实现



5、编程获取一个二叉树的最大深度

~~~js
/** * Definition for a binary tree node. * function TreeNode(val) { *     this.val = val; *     this.left = this.right = null; * } *//** * @param {TreeNode} root * @return {number} */
var maxDepth = function(root) {  if (root === null) {    return 0;  } else {    var leftDepth = maxDepth(root.left),        rightDepth = maxDepth(root.right);    var childDepth = leftDepth > rightDepth ? leftDepth : rightDepth;    return 1 + childDepth;  }};

~~~



6、写一个对象的事件函数，考察es5和es6的区别

7、冒泡排序、插入排序



8、请使用数组的reduce方法实现数组的map方法

9、快速排序

~~~js
function quickSort(arr){
            //如果数组<=1,则直接返回
            if(arr.length<=1){return arr;}
            var pivotIndex=Math.floor(arr.length/2);
            //找基准，并把基准从原数组删除
            var pivot=arr.splice(pivotIndex,1)[0];
            //定义左右数组
            var left=[];
            var right=[];

            //比基准小的放在left，比基准大的放在right
            for(var i=0;i<arr.length;i++){
                if(arr[i]<=pivot){
                    left.push(arr[i]);
                }
                else{
                    right.push(arr[i]);
                }
            }
            //递归
            return quickSort(left).concat([pivot],quickSort(right));
        }
~~~



10、请用至少两种方法判断一个对象是否是数组，如何将非数组转化为数组

11、实现节流去抖函数

12、实现bind函数

13、二分查找

14、无序数组n个数得到目标和，要求返回所有解

15、两栏布局，左边定宽，右边自适应

16、label关联对象属性，for

17、settimeout输出12345，闭包问题

18、js实现对象深拷贝

19、事件委托怎么写

20、数组去重

~~~js
方法一：

双层循环，外层循环元素，内层循环时比较值

如果有相同的值则跳过，不相同则push进数组

Array.prototype.distinct = function(){
 var arr = this,
  result = [],
  i,
  j,
  len = arr.length;
 for(i = 0; i < len; i++){
  for(j = i + 1; j < len; j++){
   if(arr[i] === arr[j]){
    j = ++i;
   }
  }
  result.push(arr[i]);
 }
 return result;
}
var arra = [1,2,3,4,4,1,1,2,1,1,1];
arra.distinct();    //返回[3,4,2,1]
方法二：利用splice直接在原数组进行操作

双层循环，外层循环元素，内层循环时比较值

值相同时，则删去这个值

注意点:删除元素之后，需要将数组的长度也减1.

Array.prototype.distinct = function (){
 var arr = this,
  i,
  j,
  len = arr.length;
 for(i = 0; i < len; i++){
  for(j = i + 1; j < len; j++){
   if(arr[i] == arr[j]){
    arr.splice(j,1);
    len--;
    j--;
   }
  }
 }
 return arr;
};
var a = [1,2,3,4,5,6,5,3,2,4,56,4,1,2,1,1,1,1,1,1,];
var b = a.distinct();
console.log(b.toString()); //1,2,3,4,5,6,56
优点：简单易懂

缺点：占用内存高，速度慢

方法三：利用对象的属性不能相同的特点进行去重

Array.prototype.distinct = function (){
 var arr = this,
  i,
  obj = {},
  result = [],
  len = arr.length;
 for(i = 0; i< arr.length; i++){
  if(!obj[arr[i]]){ //如果能查找到，证明数组元素重复了
   obj[arr[i]] = 1;
   result.push(arr[i]);
  }
 }
 return result;
};
var a = [1,2,3,4,5,6,5,3,2,4,56,4,1,2,1,1,1,1,1,1,];
var b = a.distinct();
console.log(b.toString()); //1,2,3,4,5,6,56
方法四：数组递归去重

运用递归的思想

先排序，然后从最后开始比较，遇到相同，则删除

Array.prototype.distinct = function (){
 var arr = this,
  len = arr.length;
 arr.sort(function(a,b){  //对数组进行排序才能方便比较
  return a - b;
 })
 function loop(index){
  if(index >= 1){
   if(arr[index] === arr[index-1]){
    arr.splice(index,1);
   }
   loop(index - 1); //递归loop函数进行去重
  }
 }
 loop(len-1);
 return arr;
};
var a = [1,2,3,4,5,6,5,3,2,4,56,4,1,2,1,1,1,1,1,1,56,45,56];
var b = a.distinct();
console.log(b.toString());  //1,2,3,4,5,6,45,56
方法五：利用indexOf以及forEach

Array.prototype.distinct = function (){
 var arr = this,
  result = [],
  len = arr.length;
 arr.forEach(function(v, i ,arr){  //这里利用map，filter方法也可以实现
  var bool = arr.indexOf(v,i+1);  //从传入参数的下一个索引值开始寻找是否存在重复
  if(bool === -1){
   result.push(v);
  }
 })
 return result;
};
var a = [1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,3,2,3,3,2,2,1,23,1,23,2,3,2,3,2,3];
var b = a.distinct();
console.log(b.toString()); //1,23,2,3
方法六：利用ES6的set

Set数据结构，它类似于数组，其成员的值都是唯一的。

利用Array.from将Set结构转换成数组

function dedupe(array){
 return Array.from(new Set(array));
}
dedupe([1,1,2,3]) //[1,2,3]
拓展运算符(...)内部使用for...of循环

let arr = [1,2,3,3];
let resultarr = [...new Set(arr)]; 
console.log(resultarr); //[1,2,3]
下面给大家补充介绍合并数组并去重的方法

一、concat()方法

思路：concat() 方法将传入的数组或非数组值与原数组合并,组成一个新的数组并返回。该方法会产生一个新的数组。

function concatArr(arr1, arr2){
  var arr = arr1.concat(arr2);
  arr = unique1(arr);//再引用上面的任意一个去重方法
  return arr;
}
二、Array.prototype.push.apply()

思路：该方法优点是不会产生一个新的数组。

 var a = [1, 2, 3];
 var b = [4, 5, 6];
 Array.prototype.push.apply(a, b);//a=[1,2,3,4,5,6]
 //等效于:a.push.apply(a, b);
 //也等效于[].push.apply(a, b); 
 function concatArray(arr1,arr2){
   Array.prototype.push.apply(arr1, arr2);
   arr1 = unique1(arr1);
   return arr1;
 }
~~~

21、原生ajax、jsonp实现

22、判断一个单词是否是回文

23、统计一个字符串出现最多的字母

24、不借助临时变量，进行两个整数的交换

25、找出正数数组中的最大差值

26、随机生成指定长度的字符串

27、实现类似getElementByClassName的功能

28、js实现二叉查找树

29、原生js实现路由

30、原生js实现对象属性监听器

31、js继承的方式，不同继承方式的实现

32、基于Promise，原生js实现ajax

33、哈希表、平衡二叉树等数据结构

34、排序算法（冒泡排序、插入排序、快速排序等）

35、重载与多态，JS如何实现

36、JS阻止事件冒泡及默认事件，兼容IE

37、实现传入一个不定长度字符串，查找出重复次数前n名的字符并分别统计其次数。

38、a、b两个字符串，不借助其他变量，实现a与b交换

39、js实现测试接口请求耗时

40、实现一个简单的JQuery插件

41、写一个方法，实现随机生成长度为n的字符串，字符串取值[a-z][0-9]

42、给Array增加原生方法，hash方式实现数组去重

43、事件委托怎么写

44、手写一个闭包，根据此闭包问问题

45、事件冒泡、捕获

46、自己实现一个parseInt函数

47、写一个url解析函数，解析出查询参数

48、js实现对象深拷贝

49、原生ajax、jsonp实现

50、解析一个url，包括hash值

51、淘宝等网站倒计时效果如何实现

52、是否了解红黑树，谈谈你的理解

~~~js
// Generated by BUCKLESCRIPT VERSION 1.9.2, PLEASE EDIT WITH CARE
'use strict';


function height(param) {
  if (param) {
    return param[3];
  } else {
    return 0;
  }
}

function create(l, v, r) {
  var hl = height(l);
  var hr = height(r);
  return /* Node */[
          l,
          v,
          r,
          hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        ];
}

function bal(l, v, r) {
  var hl = height(l);
  var hr = height(r);
  if (hl > (hr + 2 | 0)) {
    if (l) {
      var lr = l[2];
      var lv = l[1];
      var ll = l[0];
      if (height(ll) >= height(lr)) {
        return create(ll, lv, create(lr, v, r));
      } else if (lr) {
        return create(create(ll, lv, lr[0]), lr[1], create(lr[2], v, r));
      } else {
        return /* Empty */0;
      }
    } else {
      return /* Empty */0;
    }
  } else if (hr > (hl + 2 | 0)) {
    if (r) {
      var rr = r[2];
      var rv = r[1];
      var rl = r[0];
      if (height(rr) >= height(rl)) {
        return create(create(l, v, rl), rv, rr);
      } else if (rl) {
        return create(create(l, v, rl[0]), rl[1], create(rl[2], rv, rr));
      } else {
        return /* Empty */0;
      }
    } else {
      return /* Empty */0;
    }
  } else {
    return /* Node */[
            l,
            v,
            r,
            hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          ];
  }
}

function compare_int(x, y) {
  if (x > y) {
    return 1;
  } else if (x === y) {
    return 0;
  } else {
    return -1;
  }
}

function add(x, t) {
  if (t) {
    var r = t[2];
    var v = t[1];
    var l = t[0];
    var c = compare_int(x, v);
    if (c) {
      if (c < 0) {
        return bal(add(x, l), v, r);
      } else {
        return bal(l, v, add(x, r));
      }
    } else {
      return t;
    }
  } else {
    return /* Node */[
            /* Empty */0,
            x,
            /* Empty */0,
            1
          ];
  }
}

function min_elt(_def, _param) {
  while(true) {
    var param = _param;
    var def = _def;
    if (param) {
      var l = param[0];
      if (l) {
        _param = l;
        _def = param[1];
        continue ;

      } else {
        return param[1];
      }
    } else {
      return def;
    }
  };
}

function remove_min_elt(l, v, r) {
  if (l) {
    return bal(remove_min_elt(l[0], l[1], l[2]), v, r);
  } else {
    return r;
  }
}

function internal_merge(l, r) {
  if (l) {
    if (r) {
      var rv = r[1];
      return bal(l, min_elt(rv, r), remove_min_elt(r[0], rv, r[2]));
    } else {
      return l;
    }
  } else {
    return r;
  }
}

function remove(x, tree) {
  if (tree) {
    var r = tree[2];
    var v = tree[1];
    var l = tree[0];
    var c = compare_int(x, v);
    if (c) {
      if (c < 0) {
        return bal(remove(x, l), v, r);
      } else {
        return bal(l, v, remove(x, r));
      }
    } else {
      return internal_merge(l, r);
    }
  } else {
    return /* Empty */0;
  }
}

function mem(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var c = compare_int(x, param[1]);
      if (c) {
        _param = c < 0 ? param[0] : param[2];
        continue ;

      } else {
        return /* true */1;
      }
    } else {
      return /* false */0;
    }
  };
}

var v = /* Empty */0;

for(var i = 0; i <= 100000; ++i){
  v = add(i, v);
}

for(var j = 0; j <= 100000; ++j){
  if (!mem(j, v)) {
    console.log("impossible");
  }

}

for(var k = 0; k <= 100000; ++k){
  v = remove(k, v);
}

var match = v;

if (match) {
  console.log("impossible");
} else {
  console.log("success");
}

exports.height         = height;
exports.create         = create;
exports.bal            = bal;
exports.compare_int    = compare_int;
exports.add            = add;
exports.min_elt        = min_elt;
exports.remove_min_elt = remove_min_elt;
exports.internal_merge = internal_merge;
exports.remove         = remove;
exports.mem            = mem;
/*  Not a pure module */
~~~



53、一个大文件里的整数需要排序，文件大小有10G，但机器内存只有2G，如何实现？(可使用熟悉的语言)

54、使用Node.js的fs模块，实现文件夹的深度优先遍历和广度优先遍历。输入文件夹的路径，输出所有文件的列表。

55、实现一个复制函数，可以对JavaScript中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行值复制。

56、通过代码形式描述 async/await使用方法

57、通过正则表达式的方式，如何获取在url上参数？请通过代码形式描述



#### css类

 1、css清除浮动
 2、position取值
 3、z-index不生效的场景有哪些
 4、不定宽高元素垂直水平居中
 5、css实现一个占屏幕宽度50%的正方形
 6、布局问题（三列布局、两列布局）
 7、实现两列布局，第一列固定，第二列宽度自适应
 8、css实现三角形
 9、HSL色彩模型是什么，在CSS中如何使用
 10、css居中正方形，flex居中，正方形用padding做
 11、请使用CSS3实现一个长宽等于100px的div，1000ms后变成一个有阴影原型，并横向向右移动了50px的效果。加分：用画布实现以上效果