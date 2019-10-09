## Jest 测试

JEST 集成了断言库，不需要再引入第三方的断言库，并且非常完美的支持React组件化测试。

#### 操作流程

1、新建文件夹（项目资料库）npm init 完成基本配置

2、安装jest测试框架

~~~bash
npm install --save-dev jest
~~~

3、改配置文件：package.json 

~~~json
{
  scripts:{
    "test": "jest"
  }
}
~~~

改配置文件后，现在运行 npm test 即可执行测试脚本

4、创建原始文件（单元测试开始）

~~~bash
touch Sum.js
vim Sum.js
~~~

~~~js
function sum(a, b){
   return a + b;
}

module.exports = sum;
~~~

5、创建测试文件

测试用例的文件名需要为 ***test.js

~~~bash
touch Sum.test.js
vim Sum.test.js
~~~

~~~js
const sum = require('./Sum.js')

test('test 1 plus 2 result', () => {
  expect(sum(1 , 2)).toBe(3);
});
~~~

6、运行测试

~~~bash
npm test
~~~

就可以在控制台看到运行结果



#### 常见断言库

官方断言库

https://jestjs.io/docs/zh-Hans/expect

#### 其他操作

https://www.jianshu.com/p/ce4f46cd9372

https://www.jianshu.com/p/f837d6afc9c6

