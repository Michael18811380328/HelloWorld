// 3-2 代码分割打包（webpack）
import { add } from './math';
console.log(add(1, 2));

// React.lazy
// 实现懒加载
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}

// 多个子组件实现懒加载
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function NewComponent() {
  return (
    <div>
      <Suspense callback={<div>Loading...</div>}>
        <section>
          <OtherComponent/>
          <AnotherComponent/>
        </section>
      </Suspense>
    </div>
  );
}

// 懒加载失败后错误处理边界
import React, { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

const AComponent = React.lazy(() => import('./AComponent'));
const BComponent = React.lazy(() => import('./BComponent'));

const MyComponent = () => (
  <div>
    <ErrorBoundary>
      <Suspense callback={<div>Loading...</div>}>
        <section>
          <AComponent/>
          <BComponent/>
        </section>
      </Suspense>
    </ErrorBoundary>
  </div>
);

// 基于路由的代码分割
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
); 












