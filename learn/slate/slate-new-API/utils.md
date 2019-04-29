# Utils

```js
import { KeyUtils } from 'slate'
```

Utility functions that ship with Slate that may be useful for certain use cases.

与slate附加的一个实用的函数，对于使用实例是很有用的。



## Key Utils

### `KeyUtils.create`

`create() => String`

Create a new key using the current key generator.

使用key生成器创建一个新的key

### `KeyUtils.resetGenerator`

`resetGenerator() => Void`

Resets Slate's internal key generating function to its default state. This is useful for server-side rendering, or anywhere you want to ensure fresh, deterministic creation of keys.

将slate内部的key-generator函数重置到默认状态。对于服务器端的渲染是有用的，或者你确定需要刷新的任何地方，可以动态创建key。

### `KeyUtils.setGenerator`

`setGenerator(generator: Function) => Void`

Allows you to specify your own key generating function, instead of using Slate's built-in default generator which simply uses auto-incrementing number strings. (eg. `'0'`, `'1'`, `'2'`, ...)

This will act globally on all uses of the Slate dependency.

