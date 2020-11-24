# npm link用法总结

npm link用来在本地项目和本地npm模块之间建立连接，可以在本地进行模块测试

具体用法：

**1. 项目和模块在同一个目录下，可以使用相对路径**

npm link ../module

**2. 项目和模块不在同一个目录下**

cd到模块目录，npm link，进行全局link

cd到项目目录，npm link 模块名(package.json中的name)

**3. 解除link**

解除项目和模块link，项目目录下，npm unlink 模块名

解除模块全局link，模块目录下，npm unlink 模块名



# npm link的使用



## 功能

在本地开发npm模块的时候，我们可以使用npm link命令，将npm 模块链接到对应的运行项目中去，方便地对模块进行调试和测试

## 使用方法

### 创建链接

在这里，我们有两个项目，一个是`npm-link-module`，是我们要开发的npm模块,另一个是`npm-link-example`,是我们要运行npm模块的项目

首先，进入我们的`npm-link-module`项目，执行npm link

```ruby
cd npm-link-module
npm link
```

执行命令后，npm-link-module会根据package.json上的配置，被链接到全局，路径是`{prefix}/lib/node_modules/`，这是官方文档上的描述，我们可以使用`npm config get prefix`命令获取到prefix的值(不过我这里使用的是windows，实际被链接到的路径是`{prefix}/node_modules/`，不知道是不是npm升级的原因)，如果是win系统的话，实际观察，会发现在`{prefix}/lib/node_modules/`路径下的`node-link-module`是一个快捷方式

然后，进入`npm-link-example`项目，执行 npm link npm-link-module

```ruby
cd npm-link-example
npm link npm-link-module
```

`npm-link-module`会被链接到 `npm-link-example/node_modules`下面，同样也是快捷方式

OK，链接创建完成



### 代码实践

好，让我们测试一下创建链接之后会有哪些便利

之前在`npm-link-module`里，我是这样写的

我们在`npm-link-example`引用然后运行
