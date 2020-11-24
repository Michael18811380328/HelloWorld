# MDN Intl.NumberFormat

The **`Intl.NumberFormat`** object is a constructor for objects that enable language sensitive number formatting.

这里可以把普通的数字，转换成不同的货币和格式样式字符串。

locale 是必传参数（支持不同国家的数字分隔符格式）；option 是可选参数是一个对象，style，currency 可以设置货币符号或者精确度计算；unit 是可选参数，可以增加单位（长度单位等）

~~~js
const number = 123456.789;

console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
// expected output: "123.456,79 €"

// the Japanese yen doesn't use a minor unit
console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number));
// expected output: "￥123,457"

// limit to three significant digits
console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number));
// expected output: "1,23,000"

~~~

## Constructor

`Intl.NumberFormat()` Creates a new `NumberFormat` object.

## 静态方法

- [`Intl.NumberFormat.supportedLocalesOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat/supportedLocalesOf)

  Returns an array containing those of the provided locales that are supported without having to fall back to the runtime's default locale. 返回一个数组，其中包含受支持的所提供语言环境的数组，而不必回退到运行时的默认语言环境。

## 实例方法

- [`Intl.NumberFormat.prototype.format()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat/format)

  Getter function that formats a number according to the locale and formatting options of this [`NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) object. 根据语言个选项格式，返回数字对应的格式。

- [`Intl.NumberFormat.prototype.formatToParts()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat/formatToParts)

  Returns an [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of objects representing the number string in parts that can be used for custom locale-aware formatting. 

  返回一个对象数组，该对象数组表示部分数字字符串，可用于自定义区域设置格式。

- [`Intl.NumberFormat.prototype.resolvedOptions()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat/resolvedOptions)

  Returns a new object with properties reflecting the locale and collation options computed during initialization of the object. 返回一个新对象，该对象的属性反映在对象初始化期间计算出的语言环境和排序规则选项。

## Examples

### Basic usage

In basic use without specifying a locale, a formatted string in the default locale and with default options is returned.

```js
var number = 3500;

console.log(new Intl.NumberFormat().format(number));
// → '3,500' if in US English locale
```

### Using `locales`

This example shows some of the variations in localized number formats. In order to get the format of the language used in the user interface of your application, make sure to specify that language (and possibly some fallback languages) using the `locales` argument: 此示例显示了本地化数字格式的一些变体。 为了获取应用程序用户界面中使用的语言格式，请确保使用locales参数指定该语言（可能还包括一些后备语言）

```js
var number = 123456.789;

// German uses comma as decimal separator and period for thousands
console.log(new Intl.NumberFormat('de-DE').format(number));
// → 123.456,789

// Arabic in most Arabic speaking countries uses real Arabic digits
console.log(new Intl.NumberFormat('ar-EG').format(number));
// → ١٢٣٤٥٦٫٧٨٩

// India uses thousands/lakh/crore separators
console.log(new Intl.NumberFormat('en-IN').format(number));
// → 1,23,456.789

// the nu extension key requests a numbering system, e.g. Chinese decimal
console.log(new Intl.NumberFormat('zh-Hans-CN-u-nu-hanidec').format(number));
// → 一二三,四五六.七八九

// when requesting a language that may not be supported, such as
// Balinese, include a fallback language, in this case Indonesian
console.log(new Intl.NumberFormat(['ban', 'id']).format(number));
// → 123.456,789
```

### Using `options`

The results can be customized using the `options` argument:

```js
var number = 123456.789;

// request a currency format
console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
// → 123.456,79 €

// the Japanese yen doesn't use a minor unit
console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number));
// → ￥123,457

// limit to three significant digits 限制为三个有效数字
console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number));
// → 1,23,000
```

### Using `style` and `unit`

```js
console.log(new Intl.NumberFormat("pt-PT",  {
    style: 'unit',
    unit: "mile-per-hour"
}).format(50));
// → 50 mi/h

console.log((16).toLocaleString('en-GB', {
    style: "unit",
    unit: "liter",
    unitDisplay: "long"
}));
// → 16 litres
```
