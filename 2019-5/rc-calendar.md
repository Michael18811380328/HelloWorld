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

实际案例中设置多语言和时区

~~~js
import moment from 'moment';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';

const zhCN = require('rc-calendar/lib/locale/zh_CN');
const zhTW = require('rc-calendar/lib/locale/zh_TW');
const enUS = require('rc-calendar/lib/locale/en_US');
const frFR = require('rc-calendar/lib/locale/fr_FR');
const deDE = require('rc-calendar/lib/locale/de_DE');
const esES = require('rc-calendar/lib/locale/es_ES');
const plPL = require('rc-calendar/lib/locale/pl_PL');
const csCZ = require('rc-calendar/lib/locale/cs_CZ');

const format = 'YYYY-MM-DD HH:mm:ss';
const now = moment();
const defaultCalendarValue = now.clone();


class {
  translateCalendar = (locale) => {
    let language = enUS;
    if (locale) {
      switch (locale) {
        case 'zh-ch':
          language = zhCN;
          break;
        case 'zh-tw':
          language = zhTW;
          break;
        case 'en':
          language = enUS;
          break;
        case 'fr':
          language = frFR;
          break;
        case 'de':
          language = deDE;
          break;
        case 'es':
          language = esES;
          break;
        case 'es-ar':
          language = esES;
          break;
        case 'es-mx':
          language = esES;
          break;
        case 'pl':
          language = plPL;
          break;
        case 'cs':
          language = csCZ;
          break;
      }
    }
    return language;
  }
  
  render() {
    const locale = this.translateCalendar(this.props.locale);
    const calendar = (
      <Calendar
      	...
        locale={locale}
      />
    );
  }
}
~~~

