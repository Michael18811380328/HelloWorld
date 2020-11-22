# 使用Jest测试JavaScript

### **1 什么是 Jest?**

Jest是 Facebook 的一套开源的 JavaScript 测试框架， 它自动集成了断言、JSDom、覆盖率报告等开发者所需要的所有测试工具，是一款几乎零配置的测试框架。并且它对同样是 Facebook 的开源前端框架 React 的测试十分友好。

### **2 安装Jest**

#### **2.1 初始化`package.json`**

在`shell`中输入以下命令，初始化前端项目并生成`package.json`：

```bash
npm init -y
```

#### **2.2 安装Jest及相关依赖**

在`shell`中输入以下命令，安装测试所需要的依赖：

```bash
npm install -D jest babel-jest babel-core babel-preset-env regenerator-runtime
```

`babel-jest`、 `babel-core`、 `regenerator-runtime`、`babel-preset-env`这几个依赖是为了让我们可以使用ES6的语法特性进行单元测试，ES6提供的 `import` 来导入模块的方式，Jest本身是不支持的。

#### **2.3 添加`.babelrc`文件**

在项目的根目录下添加`.babelrc`文件，并在文件复制如下内容:

```json
{
  "presets": ["env"]
}
```

#### **2.4 修改`package.json`中的`test`脚本**

打开`package.json`文件，将`script`下的`test`的值修改为`jest`：

```bash
"scripts": {
  "test": "jest"
}
```

### **3. 编写你的第一个Jest测试**

**创建`src`和`test`目录及相关文件**

- 在项目根目录下创建`src`目录，并在`src`目录下添加`functions.js`文件
- 在项目根目录下创建`test`目录，并在`test`目录下创建`functions.test.js`文件

Jest会自动找到项目中所有使用`.spec.js`或`.test.js`文件命名的测试文件并执行，通常我们在编写测试文件时遵循的命名规范：**测试文件的文件名 = 被测试模块名 + `.test.js`**，例如被测试模块为`functions.js`，那么对应的测试文件命名为`functions.test.js`。

**在`src/functions.js`中创建被测试的模块**

```javascript
export default {
  sum(a, b) {
    return a + b;
  }
}
```

**在`test/functions.test.js`文件中创建测试用例**

```javascript
import functions from '../src/functions';

test('sum(2 + 2) 等于 4', () => {
  expect(functions.sum(2, 2)).toBe(4);
})
```

**运行`npm run test`, Jest会在`shell`中打印出以下消息：**

```javascript
 PASS  test/functions.test.js
  √ sum(2 + 2) 等于 4 (7ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.8s
```

### **4.常用的几个Jest断言**

上面测试用例中的`expect(functions.sum(2, 2)).toBe(4)`为一句断言，Jest为我们提供了`expect`函数用来包装被测试的方法并返回一个对象，该对象中包含一系列的匹配器来让我们更方便的进行断言，上面的`toBe`函数即为一个匹配器。我们来介绍几种常用的Jest断言，其中会涉及多个匹配器。

**`.not`**

```javascript
//functions.test.js
import functions  from '../src/functions'

test('sum(2, 2) 不等于 5', () => {
  expect(functions.sum(2, 2)).not.toBe(5);
})
```

`.not`修饰符允许你测试结果不等于某个值的情况，这和英语的语法几乎完全一样，很好理解。

**`.toEqual()`**

```javascript
// functions.js
export default {
  getAuthor() {
    return {
      name: 'LITANGHUI',
      age: 24,
    }
  }
}
// functions.test.js
import functions  from '../src/functions';

test('getAuthor()返回的对象深度相等', () => {
  expect(functions.getAuthor()).toEqual(functions.getAuthor());
})

test('getAuthor()返回的对象内存地址不同', () => {
  expect(functions.getAuthor()).not.toBe(functions.getAuthor());
})
```

`.toEqual`匹配器会递归的检查对象所有属性和属性值是否相等，所以如果要进行引用类型的比较时，请使用`.toEqual`匹配器而不是`.toBe`。

**`.toHaveLength`**

```javascript
// functions.js
export default {
  getIntArray(num) {
    if (!Number.isInteger(num)) {
      throw Error('"getIntArray"只接受整数类型的参数');
    }

    let result = [];
    for (let i = 0, len = num; i < len; i++) {
      result.push(i);
    }
    
    return result;
  }
}
// functions.test.js
import functions  from '../src/functions';

test('getIntArray(3)返回的数组长度应该为3', () => {
  expect(functions.getIntArray(3)).toHaveLength(3);
})
```

`.toHaveLength`可以很方便的用来测试字符串和数组类型的长度是否满足预期。

**`.toThrow`**

```javascript
// functions.test.js
import functions  from '../src/functions';

test('getIntArray(3.3)应该抛出错误', () => {
  function getIntArrayWrapFn() {
    functions.getIntArray(3.3);
  }
  expect(getIntArrayWrapFn).toThrow('"getIntArray"只接受整数类型的参数');
})
```

`.toThorw`可能够让我们测试被测试方法是否按照预期抛出异常，但是在使用时需要注意的是：**我们必须使用一个函数将将被测试的函数做一个包装**，正如上面`getIntArrayWrapFn`所做的那样，否则会因为函数抛出导致该断言失败。

**`.toMatch`**

```javascript
// functions.test.js
import functions  from '../src/functions';

test('getAuthor().name应该包含"li"这个姓氏', () => {
  expect(functions.getAuthor().name).toMatch(/li/i);
})
```

`.toMatch`传入一个正则表达式，它允许我们用来进行字符串类型的正则匹配。



### 5 测试异步函数

**安装`axios`**
这里我们使用最常用的http请求库`axios`来进行请求处理

```bash
npm install axios
```

**编写http请求函数**
我们将请求`http://jsonplaceholder.typicode.com/users/1`，这是由**JSONPlaceholder**提供的mock请求地址

JSONPlaceholder

```javascript
// functions.js
import axios from 'axios';

export default {
  fetchUser() {
    return axios.get('http://jsonplaceholder.typicode.com/users/1')
      .then(res => res.data)
      .catch(error => console.log(error)
    );
  }
}
// functions.test.js
import functions  from '../src/functions';

test('fetchUser() 可以请求到一个含有name属性值为Leanne Graham的对象', () => {
  expect.assertions(1);
  return functions.fetchUser()
    .then(data => {
      expect(data.name).toBe('Leanne Graham');
    });
})
```

上面我们调用了`expect.assertions(1)`，==它能确保在异步的测试用例中，有一个断言会在回调函数中被执行==。这在进行异步代码的测试中十分有效。

**使用`async`和`await`精简异步代码**

```javascript
test('fetchUser() 可以请求到一个用户名字为Leanne Graham', async () => {
  expect.assertions(1);
  const data =  await functions.fetchUser();
  expect(data.name).toBe('Leanne Graham')
})
```

当然我们既然安装了`Babel`，为何不使用`async`和`await`的语法来精简我们的异步测试代码呢? 但是别忘记都需要调用`expect.assertions`方法。
