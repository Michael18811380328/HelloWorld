## [深入浅出的webpack构建工具---webpack基本配置(一)](https://www.cnblogs.com/tugenhua0707/p/9384953.html)

2018-07-29 12:35 [龙恩0707](https://www.cnblogs.com/tugenhua0707/) 阅读(4052) 评论(2) [编辑 ](https://i.cnblogs.com/EditPosts.aspx?postid=9384953)[收藏](javascript:void(0))

深入浅出的webpack构建工具---webpack基本配置(一)

**阅读目录**

- 一：webpack入门构建：

  [1. 安装webpack到全局](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe1_0)

  [2. 安装webpack到本项目。](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe1_1)

  [3. 如何使用webpack？](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe1_2)

  [4. 使用loader](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe1_3)

  [5. 使用插件（Plugin）](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe1_4)

  [6. 使用DevServer](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe1_5)

- 二：webpack基本配置

  [1. context](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe2_0)

  [2. entry](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe2_1)

  [3. Output](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe2_2)

  [4. 模式（mode）](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe2_3)

  [5.理解使用Loader](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe2_4)

  [6.理解noParse](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe2_5)

  [7. 理解alias](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe2_6)

  [8.理解extensions](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe2_7)

  [9.理解Externals](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labe2_8)

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

\1. 安装webpack到全局

在学习构建之前，我们来在本地文件新建一个存放项目的文件夹，比如叫demo1这个项目，然后进入demo1该项目的根目录后，执行命令 npm init
运行下，一路回车(先简单的来)，就会生成一个package.json文件。

在项目中直接运行如下命令，就可以把webpack安装到全局去；如下命令：

```
npm install -g webpack
```

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

\2. 安装webpack到本项目。

在本项目中，执行如下命令，就可以把webpack安装到本地项目中，如下命令：

```
npm install --save-dev webpack
```

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

\3. 如何使用webpack？

在编写webpack代码之前，我们先搭建好目录结构如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
### 目录结构如下：
demo1                                       # 工程名
|   |--- dist                               # 打包后生成的目录文件             
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

index.html代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
  <div id="app"></div>
  <script src="./dist/bundle.js"></script>
</body>
</html>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

js/demo1.js 代码假如是如下：

```
function demo1Func() {
  console.log(11);
};
module.exports = demo1Func;
```

js/main.js 代码如下:

```
const demo1Func = require('./demo1.js');

demo1Func();
```

如上的简单的代码，我们先从上面的简单的代码来学起，然后逐渐会慢慢的深入的讲解webpack知识点；我们在项目的根目录中新建 webpack.config.js件；编写配置文件如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
const path = require('path');

module.exports = {
  entry: './js/main.js',

  output: {
    // 将所有依赖的模块合并输出到一个叫bundle.js文件内
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  }
};
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

一切编写文件好了以后，我们一般情况下会在项目的根目录下 运行webpack命令；但是当我们运行webpack后，会报错如下信息：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
One CLI for webpack must be installed. These are recommended choices, delivered as separate packages:
 - webpack-cli (https://github.com/webpack/webpack-cli)
   The original webpack full-featured CLI.
 - webpack-command (https://github.com/webpack-contrib/webpack-command)
   A lightweight, opinionated webpack CLI.
We will use "npm" to install the CLI via "npm install -D".
Which one do you like to install (webpack-cli/webpack-command):
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

因此我们可以在项目的目录下 安装下 webpack-cli ，如下命令安装：

```
npm install webpack-cli -g
```

安装完成后，我们再执行webpack命令后，就会在项目中根目录生成dist文件夹，该文件夹内会生成 bundle.js 文件。这时候我们再打开index.html， 运行后，会发现执行了依赖的demo1.js了。

**3.1 理解配置文件 entry（入口）和 出口 (output)**

入口(entry) 是指示webpack应该使用哪个模块，来作为构建内部依赖js的开始，进入入口起点后，webpack会找出有哪些模块和库是入口js依赖的。
出口(output) 是告诉webpack在什么地方输出它所创建的bundles，以及如何命名这些文件，默认值为 './dist'.

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

\4. 使用loader

webpack的构建是一个采用CommonJS规范的模块化项目，现在我们还是继续上面的项目，我们再在main.js会引入一个css文件。因此会在main.js代码修改如下：

```
require('../styles/main.css');

const demo1Func = require('./demo1.js');

demo1Func();
```

然后main.css代码如下：

```
#app {
  font-size: 18px;
}
```

如果我们现在直接去执行webpack的话，就会报错，因此我们需要在webpack中加入Loader的机制。将webpack代码改成如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
const path = require('path');

module.exports = {
  entry: './js/main.js',

  output: {
    // 将所有依赖的模块合并输出到一个叫bundle.js文件内
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        // 用正则去匹配以 .css结尾的文件，然后需要使用loader进行转换
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize']
      }
    ]
  }
};
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

如上代码，我们在webpack编译之前需要安装 style-loader 和 css-loader， 如下命令进行安装：

```
npm install --save-dev style-loader css-loader
```

如上配置代码中的 module.rules 数组配置了一组规则，是来告诉webpack在遇到哪些文件时使用哪些loader去加载和转换，比如上面的使用test正则去匹配
以 .css 结尾的文件，会先使用 css-loader 读取css文件，然后使用 style-loader将css的内容注入到javascript里面去。

**注意：**
\1. use属性的值是一个使用Loader名称组成的数组，Loader的执行顺序是由后往前的。由于loader有顺序的，因此我们在配置中不能如下编写loader；
代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module: {
    rules: [
      {
        // 用正则去匹配以 .css结尾的文件，然后需要使用loader进行转换
        test: /\.css$/,
        use: ['css-loader?minimize', 'style-loader']
      }
    ]
  }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

\2. 每个Loader都可以通过 URL queryString 的方式传入参数，比如 css-loader?minimize是告诉css-loader是开启css压缩。

现在我们可以在项目中的根目录运行 webpack命令了，一切正常后，我们打开index.html后，查看代码，发现css被加载到style标签内了；

style-loader的原理：是将css的内容使用javascript的字符串存储起来，在网页执行javascript时通过DOM操作，动态地向HTML head标签里插入 HTML style标签。

\3. 配置loader的方式也可以使用Object来实现，比如如上的匹配css代码，可以改成如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
use: [
    'style-loader', 
    {
      loader: 'css-loader',
      options: {
        minimize: true
      }
    }
] 
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

因此webpack所有的配置代码变成如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
const path = require('path');
  module.exports = {
    entry: './js/main.js',
    output: {
      // 将所有依赖的模块合并输出到一个叫bundle.js文件内
      filename: 'bundle.js',
      // 将输出的文件都放在dist目录下
      path: path.resolve(__dirname, './dist')
    },
    module: {
      rules: [
        {
          // 用正则去匹配以 .css结尾的文件，然后需要使用loader进行转换
          test: /\.css$/,
          use: [
            'style-loader', 
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          ]
        }
      ]
    }
  };
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

\5. 使用插件（Plugin）

loader的作用是被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务，插件的范围包括，从打包优化和压缩，一直到重新定义环节中的变量。
如果想要使用一个插件，我们只需要require()它，然后把它添加到 plugins数组中。我们可以在一个配置文件中因为不同的目的多次使用用一个插件，因此
我们可以使用new操作符来创建它的实列。

上面我们是通过loader加载了css文件到js中去，下面我们通过plugin将注入的bundle.js文件里的css提取到单独的文件中，我们需要使用到
extract-text-webpack-plugin 插件，配置代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
const path = require('path');

// 提取css的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './js/main.js',

  output: {
    // 将所有依赖的模块合并输出到一个叫bundle.js文件内
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        // 使用正则去匹配要用该loader转换的css文件
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          // 转换 .css文件需要使用的Loader
          use: ['css-loader']
        })
      }
    ]
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

要使用 extract-text-webpack-plugin 插件的话，首先我们需要安装该插件，安装插件的命令如下：

```
npm install --save-dev extract-text-webpack-plugin
```

当安装成功后，我们需要运行webpack命令后，发现命令行报错了，报错信息如下：

```
(node:86210) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
/usr/local/lib/node_modules/webpack/lib/Chunk.js:802
```

解决的办法是 安装 extract-text-webpack-plugin 时，需要如下安装，安装命令如下：

```
npm install extract-text-webpack-plugin@next
```

安装成功后，再运行webpack就可以了，我们可以看到在dist文件夹内会多一个main.css, 因此我们可以在index.html中把 css文件引入进去即可。

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

\6. 使用DevServer

前面是使用webpack进行打包，但是在开发中我们还需要一个本地文件的服务器，并且当我们保存代码的时候会自动进行打包，并且还支持 Source Map，
以方便代码调试等功能，因此我们现在需要使用到 DevServer了。

首先我们需要安装 webpack-dev-server, 如下安装命令：

```
npm install --save-dev webpack-dev-server
```

当然我们还需要全局安装一下，安装命令如下：

```
npm install webpack-dev-server -g
```

然后当我们在命令行输入 webpack-dev-server 运行后，发现报错了，报错如下信息：

```
The CLI moved into a separate package: webpack-cli.
Please install 'webpack-cli' in addition to webpack itself to use the CLI.
-> When using npm: npm install webpack-cli -D
-> When using yarn: yarn add webpack-cli -D
module.js:471
```

因此我们需要重新运行下如下命令：

```
npm install webpack-cli -D
```

当成功后，我们再次运行 webpack-dev-server 可以看到已经启动了服务器了，端口号默认是 8080, 然后我们访问 http://localhost:8080/index.html 就可以访问到我们项目中页面了。

**6.1 实时预览**
webpack在启动时可以开启监听模式，默认是关闭的，开启后webpack会监听本地文件系统的变化，在发生变化时候会重新构建出新的结果，在上面运行
webpack-dev-server 后，我们需要打开一个新的命令行，在命令行中输入如下命令来开启监听模式：

```
webpack --watch
```

当项目中入口文件或入口依赖的文件有改变的时候，它会自动重新构建，构建完成后会自动刷新下页面，但是如果修改的不是入口文件或依赖的文件
是不会有任何效果的，比如修改的是index.html 是不会重新构建的。但是要完成上面的实时预览，html页面的bundle.js 要直接引入即可：如下html页面代码：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
  <div id="app"></div>
  <script src="bundle.js"></script>
</body>
</html>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

那为什么 http://localhost:8080/bundle.js 这样也能访问的到呢？原因是DevServer会将webpack构建出的文件保存在内存中，DevServer不会理会
webpack.config.js里配置的output.path属性的。

**6.2 模块热替换**

除了上面介绍的改动本地入口文件或依赖文件后，会自动打包，然后会自动刷新浏览器即可看到更新效果外，我们还可以使用模块热替换技术，

模块热替换技术能做到在不重新加载整个网页的情况下，通过将已更新的模块替换旧模块，它默认是关闭的，要开启模块热替换，我们只需在启动DevServer时带上 --inline 参数即可。如下命令：

```
webpack-dev-server --inline  或 webpack-dev-server --inline --hot
```

webpack-dev-server 有如下两种启动模式：

**iFrame:** 该模式下修改代码后会自动打包，但是浏览器不会自动刷新。
**inline：** 内联模式，该模式下修改代码，webpack将自动打包并刷新浏览器。

**6.3 支持Source Map**
在浏览器中运行javascript代码都是编译器输出的代码，但是如果在代码中碰到一个bug的时候，我们不好调式，因此我们需要 Source Map来映射到源代码上，Webpack支持生成 Source Map, 只需在启动时带上 --devtool source-map参数即可；如下命令：

```
webpack-dev-server --inline --hot --devtool source-map
```

**注意：**每次运行 如上命令，感觉非常长，因此我们可以在项目的根目录的package.json文件的scripts配置中添加如下配置：

```
"scripts": {
  "dev": "webpack-dev-server --devtool source-map --hot --inline"
}
```

加上如上配置后，我们只需要在命令行中 运行 npm run dev 即可；

**其他配置常见的选项：**
--quiet 控制台中不输出打包的信息
--compress 开启gzip的压缩
--progress 显示打包的进度

因此在项目中scripts经常会做如下配置：

```
"scripts": {
  "dev": "webpack-dev-server --progress --colors --devtool source-map --hot --inline",
  "build": "webpack --progress --colors"
}
```

这样的话，打包的时候会显示打包进度。

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

\1. context

基础目录，绝对路径，用于从配置中解析入口起点和加载器。什么意思呢？比如如下代码配置：
context: path.resolve(__dirname, 'js'), 含义是使用当前目录下的js文件下查找入口文件。比如如下代码的配置也是可以的：

```
module.exports = {
  context: path.resolve(__dirname, 'js'),
  entry: './main.js'
}
```

含义是从当前项目目录下的js文件查找main.js文件作为入口文件，如果在当前目录没有找到该入口文件，就会报错。
当然我们也可以如下写配置代码也是可以的：如下代码配置：

```
module.exports = {
  context: path.resolve(__dirname, ''),
  entry: './js/main.js'
};
```

或者context配置项不要，它也是默认从当前目录下查找的，因此如果使用context的话，建议加上第二个参数，是从当前目录下那个文件内查找的。或者直接不要这个配置项。

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

\2. entry

应用程序的起点入口，从这个起点开始，应用程序启动执行，如果传递一个数组的话，那么数组的每一项都会执行。它的类型可以是String, array, 或 object;

**2.1 string(类型为字符串)：** 如下配置：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  entry: './js/main.js',
  output: {
    // 将所有依赖的模块合并输出到一个叫bundle.js文件内
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  }
};
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

**2.2 类型为数组**

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  entry: ['./js/main.js', './js/main2.js'],
  output: {
    // 将所有依赖的模块合并输出到一个叫bundle.js文件内
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  }
};
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

如果类型为数组的话，将会创建多个主入口，并且把数组中的js打包在一起到一个文件里面去。

**2.3 类型为对象时**

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  entry: {
    'main': './js/main.js',
    'main2': './js/main2.js'
  },
  output: {
    filename: '[name].js', // [name] 的值是entry的键值, 会输出多个入口文件
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  }
};
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

\3. Output

output配置是输出最终想要的代码，它是一个object, 里面包含很多配置项。

**3.1 filename 和 path的理解**
filename: 输出文件的名称，为string类型.
1) 如果只有一个输出文件，可以将名称写死；如：filename: 'bundle.js';
path: 文件被写入硬盘的位置。必须是string类型的绝对路径，一般通过Node.js的path模块获取绝对路径，如下代码：
path: path.resolve(__dirname, './dist')

单个入口配置代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
{
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

**多个入口**

如果有多个chunk要输出时，就需要借助[name]变量了，webpack会为每个chunk取一个名称，因此我们根据chunk的名称来区分输出的文件名。如下：
filename: '[name].js'

多个入口配置代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  entry: {
    'main': './js/main.js',
    'main2': './js/main2.js'
  },
  output: {
    filename: '[name].js', // [name] 的值是entry的键值, 会输出多个入口文件
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  }
};
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

如上配置，会输出 main.js 和 main2.js。
内置变量除了包括name，还包括，id, hash, chunkhash。

id: Chunk的唯一标识，从0开始。
hash: Chunk的唯一标识的Hash值。比如[hash:8] 代表8位的hash值。默认是20位。
chunkhash: Chunk内容的Hash值。

如下hash配置代码：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
entry: {
  'main': './js/main.js',
  'main2': './js/main2.js'
},
output: {
  filename: '[name]_[hash:8].js', // [name] 的值是entry的键值, 会输出多个入口文件
  // 将输出的文件都放在dist目录下
  path: path.resolve(__dirname, './dist')
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

就会生成 main_xxxx.js 和 main2_xxxx.js 其中xxxx是hash值的随机八位。

**3.2 chunkFilename的理解**
chunkFilename 和 filename非常类似，但是chunkFilename是未被列在entry中的，但是又需要被打包出来的文件命名配置，什么场景需要这样的呢？
比如 异步按需加载模块的时候，一般这样的文件没有被列在entry中，比如如下项目在js文件内再新建plugins文件夹，存放比如js插件使用的，目录
结构如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
### 目录结构如下：
demo1                                       # 工程名
|   |--- dist                               # 打包后生成的目录文件             
|   |--- node_modules                       # 所有的依赖包
|   |--- js                                 # 存放所有js文件
|   | |-- demo1.js  
|   | |-- main.js                           # js入口文件
|   | |-- main2.js                          # js的多个入口文件
|   | |-- plugins                           # plugins文件夹，存放js插件类的
|   | | |--- a.js
|   |
|   |--- webpack.config.js                  # webpack配置文件
|   |--- index.html                         # html文件
|   |--- styles                             # 存放所有的css样式文件                              
|   |--- .gitignore  
|   |--- README.md
|   |--- package.json
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

如上目录结构 在js文件夹内，再新建plugins文件夹，里面包含一个a.js文件；代码如下：

```
function a() {
  console.log('a.js');
}
module.exports = a;
```

然后我们在main2.js入口文件如下编写代码；使用异步方式引用a.js; 代码如下：

```
require.ensure(['./plugins/a.js'], function(require) {
  var aModule = require('./plugins/a.js');
}, 'a');
```

然后在webpack的output配置添加 chunkFilename 配置如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  context: path.resolve(__dirname, ''),
  entry: {
    'main': './js/main.js',
    'main2': './js/main2.js'
  },
  output: {
    filename: '[name]_[hash:8].js', // [name] 的值是entry的键值, 会输出多个入口文件
    chunkFilename: '[name].min.js', 
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, './dist')
  }
};
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

其中上面的 require.ensure() API的第三个参数是给这个模块命名的，因此在webpack配置完成后，继续打包下，会在dist文件夹下打出 a.min.js 文件
了。所以这就是 chunkFilename 的用途场景了。

**3.3 publicPath的理解**

**output.path 是指所有输出文件的本地文件目录(绝对路径)。比如配置如下：**

```
output: {
  filename: 'bundle.js',
  // 将输出的文件都放在dist目录下
  path: path.resolve(__dirname, 'dist')
}
```

那么webpack会将所有文件输出到 dist/下。也就是说path是存放打包后的文件的输出目录。

**正式环境下publicPath的理解：**
publicPath正式环境可以理解为改变相对目录下的静态资源文件的路径为正确的路径。比如图片引入的是相对路径，可以配置publicPath成为正确的路径。
它是指定资源文件引用的目录(相对于服务器的根目录来讲)。

先看styles/main.css代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
#app {
  font-size: 18px;
  width: 200px;
  height: 200px;
  backround: url('../images/1.jpg') no-repeat;
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

iamges文件夹内有一张图片为1.jpg, 因此上面是css的引入路径。然后手动创建 index.html代码如下：

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

现在我们执行 npm run build 进行打包后，打开index.html发现css中图片的引用的路径为：backround: url(1.jpg) no-repeat; 很明显图片的引用路径不对，它引入是根目录下的图片，因此如果我们在打包的时候加上 publicPath，配置如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
output: {
  filename: 'bundle.js',
  // 将输出的文件都放在dist目录下
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/dist/'
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

重新打包下，再看下css引入路径为 backround: url(/dist/1.jpg) no-repeat；说明引入是对的。

**开发环境下publicPath的理解：**

output的配置如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
output: {
  filename: 'bundle.js',
  // 将输出的文件都放在dist目录下
  path: path.resolve(__dirname, 'dist'),
  // publicPath: '/dist/'
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

然后把dist目录删除掉，执行 npm run dev后，开发环境打包后并没有生成dist目录，而我们的index.html引入了 dist/bundle.js 和 dist/main.css, 因此页面会发现找不到js和css文件。那么打包后文件放在那里去了呢？我们可以看如下图：

![img](https://images2018.cnblogs.com/blog/561794/201807/561794-20180729122119526-1924686651.png)

启动了webpack-dev-server, 然后整个项目运行在localhost:8080下面，也就是服务器地址是localhost:8080， 当我们在浏览器中输入服务器地址，服务器会签就会到服务器请求js 文件，js的地址是dist/bundle.js， 没有，报错了。
看如上截图的：wepback output is served from / , 这里指明了webpack 打包后文件放到了/ 目录下，也就是根目录下，webpack-dev-server 进行打包时
它默认把css和js及图片打包到根目录下。
现在把output配置改成如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
output: {
  filename: 'bundle.js',
  // 将输出的文件都放在dist目录下
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/dist/'
};
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

再进行运行下 npm run dev 后看到如下所示：

![img](https://images2018.cnblogs.com/blog/561794/201807/561794-20180729122239092-625603140.png)

wepback output is served from /dist/ 这里指明了webpack 打包后文件放到了/dist/ 目录下了，因为js和css文件可以重新访问了。

**3.4 crossOriginLoading**

Webpack输出的部分代码有可能需要异步加载，而异步加载是通过JSON方式实现的。JSONP的原理是动态地向HTML中插入一个<script src="url">
</script>，crossOriginLoading则是用于配置这个异步插入的标签的 crossorigin的值。
**script标签的crossorigin属性可以取以下的值：**
**1. anonymous(默认)，**启用跨域加载，在加载此脚本资源时不会带上用户的Cookies; 即发送不带凭据的 credential的请求。
**2. use-credentials** 启用跨域加载，在加载此脚本资源时会带上用户的Cookies. 发送带凭据的credential的请求。
**3. false** 禁用跨域加载。

**3.5 libraryTarget 和 library**

这两个属性大家可能比较陌生，一般项目中不需要关注这两个属性，但是当我们开发类库，使用webpack去构建一个可以被其他模块导入使用的库时会使用到。一般情况下，webpack对js模块进行打包，即多个js模块和一个入口模块，打包成一个bundle文件，可以直接被浏览器或者其他javascript引擎执行，

相当于直接编译生成一个完成的可执行文件。但是当我们需要发布一个javascript库的时候，比如在npm社区中发布自己的库，这个时候我们的webpack就需要相应的配置.

**libraryTarget 是配置以何种方式导出库。**可以是 var, commonjs, 'commonjs2', amd, this，umd模式等。
**library 配置导出库的名称。**
他们一般都组合使用的。

我们下面来编写一个简单的库，假如名字叫 demo1.js，代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
function sayHello() {
  console.log('Hello');
}

function sayFunc() {
  console.log('say');
}

export default {
  sayHello: sayHello,
  sayFunc: sayFunc
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

然后我们在main.js代码引入该文件

```
import foo from './demo1.js';

console.log(foo);
foo.sayHello(); // 可以执行
```

webpack打包配置如下： 

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
entry: './js/main.js',
output: {
  filename: 'bundle.js',
  // 将输出的文件都放在dist目录下
  path: path.resolve(__dirname, 'dist')
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

这样会输出一个立即执行的函数，bundle代码大致结构如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
(function(modules) { // webpackBootstrap
  var installedModules = {};
  function __webpack_require__(moduleId) {
    // ....
  }
  return __webpack_require__(__webpack_require__.s = "./js/main.js");
})
({
  "./js/demo1.js":
  (function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\nfunction sayHello() {\n  console.log('Hello');\n}\n\nfunction sayFunc() {\n  console.log('say');\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  sayHello: sayHello,\n  sayFunc: sayFunc\n});\n\n//# sourceURL=webpack:///./js/demo1.js?");
  }),
  "./js/main.js":
  (function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _demo1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo1.js */ \"./js/demo1.js\");\n\n\nconsole.log(_demo1_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n_demo1_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].sayHello();\n\n\n\n//# sourceURL=webpack:///./js/main.js?");
  })
});
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

**3.5.1 commonjs2 模式**
如果我们需要将打包返回值交给编译后的文件 module.export, 因此我们这边可以使用 libraryTarget 和 library， webpack配置如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
entry: './js/main.js',
output: {
  filename: 'bundle.js',
  // 将输出的文件都放在dist目录下
  path: path.resolve(__dirname, 'dist'),
  libraryTarget: 'commonjs2',
  library: 'util'
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

main.js 代码如下：

```
import demo1 from './demo1.js';
```

demo1.js 代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
function sayHello() {
  console.log('Hello');
}

function sayFunc() {
  console.log('say');
}

export default {
  sayHello: sayHello,
  sayFunc: sayFunc
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

打包后的文件是如下格式代码：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = (function(modules) { // webpackBootstrap
  var installedModules = {};
  function __webpack_require__(moduleId) {
    // ....
  }
  return __webpack_require__(__webpack_require__.s = "./js/main.js");
})
({
  "./js/demo1.js":
  (function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\nfunction sayHello() {\n  console.log('Hello');\n}\n\nfunction sayFunc() {\n  console.log('say');\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  sayHello: sayHello,\n  sayFunc: sayFunc\n});\n\n//# sourceURL=webpack:///./js/demo1.js?");
  }),
  "./js/main.js":
  (function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _demo1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo1.js */ \"./js/demo1.js\");\n\n\nconsole.log(_demo1_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n_demo1_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].sayHello();\n\n\n\n//# sourceURL=webpack:///./js/main.js?");
  })
});
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

那么从npm社区下载库后，使用库的方法是如下：

```
const util1 = require('library-name-in-npm');
util1.xxx(); // xxx就是 某个方法名称
```

**3.5.2 commonjs**
编写的库将通过commonjs导出。
webpack 配置代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
entry: './js/main.js',
output: {
  filename: 'bundle.js',
  // 将输出的文件都放在dist目录下
  path: path.resolve(__dirname, 'dist'),
  libraryTarget: 'commonjs',
  library: 'util'
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

打包后的文件变成如下代码：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
exports["util"] =
  (function(modules) { // webpackBootstrap
    var installedModules = {};
    function __webpack_require__(moduleId) {
      // ....
    }
    return __webpack_require__(__webpack_require__.s = "./js/main.js");
  })
  ({
    "./js/demo1.js":
   (function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\nfunction sayHello() {\n  console.log('Hello');\n}\n\nfunction sayFunc() {\n  console.log('say');\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  sayHello: sayHello,\n  sayFunc: sayFunc\n});\n\n//# sourceURL=webpack://util/./js/demo1.js?");
  }),
    "./js/main.js":
    (function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _demo1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo1.js */ \"./js/demo1.js\");\n\n\n\n\n\n//# sourceURL=webpack://util/./js/main.js?");

    })
});
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

如上代码：配置了 output.library = 'LibraryName'; webpack就会输出代码格式为：
exports['LibraryName'] = lib_code;

使用库的方法代码如下：

```
require('library-name-in-npm')['LibraryName'].doSomething();
```

注意：lib_code 为所有的webpack打包的代码；library-name-in-npm 是指模块被发布到npm代码仓库的名称。

**3.5.3 this**
编写的库将通过this被赋值给library指定的名称。

webpack配置代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
entry: './js/main.js',
output: {
  filename: 'bundle.js',
  // 将输出的文件都放在dist目录下
  path: path.resolve(__dirname, 'dist'),
  libraryTarget: 'this',
  library: 'util'
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

打包后的js文件如下格式：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
this["util"] =
  (function(modules) { // webpackBootstrap
    var installedModules = {};
    function __webpack_require__(moduleId) {
      // ....
    }
    return __webpack_require__(__webpack_require__.s = "./js/main.js");
  })
  ({
    "./js/demo1.js":
   (function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\nfunction sayHello() {\n  console.log('Hello');\n}\n\nfunction sayFunc() {\n  console.log('say');\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  sayHello: sayHello,\n  sayFunc: sayFunc\n});\n\n//# sourceURL=webpack://util/./js/demo1.js?");
  }),
    "./js/main.js":
    (function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _demo1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo1.js */ \"./js/demo1.js\");\n\n\n\n\n\n//# sourceURL=webpack://util/./js/main.js?");

    })
});
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

使用库的方法如下：

```
this.LibraryName.doSomething();
```

**3.5.4 window**
编写的库将通过window赋值给library指定的名称，输出的代码格式如下：
window['LibraryName'] = lib_code;

webpack的配置如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
entry: './js/main.js',
output: {
  filename: 'bundle.js',
  // 将输出的文件都放在dist目录下
  path: path.resolve(__dirname, 'dist'),
  libraryTarget: 'window',
  library: 'util'
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

打包后的js代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
window["util"] =
  (function(modules) { // webpackBootstrap
    var installedModules = {};
    function __webpack_require__(moduleId) {
      // ....
    }
    return __webpack_require__(__webpack_require__.s = "./js/main.js");
  })
  ({
    "./js/demo1.js":
   (function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\nfunction sayHello() {\n  console.log('Hello');\n}\n\nfunction sayFunc() {\n  console.log('say');\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  sayHello: sayHello,\n  sayFunc: sayFunc\n});\n\n//# sourceURL=webpack://util/./js/demo1.js?");
  }),
    "./js/main.js":
    (function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _demo1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo1.js */ \"./js/demo1.js\");\n\n\n\n\n\n//# sourceURL=webpack://util/./js/main.js?");

    })
});
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

使用库的方法如下代码：

```
window.LibraryName.doSomething();
```

**3.5.5 global**
编写的库将通过global赋值给通过library指定的名称，即把库挂载到global上，输出格式的代码如下：
global['LibraryName'] = lib_code;

和上面的window是一样的，无非就是把window改成global；

使用库的方法如下所示：

```
global.LibraryName.doSomething();
```

也可以打包成 'amd' 或 'umd' 模式结构代码， 在此介绍省略哦~

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

\4. 模式（mode）

提供mode配置项，告诉webpack使用对应的模式。

在webpack配置中提供mode选项。如下代码：

```
module.exports = {
  mode: 'production' // 或开发环境下 'development'
};
```

注意：使用 development模式代码不会被压缩，使用 production 代码会被压缩。

也可以在CLI参数中传递，比如如下代码：
**webpack --mode=production**

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

5.理解使用Loader

我们都知道webpack是适用于资源进行打包的，里面的所有资源都是模块，内部实现了对模块资源进行加载机制，但是webpack只能处理js模块，如果要处理其他类型的文件，就需要使用loader进行转换。Loader可以理解为是模块和资源的转换器，它本身也是一个函数，接收源文件作为参数，返回转换的结果。

配置loader，需要使用rules模块来读取和解析规则，它是一个数组，数组里面中的每一项描述了如何处理部分文件。
**1. 条件匹配：** 通过配置test，include，exclude三个配置项来选中loader需要应用规则的文件。
**2. 应用规则：** 对选中的文件通过use配置项来应用loader，可以只应用一个loader或者按照从右往左的顺序应用一组loader(切记：loader使用顺序是从右往左的)，也可以向loader传入参数。
**3. 重置顺序：** Loader执行的顺序默认是从右到左执行的，但是我们可以通过enforce选项可以将其中一个Loader的执行顺序放到最前或最后。

具体的配置代码可以参考如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  module: {
    rules: [
      {
        // 正则匹配 以 js结尾的
        test: /\.js$/,
        // babel 转换js文件，?cacheDirectory 用于缓存babel的编译结果，加快重新编译的速度
        use: ['babel-loader?cacheDirectory'],
        // include只包含src目录下的js文件，加快查找速度
        include: path.resolve(__dirname, 'src')
      },
      {
        // 正则匹配以 styl结尾的文件
        test: /\.styl$/,
        /* 
          use使用顺序从右到左执行，先使用stylus-loader插件去解析以styl结尾的文件成css文件，
          再使用css-loader插件去读取css文件，最后由 style-loader 将css的内容注入到javascript里面。
        */
        use: ['style-loader', 'css-loader', 'stylus-loader'],

        // 排除node_modules目录下的文件
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        // 对非文本文件采用file-loader去加载
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        use: ['file-loader']
      }
    ]
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

注意：在loader需要传入多个参数时，我们可以通过一个Object来描述，如下面是babel-loader配置：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
use: [
  {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    },
    /*
      enforce: 'post' 的含义是将Loader执行的顺序放到最后
      enforce: 'pre' 的含义是将Loader执行顺序放到最前面
    */
    enforce: 'post'
  }
]
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

当然，上面的test，include，exclude配置也可以传入多个，因此他们也支持数组的方式来传递了。比如如下配置：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
{
  test: [
    /\.js$/,
    /\.jsx$/
  ],
  include: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'src2')
  ],
  exclude: [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, 'node_modules2')
  ]
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

6.理解noParse

该配置项可以让webpack忽略对部分未采用模块化文件的递归解析和处理，该忽略的文件不能包含import，require， define等模块化语句。
那么这样做的好处是可以提高构建性能，比如像一些库jquery等就没有必要去使用webpack去递归解析和处理了。
使用配置代码如下：

```
module.exports = {
  module: {
    noParse: /jquery|xxjs/
  }
}
```

也可以使用函数，但是webpack需要从3.0版本才支持；如下配置代码：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  module: {
    noParse: (content) => {
      // content代表一个模块的文件路径
      return /jquery|xxjs/.test(content);
    }
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

\7. 理解alias

resolve.alias 是通过别名来将原导入路径映射成一个新的导入路径。比如如下配置：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      components: './src/components'
    }
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

如上代码配置，当我通过 import xxx from 'components/xxx' 导入时，实际上被alias替换成了
import xxx from './src/components/xxx';

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

8.理解extensions

在使用 import 导入文件时，有时候没有带入文件的后缀名，webpack会自动带上后缀去访问文件是否存在，那么默认的后缀名为
['.js', '.json']; 即：
extensions: ['.js', '.json']; 如果我们想自己配置.vue后缀名，防止在导入文件时候不需要加上后缀；我们可以使用webpack做如下配置：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      components: './src/components'
    },
    extensions: ['.js', '.vue'];
  }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

[回到顶部](https://www.cnblogs.com/tugenhua0707/p/9384953.html#_labelTop)

9.理解Externals

Externals 用来告诉webpack在构建代码时使用了不处理应用的某些依赖库，依然可以在代码中通过AMD，CMD或window全局方式访问。
什么意思呢？就是说我们在html页面中引入了jquery源文件后，比如如下代码：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>
  <link href="dist/main.css" rel="stylesheet" type="text/css" />
</head>
<body>
  <div id="app"></div>
  <script src="dist/bundle.js"></script>
</body>
</html>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

但是我们想在模块化的源代码里导入和使用jquery，首先我们肯定需要安装下 jquery依赖包，npm install --save jquery, 然后我们编写如下代码进行使用：

```
const $ = require('jquery');
console.log($);
```

构建打包后我们会发现输出的文件里面包含jquery的内容，这导致了jquery库引入了两次，并且导致了bundle.js文件变得更大，浪费加载流量。因此 Externals 配置项就是来解决这个问题的。

通过externals 可以告诉webpack在javascript运行环境中已经内置了哪些全局变量，不用将这些代码打包到代码里面去。
因此我们可以做如下配置：

```
module.export = {
  externals: {
    jquery: 'jQuery'
  }
};
```