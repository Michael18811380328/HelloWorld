# Ant-design CSS 打包优化

最近使用蚂蚁金服的 ant-design-mobile 组件，下面记录一下使用过程的问题。

官方安装文档如下

https://github.com/ant-design/ant-design-mobile/blob/master/docs/react/introduce.en-US.md

安装完成后，官方强烈建议我们使用压缩版本的CSS

> **Note: Strongly recommended.**
>
> The following two ways used to load the **only components you used**, select one of the ways you like. 下面的两种方式会加载你需要的组件，选择其中的一种即可。
>
> - Use [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) (Recommended) 推荐使用 babel-plugin-inport 组件（在 .babelrc 文件中添加下面的配置）
>
>   ```json
>   // .babelrc or babel-loader option
>   {
>     "plugins": [
>       ["import", { "libraryName": "antd-mobile", "style": "css" }] // `style: true` for less
>     ]
>   }
>   ```
>
>   This allows you to import components from antd-mobile without having to manually import the corresponding stylesheet. The babel plugin will automatically import stylesheets.
>
>   这个 babel 插件不需要开发者手动安装CSS，可以根据使用情况自动加载相关的CSS。
>
>   ```js
>   // import js and css modularly, parsed by babel-plugin-import
>   import { DatePicker } from 'antd-mobile';
>   ```
>
> - Manually import （可以手动在JS文件中加入对应的CSS或者Less，这样做很繁琐-如果页面非常多）
>
>   ```js
>   import DatePicker from 'antd-mobile/lib/date-picker';  // for js
>   import 'antd-mobile/lib/date-picker/style/css';        // for css
>   // import 'antd-mobile/lib/date-picker/style';         // that will import less
>   ```

遇到的问题：按照上面的第一种安装方式，配置好babel后，打包出来的 CSS 包括 antd-mobile 中的全部CSS文件（全局的样式被影响，受到了Boss的批评）

阅读了 babel-plugin-import 说明文档后（链接：https://github.com/ant-design/babel-plugin-import#-libraryname-antd-style-true-）

> #### style
>
> - `["import", { "libraryName": "antd" }]`: import js modularly
> - `["import", { "libraryName": "antd", "style": true }]`: import js and css modularly (LESS/Sass source files)
> - `["import", { "libraryName": "antd", "style": "css" }]`: import js and css modularly (css built files)
>
> If option style is a `Function`, `babel-plugin-import` will auto import the file which filepath equal to the function return value. This is useful for the components library developers.
>
> 这里的配置不同：style 是可选配置，可以使 bool, 'css', Function 

> #### `{ "libraryName": "antd", style: true }`
>
> ```js
> import { Button } from 'antd';
> ReactDOM.render(<Button>xxxx</Button>);
> 
>       ↓ ↓ ↓ ↓ ↓ ↓
> 
> var _button = require('antd/lib/button');
> require('antd/lib/button/style');
> ReactDOM.render(<_button>xxxx</_button>);
> ```
>
> Note : 
>
> with `style: true` css source files are imported and optimizations can be done during compilation time. `style: true` can reduce the bundle size significantly, depending on your usage of the library.
>
> With `style: "css"`, pre bundled css files are imported as they are.
>
> 注意：使用 style: true 可以在编译过程中按需加载，可以显著减少打包后的文件大小（取决于你使用量）
>
> 使用 style : 'css' ，使用预先编译打包好的CSS文件（这里包括全部的CSS文件）

所以，更改一下配置，界面中就可以减少不需要的CSS了

~~~json
["import", {
  "libraryName": "antd-mobile",
  "style": "css"
}]
改成
["import", {
  "libraryName": "antd-mobile",
  "style": true
}]
~~~

问题解决

备注：这样又引起另一个问题：如果界面中很多CSS，这样按需加载后，CSS打包后的顺序不太好控制，那么ant-design的样式可能和其他组件的样式混淆。最后暂时使用引入全部的静态文件的形式（PC端不引入，移动端引入这个样式）。