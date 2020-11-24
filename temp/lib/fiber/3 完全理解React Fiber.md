# 完全理解React Fiber

阅读(32,778) 

## 一.目标

Fiber是对React核心算法的重构，2年重构的产物就是Fiber reconciler

核心目标：扩大其*适用性*，包括动画，布局和手势。分为5个具体目标（后2个算送的）：

- 把可中断的工作拆分成小任务
- 对正在做的工作调整优先次序、重做、复用上次（做了一半的）成果
- 在父子任务之间从容切换（yield back and forth），以支持React执行过程中的布局刷新
- 支持`render()`返回多个元素
- 更好地支持error boundary

既然初衷是不希望JS不受控制地长时间执行（想要手动调度），那么，为什么JS长时间执行会影响交互响应、动画？

> 因为JavaScript在浏览器的主线程上运行，恰好与样式计算、布局以及许多情况下的绘制一起运行。如果JavaScript运行时间过长，就会阻塞这些其他工作，可能导致掉帧。

（引自[Optimize JavaScript Execution](https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution#reduce_complexity_or_use_web_workers)）

React希望通过Fiber重构来改变这种不可控的现状，进一步提升交互体验

P.S.关于Fiber目标的更多信息，请查看[Codebase Overview](https://reactjs.org/docs/codebase-overview.html#fiber-reconciler)

## 二.关键特性

Fiber的关键特性如下：

- 增量渲染（把渲染任务拆分成块，匀到多帧）
- 更新时能够暂停，终止，复用渲染任务
- 给不同类型的更新赋予优先级
- 并发方面新的基础能力

增量渲染用来解决掉帧的问题，渲染任务拆分之后，每次只做一小段，做完一段就把时间控制权交还给主线程，而不像之前长时间占用。这种策略叫做cooperative scheduling（合作式调度），操作系统的3种任务调度策略之一（Firefox还对真实DOM应用了这项技术）

另外，React自身的*killer feature*是virtual DOM，2个原因：

- coding UI变简单了（不用关心浏览器应该怎么做，而是把下一刻的UI描述给React听）
- 既然DOM能virtual，别的（硬件、VR、native App）也能

React实现上分为2部分：

- reconciler 寻找某时刻前后两版UI的差异。包括之前的Stack reconciler与现在的Fiber reconciler
- renderer 插件式的，平台相关的部分。包括React DOM、React Native、React ART、ReactHardware、ReactAframe、React-pdf、ReactThreeRenderer、ReactBlessed等等

这一波是对reconciler的彻底改造，对killer feature的增强

## 三.fiber与fiber tree

React运行时存在3种实例：

```
DOM 真实DOM节点
-------
Instances React维护的vDOM tree node
-------
Elements 描述UI长什么样子（type, props）
```

Instances是根据Elements创建的，对组件及DOM节点的抽象表示，vDOM tree维护了组件状态以及组件与DOM树的关系

在首次渲染过程中构建出vDOM tree，后续需要更新时（`setState()`），diff vDOM tree得到DOM change，并把DOM change应用（patch）到DOM树

Fiber之前的reconciler（被称为Stack reconciler）自顶向下的递归`mount/update`，*无法中断*（持续占用主线程），这样主线程上的布局、动画等周期性任务以及交互响应就无法立即得到处理，影响体验

Fiber解决这个问题的*思路*是把渲染/更新过程（递归diff）拆分成一系列小任务，每次检查树上的一小部分，做完看是否还有时间继续下一个任务，有的话继续，没有的话把自己挂起，主线程不忙的时候再继续

增量更新需要更多的上下文信息，之前的vDOM tree显然难以满足，所以扩展出了*fiber tree*（即Fiber上下文的vDOM tree），更新过程就是根据输入数据以及现有的fiber tree构造出新的fiber tree（workInProgress tree）。因此，Instance层新增了这些实例：

```
DOM
    真实DOM节点
-------
effect
    每个workInProgress tree节点上都有一个effect list
    用来存放diff结果
    当前节点更新完毕会向上merge effect list（queue收集diff结果）
- - - -
workInProgress
    workInProgress tree是reconcile过程中从fiber tree建立的当前进度快照，用于断点恢复
- - - -
fiber
    fiber tree与vDOM tree类似，用来描述增量更新所需的上下文信息
-------
Elements
    描述UI长什么样子（type, props）
```

注意：放在虚线上的2层都是临时的结构，仅在更新时有用，日常不持续维护。*effect*指的就是side effect，包括将要做的DOM change

fiber tree上各节点的主要结构（每个节点称为*fiber*）如下：

```
// fiber tree节点结构
{
    stateNode,
    child,
    return,
    sibling,
    ...
}
```

`return`表示当前节点处理完毕后，应该向谁提交自己的成果（effect list）

P.S.fiber tree实际上是个单链表（Singly Linked List）树结构，见[react/packages/react-reconciler/src/ReactFiber.js](https://github.com/facebook/react/blob/v16.2.0/packages/react-reconciler/src/ReactFiber.js#L91)

P.S.注意小fiber与大Fiber，前者表示fiber tree上的节点，后者表示React Fiber

## 四.Fiber reconciler

reconcile过程分为2个阶段（phase）：

1. （可中断）render/reconciliation 通过构造workInProgress tree得出change
2. （不可中断）commit 应用这些DOM change

### render/reconciliation

以fiber tree为蓝本，把每个fiber作为一个工作单元，自顶向下逐节点构造*workInProgress tree*（构建中的新fiber tree）

具体过程如下（以组件节点为例）：

1. 如果当前节点不需要更新，直接把子节点clone过来，跳到5；要更新的话打个tag
2. 更新当前节点状态（`props, state, context`等）
3. 调用`shouldComponentUpdate()`，`false`的话，跳到5
4. 调用`render()`获得新的子节点，并为子节点创建fiber（创建过程会尽量复用现有fiber，子节点增删也发生在这里）
5. 如果没有产生child fiber，该工作单元结束，把effect list归并到return，并把当前节点的sibling作为下一个工作单元；否则把child作为下一个工作单元
6. 如果没有剩余可用时间了，等到下一次主线程空闲时才开始下一个工作单元；否则，立即开始做
7. 如果没有下一个工作单元了（回到了workInProgress tree的根节点），第1阶段结束，进入pendingCommit状态

实际上是1-6的*工作循环*，7是出口，工作循环每次只做一件事，做完看要不要喘口气。工作循环结束时，workInProgress tree的根节点身上的effect list就是收集到的所有side effect（因为每做完一个都向上归并）

所以，构建workInProgress tree的过程就是diff的过程，通过`requestIdleCallback`来调度执行一组任务，每完成一个任务后回来看看有没有插队的（更紧急的），每完成一组任务，把时间控制权交还给主线程，直到下一次`requestIdleCallback`回调再继续构建workInProgress tree

P.S.Fiber之前的reconciler被称为Stack reconciler，就是因为这些调度上下文信息是由系统栈来保存的。虽然之前一次性做完，强调栈没什么意义，起个名字只是为了便于区分Fiber reconciler

#### requestIdleCallback

> 通知主线程，要求在不忙的时候告诉我，我有几个不太着急的事情要做

具体用法如下：

```
window.requestIdleCallback(callback[, options])
// 示例
let handle = window.requestIdleCallback((idleDeadline) => {
    const {didTimeout, timeRemaining} = idleDeadline;
    console.log(`超时了吗？${didTimeout}`);
    console.log(`可用时间剩余${timeRemaining.call(idleDeadline)}ms`);
    // do some stuff
    const now = +new Date, timespent = 10;
    while (+new Date < now + timespent);
    console.log(`花了${timespent}ms搞事情`);
    console.log(`可用时间剩余${timeRemaining.call(idleDeadline)}ms`);
}, {timeout: 1000});
// 输出结果
// 超时了吗？false
// 可用时间剩余49.535000000000004ms
// 花了10ms搞事情
// 可用时间剩余38.64ms
```

*注意*，`requestIdleCallback`调度只是希望做到流畅体验，并不能绝对保证什么，例如：

```
// do some stuff
const now = +new Date, timespent = 300;
while (+new Date < now + timespent);
```

如果搞事情（对应React中的生命周期函数等时间上不受React控制的东西）就花了300ms，什么机制也保证不了流畅

P.S.一般剩余可用时间也就10-50ms，可调度空间不很宽裕

### commit

第2阶段直接一口气做完：

1. 处理effect list（包括3种处理：更新DOM树、调用组件生命周期函数以及更新ref等内部状态）
2. 出对结束，第2阶段结束，所有更新都commit到DOM树上了

注意，真的是*一口气做完*（同步执行，不能喊停）的，这个阶段的实际工作量是比较大的，所以尽量不要在后3个生命周期函数里干重活儿

### 生命周期hook

生命周期函数也被分为2个阶段了：

```
// 第1阶段 render/reconciliation
componentWillMount
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate

// 第2阶段 commit
componentDidMount
componentDidUpdate
componentWillUnmount
```

第1阶段的生命周期函数可能会被*多次调用*，默认以low优先级（后面介绍的6种优先级之一）执行，被高优先级任务打断的话，稍后重新执行

## 五.fiber tree与workInProgress tree

双缓冲技术（double buffering），就像[redux里的`nextListeners`](http://www.ayqy.net/blog/redux源码解读/#articleHeader7)，以fiber tree为主，workInProgress tree为辅

双缓冲具体指的是workInProgress tree构造完毕，得到的就是新的fiber tree，然后喜新厌旧（把current指针指向workInProgress tree，丢掉旧的fiber tree）就好了

这样做的好处：

- 能够复用内部对象（fiber）
- 节省内存分配、GC的时间开销

每个fiber上都有个`alternate`属性，也指向一个fiber，创建workInProgress节点时优先取`alternate`，没有的话就创建一个：

```
let workInProgress = current.alternate;
if (workInProgress === null) {
  //...这里很有意思
  workInProgress.alternate = current;
  current.alternate = workInProgress;
} else {
  // We already have an alternate.
  // Reset the effect tag.
  workInProgress.effectTag = NoEffect;

  // The effect list is no longer valid.
  workInProgress.nextEffect = null;
  workInProgress.firstEffect = null;
  workInProgress.lastEffect = null;
}
```

如注释指出的，fiber与workInProgress互相持有引用，“喜新厌旧”之后，旧fiber就作为新fiber更新的*预留空间*，达到复用fiber实例的目的

P.S.源码里还有一些有意思的技巧，比如[tag的位运算](http://makersden.io/blog/look-inside-fiber/#side-effect-tags-types-of-side-effects)

## 六.优先级策略

每个工作单元运行时有6种优先级：

- synchronous 与之前的Stack reconciler操作一样，同步执行
- task 在next tick之前执行
- animation 下一帧之前执行
- high 在不久的将来立即执行
- low 稍微延迟（100-200ms）执行也没关系
- offscreen 下一次render时或scroll时才执行

synchronous首屏（首次渲染）用，要求尽量快，不管会不会阻塞UI线程。animation通过`requestAnimationFrame`来调度，这样在下一帧就能立即开始动画过程；后3个都是由`requestIdleCallback`回调执行的；offscreen指的是当前隐藏的、屏幕外的（看不见的）元素

高优先级的比如键盘输入（希望立即得到反馈），低优先级的比如网络请求，让评论显示出来等等。另外，*紧急的事件允许插队*

这样的优先级机制存在*2个问题*：

- 生命周期函数怎么执行（可能被频频中断）：触发顺序、次数没有保证了
- starvation（低优先级饿死）：如果高优先级任务很多，那么低优先级任务根本没机会执行（就饿死了）

生命周期函数的问题有一个官方例子：

```
low A
componentWillUpdate()
---
high B
componentWillUpdate()
componentDidUpdate()
---
restart low A
componentWillUpdate()
componentDidUpdate()
```

第1个问题正在解决（还没解决），生命周期的问题会破坏一些现有App，给平滑升级带来困难，Fiber团队正在努力寻找优雅的升级途径

第2个问题通过尽量复用已完成的操作（reusing work where it can）来缓解，听起来也是正在想办法解决

这两个问题本身不太好解决，只是解决到什么程度的问题。比如第一个问题，如果组件生命周期函数掺杂副作用太多，就没有办法无伤解决。这些问题虽然会给升级Fiber带来一定阻力，但绝不是不可解的（退一步讲，如果新特性有足够的吸引力，第一个问题大家自己想办法就解决了）

## 七.总结

### 已知

React在一些响应体验要求较高的场景不适用，比如动画，布局和手势

根本原因是渲染/更新过程一旦开始无法中断，持续占用主线程，主线程忙于执行JS，无暇他顾（布局、动画），造成掉帧、延迟响应（甚至无响应）等不佳体验

### 求

一种能够彻底解决主线程长时间占用问题的机制，不仅能够应对眼前的问题，还要有长远意义

> The “fiber” reconciler is a new effort aiming to resolve the problems inherent in the stack reconciler and fix a few long-standing issues.

### 解

把渲染/更新过程拆分为小块任务，通过合理的调度机制来控制时间（更细粒度、更强的控制力）

那么，面临5个子问题：

#### 1.拆什么？什么不能拆？

把渲染/更新过程分为2个阶段（diff + patch）：

```
1.diff ~ render/reconciliation
2.patch ~ commit
```

diff的实际工作是对比`prevInstance`和`nextInstance`的状态，找出差异及其对应的DOM change。diff本质上是一些计算（遍历、比较），是可拆分的（算一半待会儿接着算）

patch阶段把本次更新中的所有DOM change应用到DOM树，是一连串的DOM操作。这些DOM操作虽然看起来也可以拆分（按照change list一段一段做），但这样做一方面可能造成DOM实际状态与维护的内部状态不一致，另外还会影响体验。而且，一般场景下，DOM更新的耗时比起diff及生命周期函数耗时不算什么，拆分的意义不很大

所以，render/reconciliation阶段的工作（diff）可以拆分，commit阶段的工作（patch）不可拆分

P.S.diff与reconciliation只是对应关系，并不等价，如果非要区分的话，reconciliation包括diff：

> This is a part of the process that React calls reconciliation which starts when you call ReactDOM.render() or setState(). By the end of the reconciliation, React knows the result DOM tree, and a renderer like react-dom or react-native applies the minimal set of changes necessary to update the DOM nodes (or the platform-specific views in case of React Native).

（引自[Top-Down Reconciliation](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html#top-down-reconciliation)）

#### 2.怎么拆？

先凭空乱来几种diff工作拆分方案：

- 按组件结构拆。不好分，无法预估各组件更新的工作量
- 按实际工序拆。比如分为`getNextState(), shouldUpdate(), updateState(), checkChildren()`再穿插一些生命周期函数

按组件拆太粗，显然对大组件不太公平。按工序拆太细，任务太多，频繁调度不划算。那么有没有合适的拆分单位？

有。Fiber的拆分单位是fiber（fiber tree上的一个节点），实际上就是*按虚拟DOM节点拆*，因为fiber tree是根据vDOM tree构造出来的，树结构一模一样，只是节点携带的信息有差异

所以，实际上是vDOM node粒度的拆分（以fiber为工作单元），每个组件实例和每个DOM节点抽象表示的实例都是一个工作单元。工作循环中，每次处理一个fiber，处理完可以中断/挂起整个工作循环

#### 3.如何调度任务？

分2部分：

- 工作循环
- 优先级机制

工作循环是*基本的任务调度机制*，工作循环中每次处理一个任务（工作单元），处理完毕有一次喘息的机会：

```
// Flush asynchronous work until the deadline runs out of time.
while (nextUnitOfWork !== null && !shouldYield()) {
  nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
}
```

`shouldYield`就是看时间用完了没（`idleDeadline.timeRemaining()`），没用完的话继续处理下一个任务，用完了就结束，把时间控制权还给主线程，等下一次`requestIdleCallback`回调再接着做：

```
// If there's work left over, schedule a new callback.
if (nextFlushedExpirationTime !== NoWork) {
  scheduleCallbackWithExpiration(nextFlushedExpirationTime);
}
```

也就是说，（不考虑突发事件的）正常调度是由工作循环来完成的，基本*规则*是：每个工作单元结束检查是否还有时间做下一个，没时间了就先“挂起”

优先级机制用来处理突发事件与优化次序，例如：

- 到commit阶段了，提高优先级
- 高优任务做一半出错了，给降一下优先级
- 抽空关注一下低优任务，别给饿死了
- 如果对应DOM节点此刻不可见，给降到最低优先级

这些策略用来动态调整任务调度，是工作循环的*辅助机制*，最先做最重要的事情

#### 4.如何中断/断点恢复？

中断：检查当前正在处理的工作单元，保存当前成果（`firstEffect, lastEffect`），修改tag标记一下，迅速收尾并再开一个`requestIdleCallback`，下次有机会再做

断点恢复：下次再处理到该工作单元时，看tag是被打断的任务，接着做未完成的部分或者重做

P.S.无论是时间用尽“自然”中断，还是被高优任务粗暴打断，对中断机制来说都一样

#### 5.如何收集任务结果？

Fiber reconciliation的工作循环具体如下：

1. 找到根节点优先级最高的workInProgress tree，取其待处理的节点（代表组件或DOM节点）
2. 检查当前节点是否需要更新，不需要的话，直接到4
3. 标记一下（打个tag），更新自己（组件更新`props`，`context`等，DOM节点记下DOM change），并为孩子生成workInProgress node
4. 如果没有产生子节点，归并effect list（包含DOM change）到父级
5. 把孩子或兄弟作为待处理节点，准备进入下一个工作循环。如果没有待处理节点（回到了workInProgress tree的根节点），工作循环结束

通过每个节点更新结束时*向上归并effect list*来收集任务结果，reconciliation结束后，根节点的effect list里记录了包括DOM change在内的所有side effect

### 举一反三

既然任务可拆分（只要最终得到完整effect list就行），那就允许*并行执行*（多个Fiber reconciler + 多个worker），首屏也更容易分块加载/渲染（vDOM森林）

并行渲染的话，据说Firefox测试结果显示，130ms的页面，只需要30ms就能搞定，所以在这方面是值得期待的，而React已经做好准备了，这也就是在React Fiber上下文经常听到的待*unlock*的更多特性之一

## 八.源码简析

从15到16，源码结构发生了很大变化：

- 再也看不到`mountComponent/updateComponent()`了，被拆分重组成了（`beginWork/completeWork/commitWork()`）
- [ReactDOMComponent](https://github.com/facebook/react/blob/v16.0.0/src/renderers/dom/stack/client/ReactDOMComponent.js#L384)也被去掉了，在Fiber体系下DOM节点抽象用[ReactDOMFiberComponent](https://github.com/facebook/react/blob/v16.2.0/packages/react-dom/src/client/ReactDOMFiberComponent.js#L353)表示，组件用[ReactFiberClassComponent](https://github.com/facebook/react/blob/v16.2.0/packages/react-reconciler/src/ReactFiberClassComponent.js#L78)表示，之前是[ReactCompositeComponent](https://github.com/facebook/react/blob/v15.6.2/src/renderers/shared/stack/reconciler/ReactCompositeComponent.js#L126)
- Fiber体系的核心机制是负责任务调度的[ReactFiberScheduler](https://github.com/facebook/react/blob/v16.2.0/packages/react-reconciler/src/ReactFiberScheduler.js)，相当于之前的[ReactReconciler](https://github.com/facebook/react/blob/v15.6.2/src/renderers/shared/stack/reconciler/ReactReconciler.js)
- vDOM tree变成fiber tree了，以前是自上而下的简单树结构，现在是基于单链表的树结构，维护的节点关系更多一些

fiber tree来张图感受一下：

[![fiber-tree](http://cdn.ayqy.net/data/home/qxu1001840309/htdocs/cms/wordpress/wp-content/uploads/2018/01/fiber-tree.png)](http://cdn.ayqy.net/data/home/qxu1001840309/htdocs/cms/wordpress/wp-content/uploads/2018/01/fiber-tree.png)

fiber-tree

其实稍一细想，从Stack reconciler到Fiber reconciler，源码层面就是干了一件*递归改循环*的事情（当然，实际做的事情远不止递归改循环，但这是第一步）

总之，源码变化很大，如果对Fiber思路没有预先了解的话，看源码会比较*艰难*（看过React[15-]的源码的话，就更容易迷惑了）

P.S.这张[清明流程图](https://bogdan-lyashenko.github.io/Under-the-hood-ReactJS/stack/images/intro/all-page-stack-reconciler.svg)要正式退役了

### 参考资料

- [Lin Clark – A Cartoon Intro to Fiber – React Conf 2017](https://www.youtube.com/watch?v=ZCuYPiUIONs)：*5星推荐*，声音很好听，比Jing Chen好100倍
- [acdlite/react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)
- [Codebase Overview](https://reactjs.org/docs/codebase-overview.html)
- [A look inside React Fiber – how work will get done.](http://makersden.io/blog/look-inside-fiber/)：Fiber源码解读，小说体看着有点费劲