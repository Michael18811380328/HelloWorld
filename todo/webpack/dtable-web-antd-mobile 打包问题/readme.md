# 样式错误分析

### 错误现象

dtable-web 中，本地开发样式正常，但是 dev 上样式不正常（统计界面和表头样式不正常）

### 错误分析

本地开发中，antd-mobile 对应的CSS在前，dtable 的 CSS 在后，界面可以正常显示；dev 上面，dtable CSS 编译后为 commons.buldle.css 在前，antd-mobile 直接由 less 编译成 css 未打包，在后面。所以自定义的样式被已有的 antd-mobile 的样式覆盖，样式错误。

下面是错误的代码 webpack-config-dev.js

~~~js
// common function to get style loaders
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      // 这个函数中，如果是开发环境，直接使用 style-loader；如果是生产环境，需要miniCss压缩后操作
      isEnvDevelopment && {
        loader: require.resolve('style-loader')
      },
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }
    return loaders;
  };


module: {
      rules: [
        // js loader
        {
          oneOf: [
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 0,
                sourceMap: isEnvProduction && shouldUseSourceMap,
              }),
              sideEffects: true,
            },
            // Adds support for CSS Modules 
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              }),
            },
						// 处理 sass 文件（webpack默认配置）已经使用getStyleLoaders这个函数，可以在开发环境中使用未压缩的CSS，在生产环境中使用压缩的CSS文件。
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                'sass-loader'
              ),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            // Adds support for CSS Modules, but using SASS
            // using the extension .module.scss or .module.sass
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
                'sass-loader'
              ),
            },
						
            // 默认的Less处理，只使用三个loader处理less文件。在生产环境中，会渲染成多个style文件，不会把antd-mobile 文件打包到 commons.trunk.css 中。
           	{
              test: /\.less$/,
              use:  [
                {loader: 'style-loader'},
                {loader: 'css-loader'}, 
                {
                  loader: 'less-loader',
                  options: {
                    javascriptEnabled: true
                  }
                }
              ],
            },
           
          ],
        },
      ],
    },
~~~

### 问题解决

~~~js
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

module: {
  rule: [
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
          # 增加      javascriptEnabled: true,
        },
      }
    );
  ]
}

// 修改下面的 less loader，在生产环境中可以判断，把less文件打包到 trunc.css 文件中。
{
  test: lessRegex,
    exclude: lessModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          sourceMap: isEnvProduction && shouldUseSourceMap
        },
        'less-loader'
      ),
},
  {
    test: lessModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          sourceMap: isEnvProduction && shouldUseSourceMap,
          modules: true,
          getLocalIdent: getCSSModuleLocalIdent,
        },
        'less-loader'
      ),
  },
~~~

现在生产环境中部署后，样式正常

PR： https://github.com/seafileltd/dtable-web/pull/228/files

### 参考文件

官网文档 https://webpack.docschina.org/concepts/entry-points/

React+less https://blog.csdn.net/qwe502763576/article/details/83242823

https://www.jianshu.com/p/6b0b80eb3e2e

https://github.com/ant-design/ant-design/issues/3442#issuecomment-374877201

https://www.cnblogs.com/mydxy/articles/10157215.html

https://www.cnblogs.com/ldld/p/6488830.html





现在的问题是：

打包的bundle中，那么其他的界面也会引用这个 bundle.css，就会影响其他界面的样式（body 的背景色）

现在还是原始的问题：按需加载。加载的部分中，不能有body的样式。

原因：

antd-mobile 中引用任何一个组件时，都会引用 style/index.css 文件。所以，不管使用 less 还是使用 css，都会把这部分公共组件引入。目前没有特别好的办法（除非把每一个组件单独应用，然后把公共样式中不影响默认样式的部分拿过来）。

