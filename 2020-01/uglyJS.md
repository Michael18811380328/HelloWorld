# uglyJS

功能：丑化 JS 文件，有效减小 js 文件大小；

## 基本使用

#### 0、环境配置

如果有 es6 代码，假设已经安装了 babel 并可以成功将ES6转换成ES5代码。(没有使用webpack进行打包)

#### 1、安装库

~~~bash
npm install uglify-js --save-dev
~~~

#### 2、修改配置

package.json 改成下面的配置

~~~json
"scripts": {
  "clean": "rm -rf dist && mkdir dist && rm -rf lib && mkdir lib",
  "build": "./node_modules/.bin/babel src --out-dir dist",
  "ugly": "uglifyjs dist/**.js --output lib/leetcode.min.js --compress --mangle",
  "prepublish": "npm run clean && npm run build && npm run ugly"
},
~~~

常用配置说明

--output 输出目录（默认为空，直接输出到终端）

--compress 压缩文件

--mangle 压缩名称



#### 3、丑化

运行 npm run prepublish 即可编辑成ES5（dist）和丑化（lib）leetcode.min.js（详细步骤如下）

3.1 删除 dist lib 目录，并新建文件夹；

3.2 使用 babel 编译 src 下面的全部文件，并放在 dist 目录下面

3.3 使用 uglyfyjs 将 dist 目录下面的丑化成 lib/leetcode.min.js 文件



#### 4、优缺点

适合场合：

输出单一文件；压缩丑化适应ES5（ES6首先使用babel编译后才能使用）

不适应场合：

如果 src 下面有多个文件，那么结果只会压缩成一个文件（先后次序不确定）；

所以这种方法不使用多模块多出口压缩（使用webpack处理多模块压缩）



下面是官网中详细的说明

~~~txt
    -p, --parse <options>       Specify parser options:
                                `acorn`  Use Acorn for parsing.
                                `bare_returns`  Allow return outside of functions.
                                                Useful when minifying CommonJS
                                                modules and Userscripts that may
                                                be anonymous function wrapped (IIFE)
                                                by the .user.js engine `caller`.
                                `expression`  Parse a single expression, rather than
                                              a program (for parsing JSON).
                                `spidermonkey`  Assume input files are SpiderMonkey
                                                AST format (as JSON).
    -c, --compress [options]    Enable compressor/specify compressor options:
                                `pure_funcs`  List of functions that can be safely
                                              removed when their return values are
                                              not used.
    -m, --mangle [options]      Mangle names/specify mangler options:
                                `reserved`  List of names that should not be mangled.
    --mangle-props [options]    Mangle properties/specify mangler options:
                                `builtins`  Mangle property names that overlaps
                                            with standard JavaScript globals.
                                `debug`  Add debug prefix and suffix.
                                `domprops`  Mangle property names that overlaps
                                            with DOM properties.
                                `keep_quoted`  Only mangle unquoted properties.
                                `regex`  Only mangle matched property names.
                                `reserved`  List of names that should not be mangled.
    -b, --beautify [options]    Beautify output/specify output options:
                                `beautify`  Enabled with `--beautify` by default.
                                `preamble`  Preamble to prepend to the output. You
                                            can use this to insert a comment, for
                                            example for licensing information.
                                            This will not be parsed, but the source
                                            map will adjust for its presence.
                                `quote_style`  Quote style:
                                               0 - auto
                                               1 - single
                                               2 - double
                                               3 - original
                                `wrap_iife`  Wrap IIFEs in parenthesis. Note: you may
                                             want to disable `negate_iife` under
                                             compressor options.
    -o, --output <file>         Output file path (default STDOUT). Specify `ast` or
                                `spidermonkey` to write UglifyJS or SpiderMonkey AST
                                as JSON to STDOUT respectively.
    --comments [filter]         Preserve copyright comments in the output. By
                                default this works like Google Closure, keeping
                                JSDoc-style comments that contain "@license" or
                                "@preserve". You can optionally pass one of the
                                following arguments to this flag:
                                - "all" to keep all comments
                                - a valid JS RegExp like `/foo/` or `/^!/` to
                                keep only matching comments.
                                Note that currently not *all* comments can be
                                kept when compression is on, because of dead
                                code removal or cascading statements into
                                sequences.
    --config-file <file>        Read `minify()` options from JSON file.
    -d, --define <expr>[=value] Global definitions.
    -e, --enclose [arg[:value]] Embed everything in a big function, with configurable
                                argument(s) & value(s).
    --keep-fnames               Do not mangle/drop function names.  Useful for
                                code relying on Function.prototype.name.
    --name-cache <file>         File to hold mangled name mappings.
    --self                      Build UglifyJS as a library (implies --wrap UglifyJS)
    --source-map [options]      Enable source map/specify source map options:
                                `base`  Path to compute relative paths from input files.
                                `content`  Input source map, useful if you're compressing
                                           JS that was generated from some other original
                                           code. Specify "inline" if the source map is
                                           included within the sources.
                                `filename`  Filename and/or location of the output source
                                            (sets `file` attribute in source map).
                                `includeSources`  Pass this flag if you want to include
                                                  the content of source files in the
                                                  source map as sourcesContent property.
                                `root`  Path to the original source to be included in
                                        the source map.
                                `url`  If specified, path to the source map to append in
                                       `//# sourceMappingURL`.
    --timings                   Display operations run time on STDERR.
    --toplevel                  Compress and/or mangle variables in top level scope.
    --verbose                   Print diagnostic messages.
    --warn                      Print warning messages.
    --wrap <name>               Embed everything in a big function, making the
                                “exports” and “global” variables available. You
                                need to pass an argument to this option to
                                specify the name that your module will take
                                when included in, say, a browser.
~~~



### 参考链接

官网

http://lisperator.net/uglifyjs/

https://github.com/mishoo/UglifyJS2

其他文档

https://www.jianshu.com/p/dd847647b7e4





## 附录

另一个压缩工具 babel-plugin-uglify，babel 插件。使用人数不多（三年没有更新），代码简单，可以参考。

UglifyJS integration for Babel.

It will allow you to integrate [UglifyJS minifier](https://github.com/mishoo/UglifyJS2) into Babel pipeline without a need for generating code from Babel and parsing back into UglifyJS just to minify it and generate back again. You can find a bit more detailed article on this [in my blog](https://rreverser.com/using-mozilla-ast-with-uglifyjs/).

### 安装

```
$ npm install babel-plugin-uglify --save-dev
```

### 使用

Note that plugin should be **always** runned after any ES6 transformers (use `:after` suffix as shown below), as UglifyJS doesn't understand ES6 at all, and thus will just break if you have anything left untransformed.

#### Via `.babelrc` (推荐)

**.babelrc**

```json
{
  "plugins": ["uglify:after"]
}
```

#### CLI

```bash
$ babel --plugins uglify:after script.js
```

#### Node API

```js
require('babel').transform('code', {
  plugins: ['uglify:after']
});
```

#### 核心代码 Index.js

~~~js
import { AST_Node, Compressor, TreeWalker } from 'uglify-js';

var compressor = Compressor();

class LocationFixer extends TreeWalker {
	constructor(path) {
		var filename = path.hub.file.opts.filenameRelative;
		super(node => {
			node.start.file = node.end.file = filename;
		});
	}
}

export default ({ types: t }) => ({
	visitor: {
		Program(ast) {
			// Convert to UglifyJS AST
			var uAST = AST_Node.from_mozilla_ast(ast);

			// Fix locations (Babel doesn't insert `loc.source` into nodes for some reason)
			uAST.walk(new LocationFixer(this));

			// Compress
			uAST.figure_out_scope();
			uAST = uAST.transform(compressor);

			// Mangle names
			uAST.figure_out_scope();
			uAST.compute_char_frequency();
			uAST.mangle_names();

			// Convert back to ESTree AST
			return uAST.to_mozilla_ast();
		}
	}
});
~~~

官网链接

https://github.com/rreverser/babel-plugin-uglify