### Rc-calendar 组件设置多语言

support en_US and zh_CN locale(UI), use moment.utcOffset to set timezone

locale - Object - import from 'rc-calendar/lib/locale/en_US' - calendar locale

~~~js
var React=require('react');
var Link= require('react-router').Link;
var IndexLink=require('react-router').IndexLink;

var Calendar =require('rc-calendar');
var TimePickerPanel=require('rc-time-picker/lib/Panel');
var DatePicker=require('rc-calendar/lib/Picker');

var zhCN = require('rc-calendar/lib/locale/zh_CN');

import moment from 'moment';
require('moment/locale/zh-cn');
~~~

详细参数说明

| name                 | type                                            | default                                               | description                                                  |
| -------------------- | ----------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| prefixCls            | String                                          |                                                       | prefixCls of this component                                  |
| className            | String                                          |                                                       | additional css class of root dom node                        |
| style                | Object                                          |                                                       | additional style of root dom node                            |
| dateRender           | (current, value) => React.Node                  |                                                       | date cell                                                    |
| renderSidebar        | () => React.Node                                |                                                       | side bar                                                     |
| renderFooter         | (mode) => React.Node                            |                                                       | extra footer                                                 |
| value                | moment                                          |                                                       | current value like input's value                             |
| defaultValue         | moment                                          |                                                       | defaultValue like input's defaultValue                       |
| locale               | Object                                          | import from 'rc-calendar/lib/locale/en_US'            | calendar locale                                              |
| format               | String \| String[]                              | depends on whether you set timePicker and your locale | use to format/parse date(without time) value to/from input. When an array is provided, all values are used for parsing and first value for display. |
| disabledDate         | Function(current:moment):Boolean                |                                                       | whether to disable select of current date                    |
| disabledTime         | Function(current:moment):Object                 |                                                       | a function which return a object with member of disabledHours/disabledMinutes/disabledSeconds according to rc-time-picker |
| showDateInput        | Boolean                                         | true                                                  | whether to show input on top of calendar panel               |
| showWeekNumber       | Boolean                                         | false                                                 | whether to show week number of year                          |
| showToday            | Boolean                                         | true                                                  | whether to show today button                                 |
| showOk               | Boolean                                         | auto                                                  | whether has ok button in footer                              |
| timePicker           | React Element                                   |                                                       | rc-timer-picker/lib/module/panel element                     |
| onSelect             | Function(date: moment)                          |                                                       | called when a date is selected from calendar                 |
| onClear              | Function()                                      |                                                       | called when a date is cleared from calendar                  |
| onChange             | Function(date: moment)                          |                                                       | called when a date is changed inside calendar (next year/next month/keyboard) |
| onOk                 | Function(date: moment)                          |                                                       | called when ok button is pressed, only if it's visible       |
| dateInputPlaceholder | String                                          |                                                       | date input's placeholder                                     |
| mode                 | enum('time', 'date', 'month', 'year', 'decade') | 'date'                                                | control which kind of panel should be shown                  |
| onPanelChange        | Function(date: moment, mode)                    |                                                       | called when panel changed                                    |
| clearIcon            | ReactNode                                       |                                                       | specific the clear icon.                                     |