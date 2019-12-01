# lodash

## Installation

In a browser:
```html
<script src="lodash.js"></script>
```

Using npm:
```shell
$ npm i -g npm
$ npm i lodash
```
Note: add --save if you are using npm < 5.0.0

In Node.js:
```js
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
```

Looking for Lodash modules written in ES6 or smaller bundle sizes? Check out [lodash-es](https://www.npmjs.com/package/lodash-es).



## Why Lodash?

Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc. Lodash’s modular methods are great for:

 * Iterating arrays, objects, & strings
 * Manipulating & testing values
 * Creating composite functions

Lodash 处理了数组、数值、对象（深复制对象，比较对象）、字符串的一些问题，可以辅助开发大型应用。