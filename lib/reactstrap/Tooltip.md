## Tooltip API 说明

Tooltip（提示框）是 Bootstrap 常见的组件之一，通常显示按钮的说明文本或者文件名等信息。

| 选项名称  | 类型/默认值                     | Data 属性名称  | 描述                                                         |
| --------- | ------------------------------- | -------------- | ------------------------------------------------------------ |
| animation | boolean *默认值：true*          | data-animation | 提示工具使用 CSS 渐变滤镜效果。                              |
| html      | boolean *默认值：false*         | data-html      | 向提示工具插入 HTML。如果为 false，jQuery 的 text 方法将被用于向 dom 插入内容。如果您担心 XSS 攻击，请使用 text。 |
| placement | string\|function *默认值：top*  | data-placement | 规定如何定位提示工具（即 top\|bottom\|left\|right\|auto）。 当指定为 *auto* 时，会动态调整提示工具。例如，如果 placement 是 "auto left"，提示工具将会尽可能显示在左边，在情况不允许的情况下它才会显示在右边。==这个很重要== |
| selector  | string *默认值：false*          | data-selector  | 如果提供了一个选择器，提示工具对象将被委派到指定的目标。     |
| title     | string \| function *默认值：''* | data-title     | 如果未指定 *title* 属性，则 title 选项是默认的 title 值。    |
| trigger   | string *默认值：'hover focus'*  | data-trigger   | 定义如何触发提示工具： **click\| hover \| focus \| manual**。您可以传递多个触发器，每个触发器之间用空格分隔。==默认是hover触发提示工具== |
| delay     | number \| object *默认值：0*    | data-delay     | 延迟显示和隐藏提示工具的毫秒数 - 对 manual 手动触发类型不适用。如果提供的是一个数字，那么延迟将会应用于显示和隐藏。如果提供的是对象，结构如下所示：`delay: { show: 500, hide: 100 }`==如果多个提示工具，最好设置延迟时间为100== |
| container | string \| false *默认值：false* | data-container | 向指定元素追加提示工具。 实例： container: 'body'            |

下面是详细的说明

~~~js
Tooltip.propTypes = {
  // space separated list of triggers (e.g. "click hover focus")
  trigger: PropTypes.string,
  // boundaries for popper, can be scrollParent, window, viewport, or any DOM element(边界元素，可以窗口，滚动的父元素，DOM元素，视口)
  boundariesElement: PropTypes.oneOfType([PropTypes.string, DOMElement]),
  // boolean to control the state of the tooltip
  isOpen: PropTypes.bool,
  hideArrow: PropTypes.bool,
  
  // callback for toggling isOpen in the controlling component. It will receive an object with info about the event that triggered it
  toggle: PropTypes.func,
  // target element or element ID, popover is attached to this element(目标元素或者元素ID，鼠标经过目标元素，对应的提示文本显示)
  target:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    DOMElement, // instanceof Element (https://developer.mozilla.org/en-US/docs/Web/API/Element)
  ]).isRequired,
  
  // Where to inject the popper DOM node, default to body
  container: PropTypes.oneOfType([PropTypes.string, PropTypes.func, DOMElement]),
  // optionally override show/hide delays - default { show: 0, hide: 250 }
  delay: PropTypes.oneOfType([
    PropTypes.shape({ show: PropTypes.number, hide: PropTypes.number }),
    PropTypes.number
  ]),
  className: PropTypes.string,
  // Apply class to the inner-tooltip
  innerClassName: PropTypes.string,
  // Apply class to the arrow-tooltip ('arrow' by default)
  arrowClassName: PropTypes.string,
  // optionally hide tooltip when hovering over tooltip content - default true
  autohide: PropTypes.bool,
  // convenience attachments for popover 通常设置位置为自动，组件会自动选择合适的位置。
  placement: PropTypes.oneOf([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
  ]),
  // Custom modifiers that are passed to Popper.js, see https://popper.js.org/popper-documentation.html#modifiers
  modifiers: PropTypes.object,
  offset: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  // Custom ref handler that will be assigned to the "ref" of the <div> wrapping the tooltip elements
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.object
  ])
}
~~~

~~~jsx
let delay = {show: 100, hide: 300};

return(
	<Tooltip delay={delay} isOpen={this.state.showToolTip} toggle={this.toggleToolTip} target={textTip} placement="bottom" >TextName</Tooltip>
);
~~~

