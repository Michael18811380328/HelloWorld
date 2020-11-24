# log4js

log4js-node是一个用于node日志分析的模块，支持如下功能

支持使用不同颜色标记和打印日志；文件类型的日志输出源，并可通过配置支持基于文件大小或日期进行日志回滚；支持日志分级和日志分类；可配置的日志信息模式；

### 基本用法

```js
'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger();

logger.debug('this is debug');
logger.info('this is info');
logger.warn('this is warn'); 
```

运行

```node
node log.js
```

注意：如果没有全局安装 log4js 会报错，然后执行

~~~bash
sudo npm install log4js -g
# 使用npm install -g 'xxx' 之后仍然报 
# Cannot find module 'xxx' 错误，可以通过设置环境变量来解决； 

export NODE_PATH=/usr/local/lib/node_modules/  
echo $NODE_PATH  
# 运行就可以正常执行
# https://blog.csdn.net/wmsjlihuan/article/details/19816389
~~~

发现没有，什么输出也没有？为什么呢？
因为log4js的缺省级别是off，也就是所有的都不会输出。

### 指定输出级别

```js
'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'info';

logger.debug('this is debug');
logger.info('this is info');
logger.warn('this is warn');
```

再运行：

```bash
node log.js
[2019-05-24T07:04:36.167] [INFO] default - this is info
[2019-05-24T07:04:36.169] [WARN] default - this is warn
# 控制台会显示 info warn 信息，但是 debug 信息不显示
```

这样info以及以上级别的log都能够正常输出了。

如果需要输出全部信息，把 logger.level = 'debug' 即可。下面是全部的等级。

~~~txt
ALL
TRACE
DEBUG
INFO
WARN
ERROR
FATAL
MARK
OFF
~~~

### 设置全局级别

前面例子设置了单个logger的输出级别，现在设置所有logger的缺省级别。

创建 log 配置文件 logconf.json (日志类型，日志级别，输出源)

```ruby
{
  "appenders": {
    "consoleout": { "type": "console" }
  },
  "categories": {
    "default": { "appenders": [ "consoleout" ], "level": "debug" }
  }
}
```

全局加载配置

```jsx
'use strict';

var config = require('./logconf.json');
var log4js = require('log4js');
log4js.configure(config);

var logger = log4js.getLogger();
logger.debug('this is debug');
logger.info('this is info');
logger.warn('this is warn');
```

运行

```bash
node log.js
[2019-05-24T07:10:10.557] [DEBUG] default - this is debug
[2019-05-24T07:10:10.560] [INFO] default - this is info
[2019-05-24T07:10:10.560] [WARN] default - this is warn
```

因为在配置文件里把level设置成了debug，这样三个log行都打出来了。

目前支持的日志

SMTP：以邮件形式发送日志；
GELF （ Graylog Extended Log Format，graylog扩展日志格式），能够规避传统的系统级日志的未压缩、1024字节长度限制、无数据类型等缺点；它只依赖于node的udp模块支持，可以通过udp协议发送日志到兼容gelf的服务器；
File 将日志输出到指定文件；
console 将日志打印到控制台；
redis 将日志事件存储到redis数据库；

### 综合使用

~~~js
var log4js = require('log4js');
log4js.configure({
  appenders: {test: {
    type: 'console',
  }},
  categories: {default: {appenders: ['test'], level: 'error'}}
})
var logger = log4js.getLogger('test');
logger.level = 'warn';
logger.debug('debug...');
logger.info('info...');
logger.warn('warn...');
logger.error('error...');
console.log('start...');
~~~

### 参考文献

https://www.npmjs.com/package/log4js

https://github.com/log4js-node/log4js-node

### 实际使用

~~~js
'use strict';
// npm install log4js -S
var log4js = require('log4js');
var logger = log4js.getLogger();
 
// 这一句话设置日志的级别：如果设置info，那么debug的日志不会被打印
// logger.level = 'info';
logger.level = 'debug';

logger.debug('this is debug');
logger.info('this is info');
logger.warn('this is warn');
~~~



# 英文说明

This is a conversion of the [log4js](https://github.com/stritti/log4js) framework to work with [node](http://nodejs.org/). I started out just stripping out the browser-specific code and tidying up some of the javascript to work better in node. It grew from there. Although it's got a similar name to the Java library [log4j](https://logging.apache.org/log4j/2.x/), thinking that it will behave the same way will only bring you sorrow and confusion.

The full documentation is available [here](https://log4js-node.github.io/log4js-node/).

[Changes in version 3.x](https://log4js-node.github.io/log4js-node/v3-changes.md)

There have been a few changes between log4js 1.x and 2.x (and 0.x too). You should probably read this [migration guide](https://log4js-node.github.io/log4js-node/migration-guide.html) if things aren't working.

Out of the box it supports the following features:

- coloured console logging to stdout or stderr
- file appender, with configurable log rolling based on file size or date
- a logger for connect/express servers
- configurable log message layout/patterns
- different log levels for different log categories (make some parts of your app log as DEBUG, others only ERRORS, etc.)

Optional appenders are available:

- [SMTP](https://github.com/log4js-node/smtp)
- [GELF](https://github.com/log4js-node/gelf)
- [Loggly](https://github.com/log4js-node/loggly)
- Logstash ([UDP](https://github.com/log4js-node/logstashUDP) and [HTTP](https://github.com/log4js-node/logstashHTTP))
- logFaces ([UDP](https://github.com/log4js-node/logFaces-UDP) and [HTTP](https://github.com/log4js-node/logFaces-HTTP))
- [RabbitMQ](https://github.com/log4js-node/rabbitmq)
- [Redis](https://github.com/log4js-node/redis)
- [Hipchat](https://github.com/log4js-node/hipchat)
- [Slack](https://github.com/log4js-node/slack)
- [mailgun](https://github.com/log4js-node/mailgun)

## Getting help

Having problems? Jump on the [slack](https://join.slack.com/t/log4js-node/shared_invite/enQtNzkyMTIzODgxMDQ2LWZmZGEzOGQzN2MzMmE3YWNiNDVmZDY3MjM2MTM3ZTlhOTg0ODkyODc3ODc5OWQ3MWNmMjU1M2U4ZmUzNTViNzI) channel, or create an issue. If you want to help out with the development, the slack channel is a good place to go as well.

## installation

```
npm install log4js
```

## usage

Minimalist version:

```
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
logger.debug("Some debug messages");
```

By default, log4js will not output any logs (so that it can safely be used in libraries). The `level` for the `default` category is set to `OFF`. To enable logs, set the level (as in the example). This will then output to stdout with the coloured layout (thanks to [masylum](http://github.com/masylum)), so for the above you would see:

```
[2010-01-17 11:43:37.987] [DEBUG] [default] - Some debug messages
```

See example.js for a full example, but here's a snippet (also in `examples/fromreadme.js`):

```js
const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
 
const logger = log4js.getLogger('cheese');
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Comté.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');
```

Output (in `cheese.log`):

```
[2010-01-17 11:43:37.987] [ERROR] cheese - Cheese is too ripe!
[2010-01-17 11:43:37.990] [FATAL] cheese - Cheese was breeding ground for listeria.
```

## Note for library makers

If you're writing a library and would like to include support for log4js, without introducing a dependency headache for your users, take a look at [log4js-api](https://github.com/log4js-node/log4js-api).

## Documentation

Available [here](https://log4js-node.github.io/log4js-node/).

There's also [an example application](https://github.com/log4js-node/log4js-example).

## TypeScript

```typescript
import { configure, getLogger } from 'log4js';
configure('./filename');
const logger = getLogger();
logger.level = 'debug';
logger.debug("Some debug messages");
 
configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
```

