## JS clone方法

JavaScript中并没有直接提供对象复制(Object Clone)的方法。因此下面的代码中改变对象b的时候，也就改变了对象a。

```js
a = {k1:1, k2:2, k3:3};
b = a;
b.k2 = 4;
```

如果只想改变b而保持a不变，就需要对对象a进行复制。

### 用jQuery进行对象复制

在可以使用jQuery的情况下，jQuery自带的`extend`方法可以用来实现对象的复制。

```js
a = {k1:1, k2:2, k3:3};
b = {};
$.extend(b,a);
```

 

### 自定义clone()方法来实现对象复制

下面的方法，是对象复制的基本想法。

```
Object.prototype.clone = function() {
  var copy = (this instanceof Array) ? [] : {};
  for (attr in this) {
    if (!obj.hasOwnProperty(attr)) continue;
    copy[attr] = (typeof this[i] == "object")?obj[attr].clone():obj[attr];
  } 
  return copy;
};


a = {k1:1, k2:2, k3:3};
b = a.clone();
```

下面的例子则考虑的更全面些，适用于大部分对象的深度复制(Deep Copy)。

```js
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, var len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
```

 