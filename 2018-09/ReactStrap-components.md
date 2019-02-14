###### ReactStrap

1.alert

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

```js
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

2.badge 徽章：类似于小图标，小按钮（QQ空间分享按钮）

3.breadcrumbs 面包屑：层级菜单：网站不同层级设置菜单

4.button：基本六个颜色：primary secondary success info warning danger link

这个使用很多！

