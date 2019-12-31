深入浅出的webpack构建工具---DevServer配置项(二)

**阅读目录**

- DevServer配置项

  [1. contentBase](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labe1_0)

  [2. port](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labe1_1)

  [3. host](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labe1_2)

  [4. headers](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labe1_3)

  [5. historyApiFallback](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labe1_4)

  [6. hot](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labe1_5)

  [7. inline](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labe1_6)

  [8. open](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labe1_7)

  [9. overlay](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labe1_8)

  [10. stats(字符串)](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labe1_9)

  [11. compress](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labe1_10)

  [12. proxy 实现跨域](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labe1_11)

 摘要：webpack-dev-server是一个使用了express的Http服务器，它的作用主要是为了监听资源文件的改变，该http服务器和client使用了websocket通信协议，只要资源文件发生改变，webpack-dev-server就会实时的进行编译。

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labelTop)

\1. contentBase

该配置项指定了服务器资源的根目录，如果不配置contentBase的话，那么contentBase默认是当前执行的目录,一般是项目的根目录。
可能如上解析还不够清晰，没有关系，我们下面还是先看下我整个项目的目录结构，然后进行相关的配置，使用contentBase配置项再来理解下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
### 目录结构如下：
demo1                                       # 工程名
|   |--- dist                               # dist是打包后生成的目录文件             
|   |--- node_modules                       # 所有的依赖包
|   |--- js                                 # 存放所有js文件
|   | |-- demo1.js  
|   | |-- main.js                           # js入口文件
|   |
|   |--- webpack.config.js                  # webpack配置文件
|   |--- index.html                         # html文件
|   |--- styles                             # 存放所有的css样式文件                              
|   |--- .gitignore  
|   |--- README.md
|   |--- package.json
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

index.html 代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <link href="dist/main.css" rel="stylesheet" type="text/css" />
</head>
<body>
  <div id="app"></div>
  <script src="dist/bundle.js"></script>
</body>
</html>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

main.js 代码如下：

```
require('../styles/main.css');

import demo1 from './demo1.js';
```

demo1.js 代码如下：

```
console.log(111);
```

webpack配置代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
const path = require('path');
// 提取css的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  mode: 'development',
  module: {
    rules: [
      {
        // 使用正则去匹配要用该loader转换的css文件
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          // 转换 .css文件需要使用的Loader
          use: ['css-loader']
        })
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    // modules: ['plugin', 'js']
  },
  plugins: [
    new ExtractTextPlugin({
      // 从js文件中提取出来的 .css文件的名称
      filename: `main.css`
    })
  ]
};
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

package.json 配置代码如下：

```
"scripts": {
  "dev": "webpack-dev-server --progress --colors --devtool source-map --hot --inline",
  "build": "webpack --progress --colors"
}
```

运行 npm run dev后，一切正常成功后，在浏览器下 运行 http://localhost:8080/ 即可在控制台看到 打印出 111 了。

如上是没有使用devServer配置的情况下。 下面我们来看下使用 devServer配置.

在webpack配置加上如下配置，即配置项指定了服务器资源的根目录。比如我们打包后的文件放入 dist目录下。

```
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist")
  },
}
```

如上配置完成后，我们再运行 npm run dev, 再在地址栏中 运行 http://localhost:8080/ 后看到如下信息：

![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804140528111-70636394.png)

也就是说 配置了 contentBase后，服务器就指向了资源的根目录，而不再指向项目的根目录。因此再访问 http://localhost:8080/index.html 是访问不到的。但是访问 http://localhost:8080/bundle.js 该js文件是可以访问的到的。

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labelTop)

\2. port

该配置属性指定了开启服务器的端口号，比如如下配置：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8081
  },
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

配置完成后，再运行打包命令 npm run dev 后，可以看到如下图所示：

![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804140623918-541733780.png)

现在我们可以通过 如下地址 http://localhost:8081/ 也可以访问了，也就是说 通过port配置，端口号从默认的8080改成8081了。

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labelTop)

\3. host

该配置项用于配置 DevServer的服务器监听地址。比如想让局域网的其他设备访问自己的本地服务，则可以在启动DevServer时带上 --host 0.0.0.0.
host的默认值是 127.0.0.1, 下面我们也简单的配置下 host 属性。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8081,
    host: '0.0.0.0'
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

配置完成后，再运行打包命令 npm run dev 后，可以看到如下图所示：

![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804140722245-1105568247.png)

我们访问 http://0.0.0.0:8081/ 可以访问的到了，其他局域网的同学应该也能访问的到吧。

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labelTop)

\4. headers

该配置项可以在HTTP响应中注入一些HTTP响应头。 比如如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8081,
    host: '0.0.0.0',
    headers: {
      'X-foo': '112233'
    }
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

如上配置完成后，打包下，刷新下浏览器，可以看到请求头加了上面的信息，如下所示：

![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804140809199-1325776165.png)

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labelTop)

\5. historyApiFallback

该配置项属性是用来应对返回404页面时定向跳转到特定页面的。一般是应用在 HTML5中History API 的单页应用，比如在访问路由时候，访问不到该路由的时候，会跳转到index.html页面。
我们现在在dist目录下 新建一个index.html, 代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
  <div id="app">欢迎你们来访问我</div>
</body>
</html>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

为了使配置项生效，我们只需要设置该 属性值为true即可； 如下配置：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8081,
    host: '0.0.0.0',
    headers: {
      'X-foo': '112233'
    },
    historyApiFallback: true
  },
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

现在我们来访问 http://0.0.0.0:8081/home 这个不存在的路由时，会发生什么？如下所示：

![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804140920426-1335868478.png)

如上可以看到，当不存在该路由的时候，通过该配置项，设置属性值为true的时候，会自动跳转到 index.html下。

当然如上只是简单的配置下，当然我们也可以手动通过 正则来匹配路由，比如访问 /user 跳转到 user.html，访问 /home 跳转到 home.html, 如下配置：

当然我们需要在 dist 目录下 新建 home.html 和 user.html 了，如下基本配置：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8081,
    host: '0.0.0.0',
    headers: {
      'X-foo': '112233'
    },
    historyApiFallback: {
      // 使用正则来匹配路由
      rewrites: [
        { from: /^\/user/, to: '/user.html' },
        { from: /^\/home/, to: '/home.html' }
      ]
    }
  },
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

重新运行打包下， 继续访问 http://0.0.0.0:8081/home 和 http://0.0.0.0:8081/user 即可看到能访问得到对应的页面了。

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labelTop)

\6. hot

该配置项是指模块替换换功能，DevServer 默认行为是在发现源代码被更新后通过自动刷新整个页面来做到实时预览的，
但是开启模块热替换功能后，它是通过在不刷新整个页面的情况下通过使用新模块替换旧模块来做到实时预览的。

我们可以在 devServer中 配置 hot: true 即可：如下配置代码：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8081,
    host: '0.0.0.0',
    headers: {
      'X-foo': '112233'
    },
    historyApiFallback: {
      // 使用正则来匹配路由
      rewrites: [
        { from: /^\/user/, to: '/user.html' },
        { from: /^\/home/, to: '/home.html' }
      ]
    },
    hot: true
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

当然我们也可以在scripts命令行中配置，比如我项目中在package.json中的scripts配置如下：

```
"scripts": {
  "dev": "webpack-dev-server --progress --colors --devtool source-map --hot --inline",
  "build": "webpack --progress --colors"
}
```

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labelTop)

\7. inline

webpack-dev-server 有两种模式可以实现自动刷新和模块热替换机制。
**1. iframe**
页面是被嵌入到一个iframe页面，并且在模块变化的时候重载页面。

可能如上解释，我们还不能完全能理解到底是什么意思，没有关系，我们继续来看下配置和实践效果。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  devServer: {
    port: 8081,
    host: '0.0.0.0',
    headers: {
      'X-foo': '112233'
    },
    inline: false
  },
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

如上代码配置 inline: false 就是使用iframe模式来重载页面了。我们的目录结构还是上面的那种结构，然后我们只需要在webpack中所有
配置如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
const path = require('path');
// 提取css的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  mode: 'development',
  module: {
    rules: [
      {
        // 使用正则去匹配要用该loader转换的css文件
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          // 转换 .css文件需要使用的Loader
          use: ['css-loader']
        })
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    // modules: ['plugin', 'js']
  },
  devServer: {
    port: 8081,
    host: '0.0.0.0',
    headers: {
      'X-foo': '112233'
    },
    inline: false
  },
  plugins: [
    new ExtractTextPlugin({
      // 从js文件中提取出来的 .css文件的名称
      filename: `main.css`
    })
  ]
};
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

然后当我们在命令行中，输入 webpack-dev-server 后 回车，可以看到如下图所示：

![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804141158245-2037841274.png)

接着我们在浏览器下 输入 http://0.0.0.0:8081/webpack-dev-server/ 地址后 回车，即可看到页面，我们查看源代码的时候，会看到嵌入了一个iframe页面，如下图所示：
![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804141231207-401833272.png)

当我们重新修改main.js 或 它的依赖文件 demo1.js 的时候，保存后，它也会自动重新加载页面，这就是使用 iframe 模式来配置加载页面的。

**iframe 模式的特点有：**
\1. 在网页中嵌入了一个iframe，将我们自己的应用代码注入到 这个 iframe中去了。
\2. 在页面头部会有一个 App ready. 这个提示，用于显示构建过程的状态信息。
\3. 加载了 live.bundle.js文件，还同时包含了 socket.io的client代码，进行了 websocket通讯，从而完成了自动编译打包，页面自动刷新功能。

我们看下请求的所有文件有如下：

![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804141316145-533057885.png)

**2. inline 模式**

开启模式，只需要把上面的配置代码变为 inline: true即可，它在构建变化后的代码会通过代理客户端来控制网页刷新。
如上配置后，我们运行 webpack-dev-server 命令后，如下所示：

![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804141346390-1372379506.png)

接着我们在地址栏中 http://0.0.0.0:8081/ 运行下 就可以访问到 项目中的根目录 index.html了，当我们修改入口文件的代码保存也一样
能实时刷新，其实效果是一样的。

**inline模式的特点有：**
\1. 构建的消息在控制台中直接显示出来。
\2. socket.io的client代码被打包进bundle.js当中，这样就能和websocket通讯，从而完成自动编译工作，页面就能实现自动刷新功能。
\3. 以后的每一个入口文件都会插入上面的socket的一段代码，这样会使的打包后的bundle.js文件变得臃肿。

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labelTop)

\8. open

该属性用于DevServer启动且第一次构建完成时，自动使用我们的系统默认浏览器去打开网页。

如下配置：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port: 8081,
    host: '0.0.0.0',
    headers: {
      'X-foo': '112233'
    },
    // hot: true,
    inline: true,
    open: true
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

设置 open: true 即可，当我们运行完成 npm run dev 打包的时候，会自动打开默认的浏览器来查看网页。

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labelTop)

\9. overlay

该属性是用来在编译出错的时候，在浏览器页面上显示错误。该属性值默认为false，需要的话，设置该参数为true。
为了演示下，我们来在main.js 代码内使用ES6的语法来编写代码，ES6是使用babel-loader 这样的来转化的，但是目前我们的项目先不安装该loader，应该会报错的。比如在main.js 代码加如下一句代码：
**const a;**

配置 overlay: true即可：如下配置：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port: 8081,
    host: '0.0.0.0',
    headers: {
      'X-foo': '112233'
    },
    // hot: true,
    inline: true,
    open: true,
    overlay: true
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

运行 npm run dev 后，自动打开网页，显示如下所示：

![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804141533353-1837443960.png)

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labelTop)

\10. stats(字符串)

该属性配置是用来在编译的时候再命令行中输出的内容，我们没有设置 stats的时候，输出是如下的样子：如下所示：

![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804141552438-1613728659.png)

该属性值可以有如下值：

stats: 'errors-only' 表示只打印错误，我们添加下这个配置到devServer中；如下代码配置：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port: 8081,
    host: '0.0.0.0',
    headers: {
      'X-foo': '112233'
    },
    // hot: true,
    inline: true,
    open: true,
    overlay: true,
    stats: 'errors-only'
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

现在我们继续 运行 npm run dev 后，会看到命令行中显示如下：

![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804141627922-1964528088.png)

该配置的含义是 只有错误的才会被打印，没有错误就不打印，因此多余的信息就不会显示出来了。

该属性值还有 'minimal', 'normal', 'verbose' 等。

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labelTop)

\11. compress

该属性是一个布尔型的值，默认为false，当他为true的时候，它会对所有服务器资源采用gzip进行压缩。

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9418526.html#_labelTop)

\12. proxy 实现跨域

有时候我们使用webpack在本地启动服务器的时候，由于我们使用的访问的域名是 http://localhost:8081 这样的，但是我们服务端的接口是其他的，

那么就存在域名或端口号跨域的情况下，但是很幸运的是 devServer有一个叫proxy配置项，可以通过该配置来解决跨域的问题，那是因为 dev-server 使用了 http-proxy-middleware 包[(了解该包的更多用法 )](https://github.com/chimurai/http-proxy-middleware#options)。

假如现在我们本地访问的域名是 http://localhost:8081, 但是我现在调用的是百度页面中的一个接口，该接口地址是：http://news.baidu.com/widget?ajax=json&id=ad。现在我们只需要在devServer中的proxy的配置就可以了：
如下配置：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
proxy: {
  '/api': {
    target: 'http://news.baidu.com', // 目标接口的域名
    // secure: true,  // https 的时候 使用该参数
    changeOrigin: true,  // 是否跨域
    pathRewrite: {
      '^/api' : ''  // 重写路径
    }
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

因此所有的配置如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    headers: {
      'X-foo': '112233'
    },
    // hot: true,
    port: '8081',
    inline: true,
    open: true,
    overlay: true,
    stats: 'errors-only',
    proxy: {
      '/api': {
        target: 'http://news.baidu.com', // 目标接口的域名
        // secure: true,  // https 的时候 使用该参数
        changeOrigin: true,  // 是否跨域
        pathRewrite: {
          '^/api' : ''  // 重写路径
        }
      }
    }
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

然后我们在main.js里面编写如下代码：

```
import axios from 'axios';

axios.get('/api/widget?ajax=json&id=ad').then(res => {
  console.log(res);
});
```

在这里请求我使用 axios 插件，其实和jquery是一个意思的。为了方便就用了这个。

下面我们来理解下上面配置的含义：

\1. 首先是百度的接口地址是这样的：http://news.baidu.com/widget?ajax=json&id=ad;
\2. proxy 的配置项 '/api' 和 target: 'http://news.baidu.com' 的含义是，匹配请求中 /api 含有这样的域名 重定向 到 'http://news.baidu.com'来。因此我在接口地址上 添加了前缀 '/api', 如： axios.get('/api/widget?ajax=json&id=ad'); 因此会自动补充前缀，也就是说，url: '/api/widget?ajax=json&id=ad' 等价
于 url: 'http://news.baidu.com/api/widget?ajax=json&id=ad'.
\3. changeOrigin: true/false 还参数值是一个布尔值，含义是 是否需要跨域。
\4. secure: true, 如果是https请求就需要改参数配置，需要ssl证书吧。
\5. pathRewrite: {'^/api' : ''}的含义是重写url地址，把url的地址里面含有 '/api' 这样的 替换成 '',
因此接口地址就变成了 http://news.baidu.com/widget?ajax=json&id=ad； 因此就可以请求得到了，最后就返回
接口数据了。

如下图所示：

![img](https://images2018.cnblogs.com/blog/561794/201808/561794-20180804141932073-157113643.png)