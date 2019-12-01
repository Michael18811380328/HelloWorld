# react-transition-group

> **ATTENTION!** To address many issues that have come up over the years, the API in v2 and above is not backwards compatible with the original [`React addon (v1-stable)`](https://github.com/reactjs/react-transition-group/tree/v1-stable).
>
> **For a drop-in replacement for `react-addons-transition-group` and `react-addons-css-transition-group`, use the v1 release. Documentation and code for that release are available on the [`v1-stable`](https://github.com/reactjs/react-transition-group/tree/v1-stable) branch.**
>
> We are no longer updating the v1 codebase, please upgrade to the latest version when possible

A set of components for managing component states (including mounting and unmounting) over time, specifically designed with animation in mind.

注意：版本2和版本1不兼容，现在版本1代码不会更新，请升级到最新版本。很多管理组件状态的组件已经过时了（特别是为动画设计的组件）

官网链接：https://github.com/reactjs/react-transition-group

## 1、Examples

Clone the repo first:

```
git@github.com:reactjs/react-transition-group.git
```

Then run `npm install` (or `yarn`), and finally `npm run storybook` to start a storybook instance that you can navigate to in your browser to see the examples.

[npm-badge]: https://img.shields.io/npm/v/react-transition-group.svg
[npm]: https://www.npmjs.org/package/react-transition-group

克隆代码，安装依赖，npm run storybook 即可展示案例



## 2、Getting Started

### Installation

通过 npm yarn cdn 可以安装

```bash
# npm
npm install react-transition-group --save

# yarn
yarn add react-transition-group
```

### CDN / External

Since react-transition-group is fairly small, the overhead of including the library in your application is negligible. However, in situations where it may be useful to benefit from an external CDN when bundling, link to the following CDN: https://unpkg.com/react-transition-group/dist/react-transition-group.js

## Components

- [Transition](https://reactcommunity.org/react-transition-group/transition)
- [CSSTransition](https://reactcommunity.org/react-transition-group/css-transition)
- [SwitchTransition](https://reactcommunity.org/react-transition-group/switch-transition)
- [TransitionGroup](https://reactcommunity.org/react-transition-group/transition-group)

有下面四个主要组件：把需要加入动画的元素放在组件内部，然后设置外部组件的状态和控制函数，这样就增加了进入退出的动画效果。



## 3、Transition

The Transition component lets you describe a transition from one component state to another *over time* with a simple declarative API. Most commonly it's used to animate the mounting and unmounting of a component, but can also be used to describe in-place transition states as well.

------

**Note**: `Transition` is a platform-agnostic base component. If you're using transitions in CSS, you'll probably want to use [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition) instead. It inherits all the features of `Transition`, but contains additional features necessary to play nice with CSS transitions (hence the name of the component).

------

By default the `Transition` component does not alter the behavior of the component it renders, it only tracks "enter" and "exit" states for the components. It's up to you to give meaning and effect to those states. For example we can add styles to a component when it enters or exits:

```jsx
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {state => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        I'm a fade Transition!
      </div>
    )}
  </Transition>
);
```

There are 4 main states a Transition can be in:

- `'entering'`
- `'entered'`
- `'exiting'`
- `'exited'`

Transition state is toggled via the `in` prop. When `true` the component begins the "Enter" stage. During this stage, the component will shift from its current transition state, to `'entering'` for the duration of the transition and then to the `'entered'` stage once it's complete. Let's take the following example (we'll use the [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):

```jsx
function App() {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <Transition in={inProp} timeout={500}>
        {state => (
          // ...
        )}
      </Transition>
      <button onClick={() => setInProp(true)}>
        Click to Enter
      </button>
    </div>
  );
}
```

When the button is clicked the component will shift to the `'entering'` state and stay there for 500ms (the value of `timeout`) before it finally switches to `'entered'`.

When `in` is `false` the same thing happens except the state moves from `'exiting'` to `'exited'`.

### [Props](https://reactcommunity.org/react-transition-group/transition#Transition-props)

### [`children`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-children)

A `function` child can be used instead of a React element. This function is called with the current transition status (`'entering'`, `'entered'`, `'exiting'`, `'exited'`), which can be used to apply context specific props to a component.

```jsx
<Transition in={this.state.in} timeout={150}>
  {state => (
    <MyComponent className={`fade fade-${state}`} />
  )}
</Transition>
```

type: `Function | element`

required

### [`in`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-in)

Show the component; triggers the enter or exit states

type: `boolean`

default: `false`

### [`mountOnEnter`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-mountOnEnter)

By default the child component is mounted immediately along with the parent `Transition` component. If you want to "lazy mount" the component on the first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay mounted, even on "exited", unless you also specify `unmountOnExit`.

type: `boolean`

default: `false`

### [`unmountOnExit`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-unmountOnExit)

By default the child component stays mounted after it reaches the `'exited'` state. Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.

type: `boolean`

default: `false`

### [`appear`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-appear)

Normally a component is not transitioned if it is shown when the `` component mounts. If you want to transition on the first mount set `appear` to `true`, and the component will transition in as soon as the `` mounts.

> **Note**: there are no special appear states like `appearing`/`appeared`, this prop only adds an additional enter transition. However, in the `` component that first enter transition does result in additional `.appear-*` classes, that way you can choose to style it differently.

type: `boolean`

default: `false`

### [`enter`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-enter)

Enable or disable enter transitions.

type: `boolean`

default: `true`

### [`exit`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-exit)

Enable or disable exit transitions.

type: `boolean`

default: `true`

### [`timeout`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-timeout)

The duration of the transition, in milliseconds. Required unless `addEndListener` is provided.

You may specify a single timeout for all transitions:

```jsx
timeout={500}
```

or individually:

```jsx
timeout={{
 appear: 500,
 enter: 300,
 exit: 500,
}}
```

- `appear` defaults to the value of `enter`
- `enter` defaults to `0`
- `exit` defaults to `0`

type: `number | { enter?: number, exit?: number, appear?: number }`

### [`addEndListener`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-addEndListener)

Add a custom transition end trigger. Called with the transitioning DOM node and a `done` callback. Allows for more fine grained transition end logic. **Note:** Timeouts are still used as a fallback if provided.

```jsx
addEndListener={(node, done) => {
  // use the css transitionend event to mark the finish of a transition
  node.addEventListener('transitionend', done, false);
}}
```

type: `Function`

### [`onEnter`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-onEnter)

Callback fired before the "entering" status is applied. An extra parameter `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount

type: `Function(node: HtmlElement, isAppearing: bool) -> void`

default: `function noop() {}`

### [`onEntering`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-onEntering)

Callback fired after the "entering" status is applied. An extra parameter `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount

type: `Function(node: HtmlElement, isAppearing: bool)`

default: `function noop() {}`

### [`onEntered`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-onEntered)

Callback fired after the "entered" status is applied. An extra parameter `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount

type: `Function(node: HtmlElement, isAppearing: bool) -> void`

default: `function noop() {}`

### [`onExit`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-onExit)

Callback fired before the "exiting" status is applied.

type: `Function(node: HtmlElement) -> void`

default: `function noop() {}`

### [`onExiting`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-onExiting)

Callback fired after the "exiting" status is applied.

type: `Function(node: HtmlElement) -> void`

default: `function noop() {}`

### [`onExited`](https://reactcommunity.org/react-transition-group/transition#Transition-prop-onExited)

Callback fired after the "exited" status is applied.

type: `Function(node: HtmlElement) -> void`

default: `function noop() {}`



## 4、CSSTransition

A transition component inspired by the excellent [ng-animate](http://www.nganimate.org/) library, you should use it if you're using CSS transitions or animations. It's built upon the [`Transition`](https://reactcommunity.org/react-transition-group/transition) component, so it inherits all of its props.

`CSSTransition` applies a pair of class names during the `appear`, `enter`, and `exit` states of the transition. The first class is applied and then a second `*-active` class in order to activate the CSS transition. After the transition, matching `*-done` class names are applied to persist the transition state.

```jsx
function App() {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <CSSTransition in={inProp} timeout={200} classNames="my-node">
        <div>
          {"I'll receive my-node-* classes"}
        </div>
      </CSSTransition>
      <button type="button" onClick={() => setInProp(true)}>
        Click to Enter
      </button>
    </div>
  );
}
```

When the `in` prop is set to `true`, the child component will first receive the class `example-enter`, then the `example-enter-active` will be added in the next tick. `CSSTransition` [forces a reflow](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215) between before adding the `example-enter-active`. This is an important trick because it allows us to transition between `example-enter` and `example-enter-active` even though they were added immediately one after another. Most notably, this is what makes it possible for us to animate *appearance*.

```css
.my-node-enter {
  opacity: 0;
}
.my-node-enter-active {
  opacity: 1;
  transition: opacity 200ms;
}
.my-node-exit {
  opacity: 1;
}
.my-node-exit-active {
  opacity: 0;
  transition: opacity 200ms;
}
```

`*-active` classes represent which styles you want to animate **to**.

**Note**: If you're using the [`appear`](http://reactcommunity.org/react-transition-group/transition#Transition-prop-appear) prop, make sure to define styles for `.appear-*` classes as well.

## Example

<iframe title="CSSTransition Component" src="https://codesandbox.io/embed/m77l2vp00x?fontsize=14" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin" style="box-sizing: border-box; display: block; width: 1280px; height: 500px; border: 0px; border-radius: 4px; overflow: hidden;"></iframe>

## [Props](https://reactcommunity.org/react-transition-group/css-transition#CSSTransition-props) Accepts all props from `` unless otherwise noted.

### [`classNames`](https://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-classNames)

The animation classNames applied to the component as it appears, enters, exits or has finished the transition. A single name can be provided and it will be suffixed for each stage: e.g.

`classNames="fade"` applies `fade-appear`, `fade-appear-active`, `fade-appear-done`, `fade-enter`, `fade-enter-active`, `fade-enter-done`, `fade-exit`, `fade-exit-active`, and `fade-exit-done`.

**Note**: `fade-appear-done` and `fade-enter-done` will *both* be applied. This allows you to define different behavior for when appearing is done and when regular entering is done, using selectors like `.fade-enter-done:not(.fade-appear-done)`. For example, you could apply an epic entrance animation when element first appears in the DOM using [Animate.css](https://daneden.github.io/animate.css/). Otherwise you can simply use `fade-enter-done` for defining both cases.

Each individual classNames can also be specified independently like:

```js
classNames={{
 appear: 'my-appear',
 appearActive: 'my-active-appear',
 appearDone: 'my-done-appear',
 enter: 'my-enter',
 enterActive: 'my-active-enter',
 enterDone: 'my-done-enter',
 exit: 'my-exit',
 exitActive: 'my-active-exit',
 exitDone: 'my-done-exit',
}}
```

If you want to set these classes using CSS Modules:

```js
import styles from './styles.css';
```

you might want to use camelCase in your CSS file, that way could simply spread them instead of listing them one by one:

```js
classNames={{ ...styles }}
```

type: `string | { appear?: string, appearActive?: string, appearDone?: string, enter?: string, enterActive?: string, enterDone?: string, exit?: string, exitActive?: string, exitDone?: string, }`

default: `''`

### [`onEnter`](https://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onEnter)

A `` callback fired immediately after the 'enter' or 'appear' class is applied.

type: `Function(node: HtmlElement, isAppearing: bool)`

### [`onEntering`](https://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onEntering)

A `` callback fired immediately after the 'enter-active' or 'appear-active' class is applied.

type: `Function(node: HtmlElement, isAppearing: bool)`

### [`onEntered`](https://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onEntered)

A `` callback fired immediately after the 'enter' or 'appear' classes are **removed** and the `done` class is added to the DOM node.

type: `Function(node: HtmlElement, isAppearing: bool)`

### [`onExit`](https://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onExit)

A `` callback fired immediately after the 'exit' class is applied.

type: `Function(node: HtmlElement)`

### [`onExiting`](https://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onExiting)

A `` callback fired immediately after the 'exit-active' is applied.

type: `Function(node: HtmlElement)`

### [`onExited`](https://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onExited)

A `` callback fired immediately after the 'exit' classes are **removed** and the `exit-done` class is added to the DOM node.

type: `Function(node: HtmlElement)`



# 5、SwitchTransition

A transition component inspired by the [vue transition modes](https://vuejs.org/v2/guide/transitions.html#Transition-Modes). You can use it when you want to control the render between state transitions. Based on the selected mode and the child's key which is the `Transition` or `CSSTransition` component, the `SwitchTransition` makes a consistent transition between them.

If the `out-in` mode is selected, the `SwitchTransition` waits until the old child leaves and then inserts a new child. If the `in-out` mode is selected, the `SwitchTransition` inserts a new child first, waits for the new child to enter and then removes the old child

```jsx
function App() {
 const [state, setState] = useState(false);
 return (
   <SwitchTransition>
     <FadeTransition key={state ? "Goodbye, world!" : "Hello, world!"}
       addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
       classNames='fade' >
       <button onClick={() => setState(state => !state)}>
         {state ? "Goodbye, world!" : "Hello, world!"}
       </button>
     </FadeTransition>
   </SwitchTransition>
 )
}
```

### [Props](https://reactcommunity.org/react-transition-group/switch-transition#SwitchTransition-props)

#### [`mode`](https://reactcommunity.org/react-transition-group/switch-transition#SwitchTransition-prop-mode)

Transition modes. `out-in`: Current element transitions out first, then when complete, the new element transitions in. `in-out: New element transitions in first, then when complete, the current element transitions out.`

type: `'out-in'|'in-out'`

default: `'out-in'`

#### [`children`](https://reactcommunity.org/react-transition-group/switch-transition#SwitchTransition-prop-children)

Any `Transition` or `CSSTransition` component

type: `element`





# 6、TransitionGroup

The `` component manages a set of transition components (`` and ``) in a list. Like with the transition components, `` is a state machine for managing the mounting and unmounting of components over time.

Consider the example below. As items are removed or added to the TodoList the `in` prop is toggled automatically by the ``.

Note that `` does not define any animation behavior! Exactly *how* a list item animates is up to the individual transition component. This means you can mix and match animations across different list items.

### Example

https://reactcommunity.org/react-transition-group/transition-group

这里是详细的代码和沙箱

### [Props](https://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-props)

### [`component`](https://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-prop-component)

`` renders a `` by default. You can change this behavior by providing a `component` prop. If you use React v16+ and would like to avoid a wrapping `` element you can pass in `component={null}`. This is useful if the wrapping div borks your css styles.

type: `any`

default: `'div'`

### [`children`](https://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-prop-children)

A set of `` components, that are toggled `in` and out as they leave. the `` will inject specific transition props, so remember to spread them through if you are wrapping the `` as with our `` example.

While this component is meant for multiple `Transition` or `CSSTransition` children, sometimes you may want to have a single transition child with content that you want to be transitioned out and in when you change it (e.g. routes, images etc.) In that case you can change the `key` prop of the transition child as you change its content, this will cause `TransitionGroup` to transition the child out and back in.

type: `any`

### [`appear`](https://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-prop-appear)

A convenience prop that enables or disables appear animations for all children. Note that specifying this will override any defaults set on individual children Transitions.

type: `boolean`

### [`enter`](https://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-prop-enter)

A convenience prop that enables or disables enter animations for all children. Note that specifying this will override any defaults set on individual children Transitions.

type: `boolean`

### [`exit`](https://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-prop-exit)

A convenience prop that enables or disables exit animations for all children. Note that specifying this will override any defaults set on individual children Transitions.

type: `boolean`

### [`childFactory`](https://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-prop-childFactory)

You may need to apply reactive updates to a child as it is exiting. This is generally done by using `cloneElement` however in the case of an exiting child the element has already been removed and not accessible to the consumer.

If you do need to update a child as it leaves you can provide a `childFactory` to wrap every child, even the ones that are leaving.

type: `Function(child: ReactElement) -> ReactElement`

default: `child => child`