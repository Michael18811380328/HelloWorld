# withTranslation (HOC)

# **What it does**

The `withTranslation` is a classic HOC (higher order component) and gets the `t` function and `i18n` instance inside your component via props. 这是一个高阶组件，然后直接把待翻译的字符串传入t函数中。

```jsx
import React from 'react';
import { withTranslation } from 'react-i18next';

function MyComponent({ t, i18n }) {
  return <p>{t('my translated text')}</p>
}

export default withTranslation()(MyComponent);
```

While you most time only need the t function to translate your content you also get the i18n instance to eg. change the language.

```jsx
i18n.changeLanguage('en-US');
```

The `withTranslation` HOC will trigger a [Suspense](https://reactjs.org/docs/code-splitting.html#suspense) if not ready (eg. pending load of translation files). You can set `useSuspense` to false if prefer not using Suspense.

# **When to use?**

Use the `withTranslation` HOC to wrap **any component (class or function)** to access the translation function or i18n instance.

给任何组件（函数组件或者类组件）加上 withTranslation 即可增加翻译

# **withTranslation params**

## **Loading namespaces**

设置命名空间（可以是字符串或者字符串数组）

```jsx
// load a specific namespace
// the t function will be set to that namespace as default
withTranslation('ns1')(MyComponent);

// inside your component MyComponent
this.props.t('key'); // will be looked up from namespace ns1

// load multiple namespaces
// the t function will be set to first namespace as default
withTranslation(['ns1', 'ns2', 'ns3'])(MyComponent);

// inside your component MyComponent
this.props.t('key'); // will be looked up from namespace ns1
this.props.t('ns2:key'); // will be looked up from namespace ns2
```

## **Overriding the i18next instance**

```jsx
// passing in an i18n instance
// use only if you do not like the default instance
// set by i18next.use(initReactI18next) or the I18nextProvider
import i18n from './i18n';

const ExtendedComponent = withTranslation('ns1')(MyComponent);

<ExtendedComponent i18n={i18n} />
```

## **Not using Suspense**

```jsx
// use tReady prop in MyComponent to check if translations
// are already loaded or not
const ExtendedComponent = withTranslation()(MyComponent);

<ExtendedComponent useSuspense={false} />
```

Not using Suspense you will need to handle the not ready state yourself by eg. render a loading component as long `props.tReady === false` . Not doing so will result in rendering your translations before they loaded which will cause save missing be called although translations exists (just yet not loaded).

# **How to**

## **use ref (>= v10.6.0)**

You can use forwardRefs like:

```jsx
// 子组件
const Wrapped = withTranslation('translation', { withRef: true })(MyComponent);

// 然后在父组件调用时，设置自组件的 ref
// then pass a ref in your render method like
const myRef = React.createRef();
<Wrapped ref={myRef} />;

// use myRef.current to access it
```

## **hoist non-react statics**

The HOC does not hoist statics itself so you might append those statics manually or by using a module.

Use [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) yourself:

```jsx
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class MyComponent extends Component {
  static ...
}

export default hoistStatics(withTranslation()(MyComponent), MyComponent);
```

Or simply hoist the one/two statics yourself:

```jsx
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class MyComponent extends Component {
  static ...
}

const Extended = withTranslation()(MyComponent);
Extended.static = MyComponent.static;

export default Extended;
```

