# TimePicker

React TimePicker 

组件是支付宝的时间组件（React）。学习阿里的编程风格和技巧。

构建工具是 rc-tools （阿里封装的webpack打包工具），这个小组件用于 rc-calendar。

JS部分使用React框架, typescript 语法（JSlint严格限制语法）css 部分使用 Less样式

example
--------

http://react-component.github.io/time-picker/

install
-------

```bash
npm install rc-time-picker
```

## Test Case

```bash
npm test
npm run chrome-test
```

## Coverage

```bash
npm run coverage
```

open coverage/ dir

## Publish

~~~bash
npm run test
npm run start 
npm run compile
npm run prepublish
npm run pub
~~~


Usage
-----

```js
import React from 'react';
import ReactDOM from 'react-dom';
import TimePicker from 'rc-time-picker';

import 'rc-time-picker/assets/index.css';

ReactDOM.render(<TimePicker />, container);
```

API
---

**TimePicker**

| Name                    | Type                              | Default | Description |
|-------------------------|-----------------------------------|---------|-------------|
| prefixCls               | String                            | 'rc-time-picker' | prefixCls of this component |
| clearText               | String                            | 'clear' | clear tooltip of icon |
| disabled                | Boolean                           | false   | whether picker is disabled |
| allowEmpty              | Boolean                           | true | allow clearing text |
| open                    | Boolean                           | false | current open state of picker. controlled prop |
| defaultValue            | moment                            | null | default initial value |
| defaultOpenValue        | moment                            | moment() | default open panel value, used to set utcOffset,locale if value/defaultValue absent |
| value                   | moment                            | null | current value |
| placeholder             | String                            | '' | time input's placeholder |
| className               | String                            | '' | time picker className |
| id                      | String                            | '' | time picker id |
| popupClassName          | String                            | '' | time panel className |

next page

| Name                    | Type                              | Default | Description |
|-------------------------|-----------------------------------|---------|-------------|
| showHour                | Boolean                           | true | whether show hour |
| showMinute              | Boolean                           | true | whether show minute |
| showSecond              | Boolean                           | true | whether show second |
| format                  | String                            | - | moment format |
| disabledHours           | Function                          | - | disabled hour options |
| disabledMinutes         | Function                          | - | disabled minute options |
| disabledSeconds         | Function                          | - | disabled second options |
| use12Hours              | Boolean                           | false | 12 hours display mode |
| hideDisabledOptions     | Boolean                           | false | whether hide disabled options |
| onChange                | Function                          | null | called when select a different value |
| onAmPmChange            | Function                          | null | called when select an am/pm value |
| addon                   | Function                          | - | called from timepicker panel to render some addon to its bottom, like an OK button. Receives panel instance as parameter, to be able to close it like `panel.close()`.|
| placement               | String                            | bottomLeft | one of ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] |
| transitionName          | String                            | ''  |  |
| name                    | String                            | - | sets the name of the generated input |
| onOpen                  | Function({ open })                |   | when TimePicker panel is opened      |
| onClose                 | Function({ open })                |   | when TimePicker panel is closed      |
| hourStep                | Number                            | 1 | interval between hours in picker  |
| minuteStep              | Number                            | 1 | interval between minutes in picker  |
| secondStep              | Number                            | 1 | interval between seconds in picker  |
| focusOnOpen             | Boolean                           | false | automatically focus the input when the picker opens |
| inputReadOnly             | Boolean                           | false | set input to read only |
| inputIcon             | ReactNode                           |  | specific the select icon. |
| clearIcon             | ReactNode                           |  | specific the clear icon. |
| popupStyle | object | object | customize popup style |

