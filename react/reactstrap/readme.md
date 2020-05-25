

# Readme

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

## Layout Components (Container, Row, Col)

```jsx
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>.col</Col>
        </Row>
        <Row>
          <Col>.col</Col>
          <Col>.col</Col>
          <Col>.col</Col>
          <Col>.col</Col>
        </Row>
        <Row>
          <Col xs="3">.col-3</Col>
          <Col xs="auto">.col-auto - variable width content</Col>
          <Col xs="3">.col-3</Col>
        </Row>
        <Row>
          <Col xs="6">.col-6</Col>
          <Col xs="6">.col-6</Col>
        </Row>
        <Row>
          <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
          <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
          <Col sm="4">.col-sm-4</Col>
        </Row>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 1 }}>.col-sm-6 .order-sm-2 .offset-sm-1</Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>.col-sm-12 .col-md-6 .offset-md-3</Col>
        </Row>
        <Row>
          <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
          <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
        </Row>
      </Container>
    );
  }
}
```

#### Container Properties

```jsx
Container.propTypes = {
  fluid:  PropTypes.bool
  // applies .container-fluid class
}
```

#### Row Properties

```jsx
Row.propTypes = {
  noGutters: PropTypes.bool,
  // see https://reactstrap.github.io/components/form Form Grid with Form Row
  form: PropTypes.bool
}
```

#### Col Properties

```jsx
const stringOrNumberProp = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const columnProps = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool,
  PropTypes.shape({
    size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
    // example size values:
    // 12 || "12" => col-12 or col-`width`-12
    // auto => col-auto or col-`width`-auto
    // true => col or col-`width`
    order: stringOrNumberProp,
    offset: stringOrNumberProp
  })
]);

Col.propTypes = {
  xs: columnProps,
  sm: columnProps,
  md: columnProps,
  lg: columnProps,
  xl: columnProps,
  // override the predefined width (the ones above) with your own custom widths.
  // see https://github.com/reactstrap/reactstrap/issues/297#issuecomment-273556116
  widths: PropTypes.array,
}
```

## alert

```html
<Alert color="primary">
  This is a primary alert — check it out!
  可以一句话，可以设置h和p
</Alert>
```

```js
Alert.propTypes = {
  className: PropTypes.string,
  closeClassName: PropTypes.string,
  color: PropTypes.string, // default: 'success'
  isOpen: PropTypes.bool,  // default: true
  toggle: PropTypes.func,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // Controls the transition of the alert fading in and out
  // See Fade for more details
  transition: PropTypes.shape(Fade.propTypes),
}
```

```jsx
import React from 'react';
import { Alert } from 'reactstrap';

class AlertExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
        I am an alert and I can be dismissed!
      </Alert>
    );
  }
}

export default AlertExample;
```

## demo

~~~jsx
ReactModal.setAppElement('#main');

class ExampleApp extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  render () {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="onRequestClose Example"
           onRequestClose={this.handleCloseModal}
           shouldCloseOnOverlayClick={false}
        >
          <p>Modal text!</p>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}

const props = {};

ReactDOM.render(<ExampleApp {...props} />, document.getElementById('main'))
~~~

