# React 自定义滚动条

react-custom-scrollbars： https://malte-wessel.com/react-custom-scrollbars/

支持下面的功能：

- 原生流畅的浏览器滚动
- 移动设备的原生滚动条
- 可完全自定义
- 自动隐藏；自动高度
- 在客户端和服务器上通用
- requestAnimationFrame为60fps
- 没有多余的样式表
- 经过良好测试，代码覆盖率100％

**[Demos](http://malte-wessel.github.io/react-custom-scrollbars/) · [Documentation](https://github.com/malte-wessel/react-custom-scrollbars/tree/master/docs)**

## Installation

```
npm install react-custom-scrollbars --save
```

## Usage

This is the minimal configuration. [Check out the Documentation for advanced usage](https://github.com/malte-wessel/react-custom-scrollbars/tree/master/docs).

```jsx
import { Scrollbars } from 'react-custom-scrollbars';

class App extends Component {
  render() {
    return (
      <Scrollbars style={{ width: 500, height: 300 }}>
        <p>Some great content...</p>
      </Scrollbars>
    );
  }
}
```

The `<Scrollbars>` component is completely customizable. Check out the following code:

```jsx
import { Scrollbars } from 'react-custom-scrollbars';

class CustomScrollbars extends Component {
  render() {
    return (
      <Scrollbars
        onScroll={this.handleScroll}
        onScrollFrame={this.handleScrollFrame}
        onScrollStart={this.handleScrollStart}
        onScrollStop={this.handleScrollStop}
        onUpdate={this.handleUpdate}
        renderView={this.renderView}
        renderTrackHorizontal={this.renderTrackHorizontal}
        renderTrackVertical={this.renderTrackVertical}
        renderThumbHorizontal={this.renderThumbHorizontal}
        renderThumbVertical={this.renderThumbVertical}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax={200}
        thumbMinSize={30}
        universal={true}
        {...this.props}>
    );
  }
}
```

All properties are documented in the [API docs](https://github.com/malte-wessel/react-custom-scrollbars/blob/master/docs/API.md)

## Examples

Run the simple example:

```bash
# Make sure that you've installed the dependencies
npm install
# Move to example directory
cd react-custom-scrollbars/examples/simple
npm install
npm start
```

## Tests

```bash
# Make sure that you've installed the dependencies
npm install
# Run tests
npm test
```

### Code Coverage

```bash
# Run code coverage. Results can be found in `./coverage`
npm run test:cov
```



# API

## `<Scrollbars>`

### Props

- ```
  onScroll
  ```

  : (Function) Event handler

  - Signature: `onScroll(event)`

- ```
  onScrollFrame
  ```

  : (Function) Runs inside the animation frame.

  - Signature: `onScroll(values)`

  - ```
    values
    ```

    : (Object) Values about the current position

    - `values.top`: (Number) scrollTop progess, from 0 to 1
    - `values.left`: (Number) scrollLeft progess, from 0 to 1
    - `values.clientWidth`: (Number) Width of the view
    - `values.clientHeight`: (Number) Height of the view
    - `values.scrollWidth`: (Number) Native scrollWidth
    - `values.scrollHeight`: (Number) Native scrollHeight
    - `values.scrollLeft`: (Number) Native scrollLeft
    - `values.scrollTop`: (Number) Native scrollTop

- `onScrollStart` (Function) Called when scrolling starts

- `onScrollStop` (Function) Called when scrolling stops

- ```
  onUpdate
  ```

   

  (Function) Called when ever the component is updated. Runs inside the animation frame

  - Signature: `onUpdate(values)`

- `renderView`: (Function) The element your content will be rendered in

- `renderTrackHorizontal`: (Function) Horizontal track element

- `renderTrackVertical`: (Function) Vertical track element

- `renderThumbHorizontal`: (Function) Horizontal thumb element

- `renderThumbVertical`: (Function) Vertical thumb element

- `hideTracksWhenNotNeeded`: (Boolean) Hide tracks (`visibility: hidden`) when content does not overflow container. (default: false)

- `thumbSize`: (Number) Set a fixed size for thumbs in px.

- `thumbMinSize`: (Number) Minimal thumb size in px. (default: 30)

- ```
  autoHide
  ```

  : (Boolean) Enable auto-hide mode (default:

   

  ```
  false
  ```

  )

  - When `true` tracks will hide automatically and are only visible while scrolling.

- `autoHideTimeout`: (Number) Hide delay in ms. (default: 1000)

- `autoHideDuration`: (Number) Duration for hide animation in ms. (default: 200)

- ```
  autoHeight
  ```

  : (Boolean) Enable auto-height mode. (default: false)

  - When `true` container grows with content

- `autoHeightMin`: (Number) Set a minimum height for auto-height mode (default: 0)

- `autoHeightMax`: (Number) Set a maximum height for auto-height mode (default: 200)

- ```
  universal
  ```

  : (Boolean) Enable universal rendering (default:

   

  ```
  false
  ```

  )

  - [Learn how to use universal rendering](https://github.com/malte-wessel/react-custom-scrollbars/blob/master/docs/API.md#link)

### Methods

- `scrollTop(top = 0)`: scroll to the top value
- `scrollLeft(left = 0)`: scroll to the left value
- `scrollToTop()`: scroll to top
- `scrollToBottom()`: scroll to bottom
- `scrollToLeft()`: scroll to left
- `scrollToRight()`: scroll to right
- `getScrollLeft()`: get scrollLeft value
- `getScrollTop()`: get scrollTop value
- `getScrollWidth()`: get scrollWidth value
- `getScrollHeight()`: get scrollHeight value
- `getClientWidth()`: get view client width
- `getClientHeight()`: get view client height
- `getValues()`: get an object with values about the current position.



# Usage

## Default Scrollbars

The `<Scrollbars>` component works out of the box with some default styles. The only thing you need to care about is that the component has a `width` and `height`:

```jsx
import { Scrollbars } from 'react-custom-scrollbars';

class App extends Component {
  render() {
    return (
      <Scrollbars style={{ width: 500, height: 300 }}>
        <p>Some great content...</p>
      </Scrollbars>
    );
  }
}
```

Also don't forget to set the `viewport` meta tag, if you want to **support mobile devices**

```jsx
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
```

## Events

There are several events you can listen to:

```jsx
import { Scrollbars } from 'react-custom-scrollbars';

class App extends Component {
  render() {
    return (
      <Scrollbars
        // Will be called with the native scroll event
        onScroll={this.handleScroll}
        // Runs inside the animation frame. Passes some handy values about the current scroll position
        onScrollFrame={this.handleScrollFrame}
        // Called when scrolling starts
        onScrollStart={this.handleScrollStart}
        // Called when scrolling stops
        onScrollStop={this.handlenScrollStop}
        // Called when ever the component is updated. Runs inside the animation frame
        onUpdate={this.handleUpdate}>
        <p>Some great content...</p>
      </Scrollbars>
    );
  }
}
```

## Auto-hide

You can activate auto-hide by setting the `autoHide` property.

```jsx
import { Scrollbars } from 'react-custom-scrollbars';

class App extends Component {
  render() {
    return (
      <Scrollbars
        // This will activate auto hide
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}>
        <p>Some great content...</p>
      </Scrollbars>
    );
  }
}
```

## Auto-height

You can activate auto-height by setting the `autoHeight` property.

```jsx
import { Scrollbars } from 'react-custom-scrollbars';

class App extends Component {
  render() {
    return (
      <Scrollbars
        // This will activate auto-height
        autoHeight
        autoHeightMin={100}
        autoHeightMax={200}>
        <p>Some great content...</p>
      </Scrollbars>
    );
  }
}
```

## Universal rendering

If your app runs on both client and server, activate the `universal` mode. This will ensure that the initial markup on client and server are the same:

```jsx
import { Scrollbars } from 'react-custom-scrollbars';

class App extends Component {
  render() {
    return (
      // This will activate universal mode
      <Scrollbars universal>
        <p>Some great content...</p>
      </Scrollbars>
    );
  }
}
```