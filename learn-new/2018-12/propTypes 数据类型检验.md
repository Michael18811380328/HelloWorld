## propTypes 数据类型检验

#### 为什么使用propTypes？

在 react 中，不同组件通过props进行单向传值；不同值类型可能造成不必要的麻烦。

在 JS 中，不同的数据类型可能存在强制数据类型转换。（string => number）

这些问题在写代码的时候不容易发现，如果界面中出现了数据类型的问题，不好找到问题的原因。

所以，引入propTypes，对于引入的props数据类型进行检验，避免潜在的问题。

~~~bash
npm install prop-types
~~~

```js
const propTypes = {
  showReviewerDialog: PropTypes.bool.isRequired,
};
AddReviewerDialog.propTypes = propTypes;
```

~~~js
Son.propTypes = {
     optionalArray: PropTypes.array,//检测数组类型
     optionalBool: PropTypes.bool,//检测布尔类型
     optionalFunc: PropTypes.func,//检测函数（Function类型）
     optionalNumber: PropTypes.number,//检测数字
     optionalObject: PropTypes.object,//检测对象
     optionalString: PropTypes.string,//检测字符串
     optionalSymbol: PropTypes.symbol,//ES6新增的symbol类型
}
~~~

~~~js
Son.propTypes = {
       number:PropTypes.oneOfType(
           [PropTypes.string,PropTypes.number]
         )
}
//oneofType 监测多个数据类型(一个props可以传入多个数据类型)
Son.propTypes = {
    number:PropTypes.oneOf(
          [12,13]
      )
}
~~~

