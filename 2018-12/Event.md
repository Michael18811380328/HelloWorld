# 事件概述

DOM 事件被发送用于通知代码相关的事情已经发生了。每个事件都是继承自[`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 类的对象，可以包括自定义的成员属性及函数用于获取事件发生时相关的更多信息。事件可以表示从基本用户交互到渲染模型中发生的事件的自动通知的所有内容。

本文提供了一个可以发送的事件的列表；一些是官方标准中的标准事件，另一些则是在特定浏览器内部使用的事件；例如，Mozilla 列出的特定事件使 [拓展](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons) 可以用它们与浏览器交互。

## 最常见的类别

| 事件名称       | 何时触发                                           |
| -------------- | -------------------------------------------------- |
| `cached`       | manifest中列出的资源已经下载，应用程序现在已缓存。 |
| `error`        | 资源加载失败时                                     |
| `abort`        | 正在加载资源已经被中止时                           |
| `load`         | 资源及其相关资源已完成加载。                       |
| `beforeunload` | window，document 及其资源即将被卸载。              |
| `unload`       | 文档或一个依赖资源正在被卸载。                     |

**网络事件**

| 事件名称  | 何时触发               |
| --------- | ---------------------- |
| `online`  | 浏览器已获得网络访问。 |
| `offline` | 浏览器已失去网络访问。 |

| 事件名称 | 何时触发                 |
| -------- | ------------------------ |
| `focus`  | 元素获得焦点（不会冒泡） |
| `blur`   | 元素失去焦点（不会冒泡） |

**Websocket事件**

| 事件名称  | 何时触发                                          |
| --------- | ------------------------------------------------- |
| `open`    | WebSocket连接已建立                               |
| `message` | 通过WebSocket接收到一条消息                       |
| `error`   | WebSocket连接异常被关闭（比如有些数据无法发送）。 |
| `close`   | WebSocket连接已关闭                               |

| 事件名称   | 何时触发                                                     |
| ---------- | ------------------------------------------------------------ |
| `pagehide` | A session history entry is being traversed from.             |
| `pageshow` | A session history entry is being traversed to.               |
| `popstate` | A session history entry is being navigated to (in certain cases). |

| 事件触发             | 何时触发                        |
| -------------------- | ------------------------------- |
| `animationstart`     | 某个CSS动画开始时触发           |
| `animationend`       | 某个CSS动画完成时触发           |
| `animationiteration` | 某个CSS动画完成后重新开始时触发 |

| 事件名称 | 何时触发       |
| -------- | -------------- |
| `reset`  | 点击重置按钮时 |
| `submit` | 点击提交按钮   |

| 时间名称      | 何时触发             |
| ------------- | -------------------- |
| `beforeprint` | 打印机已经就绪时触发 |
| `afterprint`  | 打印机关闭时触发     |

| Event Name          | Fired When                                                   |
| ------------------- | ------------------------------------------------------------ |
| `compositionstart`  | The composition of a passage of text is prepared (similar to keydown for a keyboard input, but works with other inputs such as speech recognition). |
| `compositionupdate` | A character is added to a passage of text being composed.    |
| `compositionend`    | The composition of a passage of text has been completed or canceled. |

| Event Name         | Fired When                                                   |
| ------------------ | ------------------------------------------------------------ |
| `fullscreenchange` | An element was turned to fullscreen mode or back to normal mode. |
| `fullscreenerror`  | It was impossible to switch to fullscreen mode for technical reasons or because the permission was denied. |
| `resize`           | The document view has been resized.                          |
| `scroll`           | The document view or an element has been scrolled.           |

| Event Name | Fired When                               |
| ---------- | ---------------------------------------- |
| `cut`      | 已经剪贴选中的文本内容并且复制到了剪贴板 |
| `copy`     | 已经把选中的文本内容复制到了剪贴板       |
| `paste`    | 从剪贴板复制的文本内容被粘贴             |

| Event Name | Fired When                                        |
| ---------- | ------------------------------------------------- |
| `keydown`  | 按下任意按键                                      |
| `keypress` | 除 Shift, Fn, CapsLock 外任意键被按住. (连续触发) |
| `keyup`    | 释放任意按键                                      |

| Event Name          | Fired When                               |
| ------------------- | ---------------------------------------- |
| `mouseenter`        | 指针移到有事件监听的元素内               |
| `mouseover`         | 指针移到有事件监听的元素或者它的子元素内 |
| `mousemove`         | 指针在元素内移动时持续触发               |
| `mousedown`         | 在元素上按下任意鼠标按钮                 |
| `mouseup`           | 在元素上释放任意鼠标按键                 |
| `click`             | 在元素上按下并释放任意鼠标按键           |
| `dblclick`          | 在元素上双击鼠标按钮                     |
| `contextmenu`       | 右键点击 (右键菜单显示前).               |
| `wheel`             | 滚轮向任意方向滚动                       |
| `mouseleave`        | 指针移出元素范围外（不冒泡）             |
| `mouseout`          | 指针移出元素，或者移到它的子元素上       |
| `select`            | 文本被选中被选中                         |
| `pointerlockchange` | 鼠标被锁定或者解除锁定发生时             |
| `pointerlockerror`  | 可能因为一些技术的原因鼠标锁定被禁止时。 |

| Event Name  | Fired When                                                   |
| ----------- | ------------------------------------------------------------ |
| `dragstart` | 用户开始拖动HTML元素或选中的文本                             |
| `drag`      | 正在拖动元素或文本选区（在此过程中持续触发，每350ms触发一次） |
| `dragend`   | 拖放操作结束 （松开鼠标按钮或按下Esc键）                     |
| `dragenter` | 被拖动的元素或文本选区移入有效释放目标区                     |
| `dragover`  | 被拖动的元素或文本选区正在有效释放目标上被拖动 （在此过程中持续触发，每350ms触发一次） |
| `dragleave` | 被拖动的元素或文本选区移出有效释放目标区                     |
| `drop`      | 元素在有效释放目标区上释放                                   |

| Event Name       | Fired When                                                   |
| ---------------- | ------------------------------------------------------------ |
| `durationchange` | The `duration` attribute has been updated.                   |
| `loadedmetadata` | The metadata has been loaded.                                |
| `loadeddata`     | The first frame of the media has finished loading.           |
| `canplay`        | The browser can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content. |
| `canplaythrough` | The browser estimates it can play the media up to its end without stopping for content buffering. |
| `ended`          | Playback has stopped because the end of the media was reached. |
| `emptied`        | The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the [`load()`](https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/NsIDOMHTMLMediaElement)method is called to reload it. |
| `stalled`        | The user agent is trying to fetch media data, but data is unexpectedly not forthcoming. |
| `suspend`        | Media data loading has been suspended.                       |
| `play`           | Playback has begun.                                          |
| `playing`        | Playback is ready to start after having been paused or delayed due to lack of data. |
| `pause`          | Playback has been paused.                                    |
| `waiting`        | Playback has stopped because of a temporary lack of data.    |
| `seeking`        | A *seek* operation began.                                    |
| `seeked`         | A *seek* operation completed.                                |
| `ratechange`     | The playback rate has changed.                               |
| `timeupdate`     | The time indicated by the `currentTime` attribute has been updated. |
| `volumechange`   | The volume has changed.                                      |
| `complete`       | The rendering of an [`OfflineAudioContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/OfflineAudioContext) is terminated. |
| `ended`          | Playback has stopped because the end of the media was reached. |
| `audioprocess`   | The input buffer of a [`ScriptProcessorNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/ScriptProcessorNode) is ready to be processed. |

| Event Name  | Fired When                                                   |
| ----------- | ------------------------------------------------------------ |
| `loadstart` | Progress has begun.                                          |
| `progress`  | In progress.                                                 |
| `error`     | Progression has failed.                                      |
| `timeout`   | Progression is terminated due to preset time expiring.       |
| `abort`     | Progression has been terminated (not due to an error).       |
| `load`      | Progression has been successful.                             |
| `loadend`   | Progress has stopped (after "error", "abort" or "load" have been dispatched). |

### 存储事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E5%AD%98%E5%82%A8%E4%BA%8B%E4%BB%B6)

`change` (see [Non-standard events](https://developer.mozilla.org/zh-CN/docs/Web/Events#Non-standard_events))
`storage`

### 更新事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E6%9B%B4%E6%96%B0%E4%BA%8B%E4%BB%B6)

`checking`
`downloading`
`error`
`noupdate`
`obsolete`
`updateready`

### 值变化事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E5%80%BC%E5%8F%98%E5%8C%96%E4%BA%8B%E4%BB%B6)

`broadcast`
`CheckboxStateChange`
`hashchange`
`input`
`RadioStateChange`
`readystatechange`
`ValueChange`

### 未分类的事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E6%9C%AA%E5%88%86%E7%B1%BB%E7%9A%84%E4%BA%8B%E4%BB%B6)

`invalid`
`localized`
`message`
`message`
`message`
`open`
`show`

## 不常见 和 非标准分类[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E4%B8%8D%E5%B8%B8%E8%A7%81_%E5%92%8C_%E9%9D%9E%E6%A0%87%E5%87%86%E5%88%86%E7%B1%BB)

### SVG事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#SVG%E4%BA%8B%E4%BB%B6)

`SVGAbort`
`SVGError`
`SVGLoad`
`SVGResize`
`SVGScroll`
`SVGUnload`
`SVGZoom`

### 数据库事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BA%8B%E4%BB%B6)

`abort`
`blocked`
`complete`
`error`([link](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/error))
`success`
`upgradeneeded`
`versionchange`

### 通知事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E9%80%9A%E7%9F%A5%E4%BA%8B%E4%BB%B6)

[AlertActive](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/AlertActive)
[AlertClose](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/AlertClose)

### CSS事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#CSS%E4%BA%8B%E4%BB%B6)

[CssRuleViewRefreshed](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/CssRuleViewRefreshed)
[CssRuleViewChanged](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/CssRuleViewChanged)
[CssRuleViewCSSLinkClicked](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/CssRuleViewCSSLinkClicked)
`transitionend`

### 脚本事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E8%84%9A%E6%9C%AC%E4%BA%8B%E4%BB%B6)

`afterscriptexecute`
`beforescriptexecute`

### 菜单事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E8%8F%9C%E5%8D%95%E4%BA%8B%E4%BB%B6)

`DOMMenuItemActive`
`DOMMenuItemInactive`

### 窗口事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E7%AA%97%E5%8F%A3%E4%BA%8B%E4%BB%B6)

[DOMWindowCreated](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMWindowCreated)
[DOMTitleChanged](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMTitleChanged)
[DOMWindowClose](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMWindowClose)
[SSWindowClosing](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/SSWindowClosing)
[SSWindowStateReady](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/SSWindowStateReady)
[SSWindowStateBusy](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/SSWindowStateBusy)
[close](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/close_event)

### 文档事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E6%96%87%E6%A1%A3%E4%BA%8B%E4%BB%B6)

[DOMLinkAdded](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMLinkAdded)
[DOMLinkRemoved](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMLinkRemoved)
[DOMMetaAdded](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMMetaAdded)
[DOMMetaRemoved](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMMetaRemoved)
[DOMWillOpenModalDialog](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMWillOpenModalDialog)
[DOMModalDialogClosed](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMModalDialogClosed)

### 弹出事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E5%BC%B9%E5%87%BA%E4%BA%8B%E4%BB%B6)

`popuphidden`
`popuphiding`
`popupshowing`
`popupshown`
[DOMPopupBlocked](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMPopupBlocked)

### Tab事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#Tab%E4%BA%8B%E4%BB%B6)

[TabOpen](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabOpen)
[TabClose](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabClose)
[TabSelect](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabSelect)
[TabShow](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabShow)
[TabHide](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabHide)
[TabPinned](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabPinned)
[TabUnpinned](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabUnpinned)
[SSTabClosing](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/SSTabClosing)
[SSTabRestoring](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/SSTabRestoring)
[SSTabRestored](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/SSTabRestored)
`visibilitychange`

### 电池事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E7%94%B5%E6%B1%A0%E4%BA%8B%E4%BB%B6)

`chargingchange`
`chargingtimechange`
`dischargingtimechange`
`levelchange`

### 呼叫事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E5%91%BC%E5%8F%AB%E4%BA%8B%E4%BB%B6)

`alerting`
`busy`
`callschanged`
`cfstatechange`
`connected`
`connecting`
`dialing`
`disconnected`
`disconnecting`
`error`
`held`, `holding`
`incoming`
`resuming`
`statechange`
`voicechange`

### 传感器事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E4%BC%A0%E6%84%9F%E5%99%A8%E4%BA%8B%E4%BB%B6)

`compassneedscalibration`
`devicelight`
`devicemotion`
`deviceorientation`
`deviceproximity`
`MozOrientation`
`orientationchange`
`userproximity`

### 智能卡事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E6%99%BA%E8%83%BD%E5%8D%A1%E4%BA%8B%E4%BB%B6)

`icccardlockerror`
`iccinfochange`
`smartcard-insert`
`smartcard-remove`
`stkcommand`
`stksessionend`
`cardstatechange`

### 短信和USSD事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E7%9F%AD%E4%BF%A1%E5%92%8CUSSD%E4%BA%8B%E4%BB%B6)

`delivered`
`received`
`sent`
`ussdreceived`

### 帧事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E5%B8%A7%E4%BA%8B%E4%BB%B6)

`mozbrowserclose`
`mozbrowsercontextmenu`
`mozbrowsererror`
`mozbrowsericonchange`
`mozbrowserlocationchange`
`mozbrowserloadend`
`mozbrowserloadstart`
`mozbrowseropenwindow`
`mozbrowsersecuritychange`
`mozbrowsershowmodalprompt`([link](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/mozbrowsershowmodalprompt))
`mozbrowsertitlechange`
[DOMFrameContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMFrameContentLoaded)

### DOM变异事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#DOM%E5%8F%98%E5%BC%82%E4%BA%8B%E4%BB%B6)

`DOMAttributeNameChanged`
`DOMAttrModified`
`DOMCharacterDataModified`
`DOMContentLoaded`
`DOMElementNameChanged`
`DOMNodeInserted`
`DOMNodeInsertedIntoDocument`
`DOMNodeRemoved`
`DOMNodeRemovedFromDocument`
`DOMSubtreeModified`

### 触摸事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E8%A7%A6%E6%91%B8%E4%BA%8B%E4%BB%B6)

[MozEdgeUIGesture](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozEdgeUIGesture)
[MozMagnifyGesture](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozMagnifyGesture)
[MozMagnifyGestureStart](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozMagnifyGestureStart)
[MozMagnifyGestureUpdate](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozMagnifyGestureUpdate)
[MozPressTapGesture](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozPressTapGesture)
[MozRotateGesture](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozRotateGesture)
[MozRotateGestureStart](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozRotateGestureStart)
[MozRotateGestureUpdate](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozRotateGestureUpdate)
[MozSwipeGesture](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozSwipeGesture)
[MozTapGesture](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozTapGesture)
[MozTouchDown](https://developer.mozilla.org/en-US/DOM/Touch_events_(Mozilla_experimental))
[MozTouchMove](https://developer.mozilla.org/en-US/DOM/Touch_events_(Mozilla_experimental))
[MozTouchUp](https://developer.mozilla.org/en-US/DOM/Touch_events_(Mozilla_experimental))
`touchcancel`
`touchend`
`touchenter`
`touchleave`
`touchmove`
`touchstart`

### 指针事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E6%8C%87%E9%92%88%E4%BA%8B%E4%BB%B6)

`pointerover`
`pointerenter`
`pointerdown`
`pointermove`
`pointerup`
`pointercancel`
`pointerout`
`pointerleave`
`gotpointercapture`
`lostpointercapture`

## 标准事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E6%A0%87%E5%87%86%E4%BA%8B%E4%BB%B6)

这些事件在官方Web规范中定义，并且应在各个浏览器中通用。 每个事件都和代表事件接收方的对象（由此您可以查到每个事件提供的数据），定义这个事件的标准或标准链接会一起列出。

| 事件名称                      | 事件类型                                                     | 规范                                                         | 触发时机...                                                  |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `abort`                       | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-abort) | 资源载入已被中止                                             |
| `abort`                       | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Progress](http://www.w3.org/TR/progress-events/)and[XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-abort) | Progress被终止(不是error造成的)                              |
| `abort`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [IndexedDB](http://www.w3.org/TR/IndexedDB/#database-interface) | 事务已被中止                                                 |
| `afterprint`                  | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5](http://www.w3.org/TR/html5/webappapis.html#printing) | 相关文档已开始打印或打印预览已被关闭                         |
| `animationend`                | [`AnimationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnimationEvent) | [CSS Animations](http://www.w3.org/TR/css3-animations/#animation-events) | 完成一个[CSS 动画](https://developer.mozilla.org/en-US/docs/CSS/CSS_animations) |
| `animationiteration`          | [`AnimationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnimationEvent) | [CSS Animations](http://www.w3.org/TR/css3-animations/#animation-events) | 重复播放一个[CSS 动画](https://developer.mozilla.org/en-US/docs/CSS/CSS_animations) |
| `animationstart`              | [`AnimationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnimationEvent) | [CSS Animations](http://www.w3.org/TR/css3-animations/#animation-events) | 一个[CSS 动画](https://developer.mozilla.org/en-US/docs/CSS/CSS_animations)已开始 |
| `audioprocess`                | [`AudioProcessingEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioProcessingEvent) | [Web Audio API audioprocess](https://webaudio.github.io/web-audio-api/#AudioProcessingEvent) | 一个[`ScriptProcessorNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/ScriptProcessorNode)的输入缓冲区可处理 |
| `audioend`                    | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Speech API](https://w3c.github.io/speech-api/)          | 用户代理捕捉到用以语音识别的音频                             |
| `audiostart`                  | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Speech API](https://w3c.github.io/speech-api/)          | 用户代理开始捕捉用以语音识别的音频                           |
| `beforeprint`                 | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5](http://www.w3.org/TR/html5/webappapis.html#printing) | 相关文档将要开始打印或准备打印预览                           |
| `beforeunload`                | [`BeforeUnloadEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/BeforeUnloadEvent) | [HTML5](http://www.w3.org/TR/html5/browsers.html#unloading-documents) | 即将卸载 window，document 及其资源                           |
| `beginEvent`                  | [`TimeEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TimeEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | A[SMIL](https://developer.mozilla.org/en-US/docs/SVG/SVG_animation_with_SMIL)animation element begins. |
| `blocked_indexedDB`           | [`IDBVersionChangeEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBVersionChangeEvent) | [IndexedDB](http://www.w3.org/TR/IndexedDB/#request-api)     | An open connection to a database is blocking a`versionchange`transaction on the same database. |
| `blur`                        | [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-blur) | 元素失去焦点 （不会冒泡）.                                   |
| `boundary`                    | [`SpeechSynthesisEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesisEvent) | [`SpeechSynthesisEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesisEvent) |                                                              |
| `cached`                      | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Offline](http://dev.w3.org/html5/spec/offline.html)         | The resources listed in the manifest have been downloaded, and the application is now cached. |
| `canplay`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-canplay) | The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content. |
| `canplaythrough`              | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-canplaythrough) | The user agent can play the media, and estimates that enough data has been loaded to play the media up to its end without having to stop for further buffering of content. |
| `change`                      | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [DOM L2](http://www.w3.org/TR/DOM-Level-2-Events/events.html),[HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-input-element-attributes.html#event-input-change) | An element loses focus and its value changed since gaining focus. |
| `chargingchange`              | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Battery status](https://dvcs.w3.org/hg/dap/raw-file/tip/battery/Overview.html) | The battery begins or stops charging.                        |
| `chargingtimechange`          | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Battery status](https://dvcs.w3.org/hg/dap/raw-file/tip/battery/Overview.html) | The`chargingTime`attribute has been updated.                 |
| `checking`                    | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Offline](http://dev.w3.org/html5/spec/offline.html)         | The user agent is checking for an update, or attempting to download the cache manifest for the first time. |
| `click`                       | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-click) | A pointing device button has been pressed and released on an element. |
| `close`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [WebSocket](http://www.w3.org/TR/websockets/)                | A WebSocket connection has been closed.                      |
| `complete`                    |                                                              | [IndexedDB](http://www.w3.org/TR/IndexedDB/#transaction)     |                                                              |
| `complete`                    | [`OfflineAudioCompletionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/OfflineAudioCompletionEvent) | [Web Audio API OfflineAudioCompletionEvent](https://webaudio.github.io/web-audio-api/#OfflineAudioCompletionEvent-section) | The rendering of an [`OfflineAudioContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/OfflineAudioContext) is terminated. |
| `compositionend`              | [`CompositionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CompositionEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-compositionend) | The composition of a passage of text has been completed or canceled. |
| `compositionstart`            | [`CompositionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CompositionEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-compositionstart) | The composition of a passage of text is prepared (similar to keydown for a keyboard input, but works with other inputs such as speech recognition). |
| `compositionupdate`           | [`CompositionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CompositionEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-compositionupdate) | A character is added to a passage of text being composed.    |
| `contextmenu`                 | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [HTML5](http://www.w3.org/TR/html5/interactive-elements.html#context-menus) | The right button of the mouse is clicked (before the context menu is displayed). |
| `copy`                        | [`ClipboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent) | [Clipboard](http://www.w3.org/TR/clipboard-apis/#copy-event) | The text selection has been added to the clipboard.          |
| `cut`                         | [`ClipboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent) | [Clipboard](http://www.w3.org/TR/clipboard-apis/#cut-event)  | The text selection has been removed from the document and added to the clipboard. |
| `dblclick`                    | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-dblclick) | A pointing device button is clicked twice on an element.     |
| `devicelight`                 | [`DeviceLightEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceLightEvent) | [Ambient Light Events](http://dvcs.w3.org/hg/dap/raw-file/tip/light/Overview.html) | Fresh data is available from a light sensor.                 |
| `devicemotion`                | [`DeviceMotionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent) | [Device Orientation Events](http://dev.w3.org/geo/api/spec-source-orientation.html) | Fresh data is available from a motion sensor.                |
| `deviceorientation`           | [`DeviceOrientationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceOrientationEvent) | [Device Orientation Events](http://dev.w3.org/geo/api/spec-source-orientation.html) | Fresh data is available from an orientation sensor.          |
| `deviceproximity`             | [`DeviceProximityEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceProximityEvent) | [Proximity Events](http://dvcs.w3.org/hg/dap/raw-file/tip/proximity/Overview.html) | Fresh data is available from a proximity sensor (indicates an approximated distance between the device and a nearby object). |
| `dischargingtimechange`       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Battery status](https://dvcs.w3.org/hg/dap/raw-file/tip/battery/Overview.html) | The`dischargingTime`attribute has been updated.              |
| `DOMActivate`                 | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMActivate) | A button, link or state changing element is activated (use `click`instead). |
| `DOMAttributeNameChanged`     | [`MutationNameEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationNameEvent) | [DOM L3](http://www.w3.org/TR/2011/WD-DOM-Level-3-Events-20110531/#event-type-DOMAttributeNameChanged)Removed | The name of an attribute changed (use[mutation observers](https://developer.mozilla.org/en-US/docs/DOM/MutationObserver)instead). |
| `DOMAttrModified`             | [`MutationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMAttrModified) | The value of an attribute has been modified (use[mutation observers](https://developer.mozilla.org/en-US/docs/DOM/MutationObserver)instead). |
| `DOMCharacterDataModified`    | [`MutationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMCharacterDataModified) | A text or another[CharacterData](https://developer.mozilla.org/en-US/docs/DOM/CharacterData)has changed (use[mutation observers](https://developer.mozilla.org/en-US/docs/DOM/MutationObserver)instead). |
| `DOMContentLoaded`            | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#the-end) | The document has finished loading (but not its dependent resources). |
| `DOMElementNameChanged`       | [`MutationNameEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationNameEvent) | [DOM L3](http://www.w3.org/TR/2011/WD-DOM-Level-3-Events-20110531/#event-type-DOMElementNameChanged)Removed | The name of an element changed (use[mutation observers](https://developer.mozilla.org/en-US/docs/DOM/MutationObserver)instead). |
| `DOMFocusIn`                  | [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMFocusIn) | An element has received focus (use `focus` or `focusin`instead). |
| `DOMFocusOut`                 | [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMFocusOut) | An element has lost focus (use `blur` or `focusout` instead). |
| `DOMNodeInserted`             | [`MutationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMNodeInserted) | A node has been added as a child of another node (use[mutation observers](https://developer.mozilla.org/en-US/docs/DOM/MutationObserver)instead). |
| `DOMNodeInsertedIntoDocument` | [`MutationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMNodeInsertedIntoDocument) | A node has been inserted into the document (use[mutation observers](https://developer.mozilla.org/en-US/docs/DOM/MutationObserver)instead). |
| `DOMNodeRemoved`              | [`MutationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMNodeRemoved) | A node has been removed from its parent node (use[mutation observers](https://developer.mozilla.org/en-US/docs/DOM/MutationObserver)instead). |
| `DOMNodeRemovedFromDocument`  | [`MutationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMNodeRemovedFromDocument) | A node has been removed from the document (use[mutation observers](https://developer.mozilla.org/en-US/docs/DOM/MutationObserver)instead). |
| `DOMSubtreeModified`          | [`MutationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMSubtreeModified) | A change happened in the document (use[mutation observers](https://developer.mozilla.org/en-US/docs/DOM/MutationObserver)instead). |
| `downloading`                 | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Offline](http://dev.w3.org/html5/spec/offline.html)         | The user agent has found an update and is fetching it, or is downloading the resources listed by the cache manifest for the first time. |
| `drag`                        | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-drag) | An element or text selection is being dragged (every 350ms). |
| `dragend`                     | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-dragend) | A drag operation is being ended (by releasing a mouse button or hitting the escape key). |
| `dragenter`                   | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-dragenter) | A dragged element or text selection enters a valid drop target. |
| `dragleave`                   | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-dragleave) | A dragged element or text selection leaves a valid drop target. |
| `dragover`                    | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-dragover) | An element or text selection is being dragged over a valid drop target (every 350ms). |
| `dragstart`                   | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-dragstart) | The user starts dragging an element or text selection.       |
| `drop`                        | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-drop) | An element is dropped on a valid drop target.                |
| `durationchange`              | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-durationchange) | The`duration`attribute has been updated.                     |
| `emptied`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-emptied) | The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the[`load()`](https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/NsIDOMHTMLMediaElement)method is called to reload it. |
| `ended`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-ended) | Playback has stopped because the end of the media was reached. |
| `ended`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Audio API](https://webaudio.github.io/web-audio-api/)   |                                                              |
| `endEvent`                    | [`TimeEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TimeEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | A[SMIL](https://developer.mozilla.org/en-US/docs/SVG/SVG_animation_with_SMIL)animation element ends. |
| `error`                       | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-error) | A resource failed to load.                                   |
| `error`                       | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Progress](http://www.w3.org/TR/progress-events/)and[XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-error) | Progression has failed.                                      |
| `error`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Offline](http://dev.w3.org/html5/spec/offline.html)         | An error occurred while downloading the cache manifest or updating the content of the application. |
| `error`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [WebSocket](http://www.w3.org/TR/websockets/)                | A WebSocket connection has been closed with prejudice (some data couldn't be sent for example). |
| `error`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Server Sent Events](http://dev.w3.org/html5/eventsource/)   | An event source connection has been failed.                  |
| `error`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [IndexedDB](http://www.w3.org/TR/IndexedDB/#request-api)     | A request caused an error and failed.                        |
| `focus`                       | [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-focus) | An element has received focus (does not bubble).             |
| `focusin`                     | [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-focusIn) | An element is about to receive focus (bubbles).              |
| `focusout`                    | [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-focusout) | An element is about to lose focus (bubbles).                 |
| `fullscreenchange`            | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Full Screen](https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html#api) | An element was turned to fullscreen mode or back to normal mode. |
| `fullscreenerror`             | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Full Screen](https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html#api) | It was impossible to switch to fullscreen mode for technical reasons or because the permission was denied. |
| `gamepadconnected`            | [`GamepadEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/GamepadEvent) | [Gamepad](http://www.w3.org/TR/gamepad/#the-gamepadconnected-event) | A gamepad has been connected.                                |
| `gamepaddisconnected`         | [`GamepadEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/GamepadEvent) | [Gamepad](http://www.w3.org/TR/gamepad/#the-gamepaddisconnected-event) | A gamepad has been disconnected.                             |
| `hashchange`                  | [`HashChangeEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/HashChangeEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html#event-hashchange) | The fragment identifier of the URL has changed (the part of the URL after the #). |
| `lostpointercapture`          | [`PointerEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent) | [Pointer Events](http://www.w3.org/TR/pointerevents/#the-lostpointercapture-event) |                                                              |
| `input`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5](http://www.w3.org/TR/html5/forms.html#common-event-behaviors) | The value of an element changes or the content of an element with the attribute[contenteditable](https://developer.mozilla.org/en-US/docs/DOM/Element.contentEditable)is modified. |
| `invalid`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#constraint-validation) | A submittable element has been checked and doesn't satisfy its constraints. |
| `keydown`                     | [`KeyboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-keydown) | A key is pressed down.                                       |
| `keypress`                    | [`KeyboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-keypress) | A key is pressed down and that key normally produces a character value (use input instead). |
| `keyup`                       | [`KeyboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-keyup) | A key is released.                                           |
| `languagechange`              | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) |                                                              |                                                              |
| `levelchange`                 | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Battery status](https://dvcs.w3.org/hg/dap/raw-file/tip/battery/Overview.html) | The`level`attribute has been updated.                        |
| `load`                        | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-load) | A resource and its dependent resources have finished loading. |
| `load`                        | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Progress](http://www.w3.org/TR/progress-events/)and[XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-load) | Progression has been successful.                             |
| `loadeddata`                  | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-loadeddata) | The first frame of the media has finished loading.           |
| `loadedmetadata`              | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-loadedmetadata) | The metadata has been loaded.                                |
| `loadend`                     | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Progress](http://www.w3.org/TR/progress-events/)and[XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-loadend) | Progress has stopped (after "error", "abort" or "load" have been dispatched). |
| `loadstart`                   | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Progress](http://www.w3.org/TR/progress-events/)and[XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-loadstart) | Progress has begun.                                          |
| `mark`                        | [`SpeechSynthesisEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesisEvent) | [Web Speech API](https://w3c.github.io/speech-api/)          |                                                              |
| `message`                     | [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent) | [WebSocket](http://www.w3.org/TR/websockets/)                | A message is received through a WebSocket.                   |
| `message`                     | [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent) | [Web Workers](http://www.w3.org/TR/workers/#communicating-with-a-dedicated-worker) | A message is received from a Web Worker.                     |
| `message`                     | [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent) | [Web Messaging](http://www.w3.org/TR/webmessaging/)          | A message is received from a child (i)frame or a parent window. |
| `message`                     | [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent) | [Server Sent Events](http://dev.w3.org/html5/eventsource/)   | A message is received through an event source.               |
| `mousedown`                   | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mousedown) | A pointing device button (usually a mouse) is pressed on an element. |
| `mouseenter`                  | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseenter) | A pointing device is moved onto the element that has the listener attached. |
| `mouseleave`                  | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseleave) | A pointing device is moved off the element that has the listener attached. |
| `mousemove`                   | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mousemove) | A pointing device is moved over an element.                  |
| `mouseout`                    | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseout) | A pointing device is moved off the element that has the listener attached or off one of its children. |
| `mouseover`                   | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseover) | A pointing device is moved onto the element that has the listener attached or onto one of its children. |
| `mouseup`                     | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseup) | A pointing device button is released over an element.        |
| `noupdate`                    | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Offline](http://dev.w3.org/html5/spec/offline.html)         | The manifest hadn't changed.                                 |
| `obsolete`                    | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Offline](http://dev.w3.org/html5/spec/offline.html)         | The manifest was found to have become a 404 or 410 page, so the application cache is being deleted. |
| `offline`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 offline](http://www.whatwg.org/specs/web-apps/current-work/multipage/offline.html#event-offline) | The browser has lost access to the network.                  |
| `online`                      | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 offline](http://www.whatwg.org/specs/web-apps/current-work/multipage/offline.html#event-online) | The browser has gained access to the network (but particular websites might be unreachable). |
| `open`                        | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [WebSocket](http://www.w3.org/TR/websockets/)                | A WebSocket connection has been established.                 |
| `open`                        | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Server Sent Events](http://dev.w3.org/html5/eventsource/)   | An event source connection has been established.             |
| `orientationchange`           | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Screen Orientation](http://www.w3.org/TR/screen-orientation/) | The orientation of the device (portrait/landscape) has changed |
| `pagehide`                    | [`PageTransitionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PageTransitionEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html#event-pagehide) | A session history entry is being traversed from.             |
| `pageshow`                    | [`PageTransitionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PageTransitionEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html#event-pageshow) | A session history entry is being traversed to.               |
| `paste`                       | [`ClipboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent) | [Clipboard](http://www.w3.org/TR/clipboard-apis/#paste-event) | Data has been transfered from the system clipboard to the document. |
| `pause`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-pause) | Playback has been paused.                                    |
| `pointerlockchange`           | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Pointer Lock](http://www.w3.org/TR/pointerlock/#pointerlockchange-and-pointerlockerror-events) | The pointer was locked or released.                          |
| `pointerlockerror`            | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Pointer Lock](http://www.w3.org/TR/pointerlock/#pointerlockchange-and-pointerlockerror-events) | It was impossible to lock the pointer for technical reasons or because the permission was denied. |
| `play`                        | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-play) | Playback has begun.                                          |
| `playing`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-playing) | Playback is ready to start after having been paused or delayed due to lack of data. |
| `popstate`                    | [`PopStateEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PopStateEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html#event-popstate) | A session history entry is being navigated to (in certain cases). |
| `progress`                    | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Progress](http://www.w3.org/TR/progress-events/)and[XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-progress) | In progress.                                                 |
| `progress`                    | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Offline](http://dev.w3.org/html5/spec/offline.html)         | The user agent is downloading resources listed by the manifest. |
| `ratechange`                  | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-ratechange) | The playback rate has changed.                               |
| `readystatechange`            | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | HTML5and[XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-readystatechange) | The readyState attribute of a document has changed.          |
| `repeatEvent`                 | [`TimeEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TimeEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | A[SMIL](https://developer.mozilla.org/en-US/docs/SVG/SVG_animation_with_SMIL)animation element is repeated. |
| `reset`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [DOM L2](http://www.w3.org/TR/DOM-Level-2-Events/events.html),[HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#form-submission-0#resetting-a-form) | A form is reset.                                             |
| `resize`                      | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-resize) | The document view has been resized.                          |
| `scroll`                      | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-scroll) | The document view or an element has been scrolled.           |
| `seeked`                      | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-seeked) | A*seek*operation completed.                                  |
| `seeking`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-seeking) | A*seek*operation began.                                      |
| `select`                      | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-select) | Some text is being selected.                                 |
| `show`                        | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [HTML5](http://www.w3.org/TR/html5/interactive-elements.html#context-menus) | A contextmenu event was fired on/bubbled to an element that has a[contextmenu](https://developer.mozilla.org/en-US/docs/DOM/element.contextmenu)attribute |
| `stalled`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-stalled) | The user agent is trying to fetch media data, but data is unexpectedly not forthcoming. |
| `storage`                     | [`StorageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/StorageEvent) | [Web Storage](http://www.w3.org/TR/webstorage/#the-storage-event) | A storage area ([localStorage](https://developer.mozilla.org/en-US/docs/DOM/Storage#localStorage)or[sessionStorage](https://developer.mozilla.org/en-US/docs/DOM/Storage#sessionStorage)) has changed. |
| `submit`                      | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [DOM L2](http://www.w3.org/TR/DOM-Level-2-Events/events.html),[HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#form-submission-algorithm) | A form is submitted.                                         |
| `success`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [IndexedDB](http://www.w3.org/TR/IndexedDB/#request-api)     | A request successfully completed.                            |
| `suspend`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-suspend) | Media data loading has been suspended.                       |
| `SVGAbort`                    | [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | Page loading has been stopped before the[SVG](https://developer.mozilla.org/en-US/docs/SVG)was loaded. |
| `SVGError`                    | [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | An error has occurred before the[SVG](https://developer.mozilla.org/en-US/docs/SVG)was loaded. |
| `SVGLoad`                     | [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | An[SVG](https://developer.mozilla.org/en-US/docs/SVG)document has been loaded and parsed. |
| `SVGResize`                   | [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | An[SVG](https://developer.mozilla.org/en-US/docs/SVG)document is being resized. |
| `SVGScroll`                   | [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | An[SVG](https://developer.mozilla.org/en-US/docs/SVG)document is being scrolled. |
| `SVGUnload`                   | [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | An[SVG](https://developer.mozilla.org/en-US/docs/SVG)document has been removed from a window or frame. |
| `SVGZoom`                     | [`SVGZoomEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGZoomEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | An[SVG](https://developer.mozilla.org/en-US/docs/SVG)document is being zoomed. |
| `timeout`                     | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-timeout) |                                                              |
| `timeupdate`                  | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-timeupdate) | The time indicated by the`currentTime`attribute has been updated. |
| `touchcancel`                 | [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) | [Touch Events](http://www.w3.org/TR/touch-events/)           | A touch point has been disrupted in an implementation-specific manners (too many touch points for example). |
| `touchend`                    | [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) | [Touch Events](http://www.w3.org/TR/touch-events/#the-touchend-event) | A touch point is removed from the touch surface.             |
| `touchenter`                  | [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) | [Touch Events](http://www.w3.org/TR/touch-events/)Removed    | A touch point is moved onto the interactive area of an element. |
| `touchleave`                  | [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) | [Touch Events](http://www.w3.org/TR/touch-events/)Removed    | A touch point is moved off the interactive area of an element. |
| `touchmove`                   | [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) | [Touch Events](http://www.w3.org/TR/touch-events/#the-touchmove-event) | A touch point is moved along the touch surface.              |
| `touchstart`                  | [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) | [Touch Events](http://www.w3.org/TR/touch-events/#the-touchstart---------event) | A touch point is placed on the touch surface.                |
| `transitionend`               | [`TransitionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TransitionEvent) | [CSS Transitions](http://www.w3.org/TR/css3-transitions/#transition-events) | A[CSS transition](https://developer.mozilla.org/en-US/docs/CSS/CSS_transitions)has completed. |
| `unload`                      | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-unload) | The document or a dependent resource is being unloaded.      |
| `updateready`                 | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Offline](http://dev.w3.org/html5/spec/offline.html)         | The resources listed in the manifest have been newly redownloaded, and the script can use`swapCache()`to switch to the new cache. |
| `upgradeneeded`               |                                                              | [IndexedDB](http://www.w3.org/TR/IndexedDB/#request-api)     | An attempt was made to open a database with a version number higher than its current version. A`versionchange`transaction has been created. |
| `userproximity`               | [`SensorEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SensorEvent) | [Sensor](https://dvcs.w3.org/hg/dap/raw-file/tip/proximity/Overview.html) | Fresh data is available from a proximity sensor (indicates whether the nearby object is`near`the device or not). |
| `versionchange`               |                                                              | [IndexedDB](http://www.w3.org/TR/IndexedDB/#database-interface) | A`versionchange`transaction completed.                       |
| `visibilitychange`            | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Page visibility](http://www.w3.org/TR/page-visibility/#sec-visibilitychange-event) | The content of a tab has become visible or has been hidden.  |
| `volumechange`                | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-volumechange) | The volume has changed.                                      |
| `waiting`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-waiting) | Playback has stopped because of a temporary lack of data.    |
| `wheel`                       | [`WheelEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/WheelEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-wheel) | A wheel button of a pointing device is rotated in any direction. |

## 非标准事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E9%9D%9E%E6%A0%87%E5%87%86%E4%BA%8B%E4%BB%B6)

| Event Name                                                   | Event Type                                                   | Specification                                                | Fired when...                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `afterscriptexecute`                                         | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | *Mozilla Specific*                                           | A script has been executed.                                  |
| `beforescriptexecute`                                        | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | *Mozilla Specific*                                           | A script is about to be executed.                            |
| `cardstatechange`                                            |                                                              | *Firefox OS specific*                                        | The [`MozMobileConnection.cardState`](https://developer.mozilla.org/zh-CN/docs/Web/API/MozMobileConnection/cardState)property changes value. |
| `change`                                                     | [`DeviceStorageChangeEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceStorageChangeEvent) | *Firefox OS specific*                                        | This event is triggered each time a file is created, modified or deleted on a given storage area. |
| `connectionInfoUpdate`                                       |                                                              | [*Firefox OS specific*](http://mxr.mozilla.org/mozilla-central/source/dom/wifi/nsIWifi.idl?rev=3e586802f478#176) | The informations about the signal strength and the link speed have been updated. |
| `cfstatechange`                                              |                                                              | *Firefox OS specific*                                        | The call forwarding state changes.                           |
| `datachange`                                                 |                                                              | *Firefox OS specific*                                        | The [`MozMobileConnection.data`](https://developer.mozilla.org/zh-CN/docs/Web/API/MozMobileConnection/data) object changes values. |
| `dataerror`                                                  |                                                              | *Firefox OS specific*                                        | The [`MozMobileConnection.data`](https://developer.mozilla.org/zh-CN/docs/Web/API/MozMobileConnection/data) object receive an error from theRIL. |
| `DOMMouseScroll`                                             |                                                              | *Mozilla specific*                                           | The wheel button of a pointing device is rotated (detail attribute is a number of lines). (use `wheel`instead) |
| `dragdrop`                                                   | `DragEvent`                                                  | *Mozilla specific*                                           | An element is dropped (use `drop` instead).                  |
| `dragexit`                                                   | `DragEvent`                                                  | *Mozilla specific*                                           | A drag operation is being ended(use `dragend`instead).       |
| `draggesture`                                                | `DragEvent`                                                  | *Mozilla specific*                                           | The user starts dragging an element or text selection (use `dragstart` instead). |
| `icccardlockerror`                                           |                                                              | *Firefox OS specific*                                        | the [`MozMobileConnection.unlockCardLock()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MozMobileConnection/unlockCardLock)or [`MozMobileConnection.setCardLock()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MozMobileConnection/setCardLock)methods fails. |
| `iccinfochange`                                              |                                                              | *Firefox OS specific*                                        | The [`MozMobileConnection.iccInfo`](https://developer.mozilla.org/zh-CN/docs/Web/API/MozMobileConnection/iccInfo) object changes. |
| `localized`                                                  |                                                              | *Mozilla Specific*                                           | The page has been localized using data-l10n-* attributes.    |
| `mousewheel`                                                 |                                                              | [*IE invented*](http://msdn.microsoft.com/en-us/library/ie/ms536951%28v=vs.85%29.aspx) | The wheel button of a pointing device is rotated.            |
| `MozAudioAvailable`                                          | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | *Mozilla specific*                                           | The audio buffer is full and the corresponding raw samples are available. |
| [`MozBeforeResize`](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozBeforeResize) |                                                              | *Mozilla specific*                                           | A window is about to be resized.                             |
| `mozbrowserclose`                                            |                                                              | *Firefox OS specific*                                        | Sent when window.close() is called within a browser iframe.  |
| `mozbrowsercontextmenu`                                      |                                                              | *Firefox OS specific*                                        | Sent when a browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) try to open a context menu. |
| `mozbrowsererror`                                            |                                                              | *Firefox OS specific*                                        | Sent when an error occured while trying to load a content within a browser iframe |
| `mozbrowsericonchange`                                       |                                                              | *Firefox OS specific*                                        | Sent when the favicon of a browser iframe changes.           |
| `mozbrowserlocationchange`                                   |                                                              | *Firefox OS specific*                                        | Sent when an browser iframe's location changes.              |
| `mozbrowserloadend`                                          |                                                              | *Firefox OS specific*                                        | Sent when the browser iframe has finished loading all its assets. |
| `mozbrowserloadstart`                                        |                                                              | *Firefox OS specific*                                        | Sent when the browser iframe starts to load a new page.      |
| `mozbrowseropenwindow`                                       |                                                              | *Firefox OS specific*                                        | Sent when [`window.open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open) is called within a browser iframe. |
| `mozbrowsersecuritychange`                                   |                                                              | *Firefox OS specific*                                        | Sent when the SSL state changes within a browser iframe.     |
| `mozbrowsershowmodalprompt`                                  |                                                              | *Firefox OS specific*                                        | Sent when [`alert()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert), [`confirm()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/confirm) or [`prompt()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/prompt) are called within a browser iframe |
| `mozbrowsertitlechange`                                      |                                                              | *Firefox OS specific*                                        | Sent when the document.title changes within a browser iframe. |
| `MozGamepadButtonDown`                                       |                                                              | *To be specified*                                            | A gamepad button is pressed down.                            |
| `MozGamepadButtonUp`                                         |                                                              | *To be specified*                                            | A gamepad button is released.                                |
| `MozMousePixelScroll`                                        |                                                              | *Mozilla specific*                                           | The wheel button of a pointing device is rotated (detail attribute is a number of pixels). (use wheel instead) |
| `MozOrientation`                                             |                                                              | *Mozilla specific*                                           | Fresh data is available from an orientation sensor (see deviceorientation). |
| `MozScrolledAreaChanged`                                     | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | *Mozilla specific*                                           | The document view has been scrolled or resized.              |
| `moztimechange`                                              |                                                              | *Mozilla specific*                                           | The time of the device has been changed.                     |
| [MozTouchDown](https://developer.mozilla.org/en-US/DOM/Touch_events_(Mozilla_experimental)) |                                                              | *Mozilla specific*                                           | A touch point is placed on the touch surface (use touchstart instead). |
| [MozTouchMove](https://developer.mozilla.org/en-US/DOM/Touch_events_(Mozilla_experimental)) |                                                              | *Mozilla specific*                                           | A touch point is moved along the touch surface (use touchmove instead). |
| [MozTouchUp](https://developer.mozilla.org/en-US/DOM/Touch_events_(Mozilla_experimental)) |                                                              | *Mozilla specific*                                           | A touch point is removed from the touch surface (use touchend instead). |
| `alerting`                                                   | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | The correspondent is being alerted (his/her phone is ringing). |
| `busy`                                                       | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | The line of the correspondent is busy.                       |
| `callschanged`                                               | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | A call has been added or removed from the list of current calls. |
| [onconnected](https://developer.mozilla.org/en-US/docs/DOM/onconnected)`connected` | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | A call has been connected.                                   |
| `connecting`                                                 | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | A call is about to connect.                                  |
| `delivered`                                                  | [`SMSEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SMSEvent) | *To be specified*                                            | An SMS has been successfully delivered.                      |
| `dialing`                                                    | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | The number of a correspondent has been dialed.               |
| `disabled`                                                   |                                                              | [*Firefox OS specific*](http://mxr.mozilla.org/mozilla-central/source/dom/wifi/nsIWifi.idl?rev=3e586802f478#182) | Wifi has been disabled on the device.                        |
| `disconnected`                                               | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | A call has been disconnected.                                |
| `disconnecting`                                              | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | A call is about to disconnect.                               |
| `enabled`                                                    |                                                              | [*Firefox OS specific*](http://mxr.mozilla.org/mozilla-central/source/dom/wifi/nsIWifi.idl?rev=3e586802f478#182) | Wifi has been enabled on the device.                         |
| `error`                                                      | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | An error occurred.                                           |
| `held`                                                       | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | A call has been held.                                        |
| `holding`                                                    | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | A call is about to be held.                                  |
| `incoming`                                                   | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | A call is being received.                                    |
| `received`                                                   | [`SMSEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SMSEvent) | *To be specified*                                            | An SMS has been received.                                    |
| `resuming`                                                   | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | A call is about to resume.                                   |
| `sent`                                                       | [`SMSEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SMSEvent) | *To be specified*                                            | An SMS has been sent.                                        |
| `statechange`                                                | [`CallEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CallEvent) | *To be specified*                                            | The state of a call has changed.                             |
| `statuschange`                                               |                                                              | [*Firefox OS specific*](http://mxr.mozilla.org/mozilla-central/source/dom/wifi/nsIWifi.idl?rev=3e586802f478#156) | The status of the Wifi connection changed.                   |
| `overflow`                                                   | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | *Mozilla specific*                                           | An element has been overflowed by its content or has been rendered for the first time in this state (only works for elements styled with`overflow`!=`visible`). |
| `smartcard-insert`                                           |                                                              | *Mozilla specific*                                           | A[smartcard](https://developer.mozilla.org/en-US/docs/JavaScript_crypto)has been inserted. |
| `smartcard-remove`                                           |                                                              | *Mozilla specific*                                           | A[smartcard](https://developer.mozilla.org/en-US/docs/JavaScript_crypto)has been removed. |
| `stkcommand`                                                 |                                                              | *Firefox OS specific*                                        | TheSTKProactive Command is issued fromICC.                   |
| `stksessionend`                                              |                                                              | *Firefox OS specific*                                        | TheSTKSession is terminated byICC.                           |
| `text`                                                       |                                                              | *Mozilla Specific*                                           | A generic composition event occurred.                        |
| `underflow`                                                  | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | *Mozilla specific*                                           | An element is no longer overflowed by its content (only works for elements styled with`overflow`!=`visible`). |
| `uploadprogress`                                             | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | *Mozilla Specific*                                           | Upload is in progress (see `progress`).                      |
| `ussdreceived`                                               |                                                              | *Firefox OS specific*                                        | A newUSSDmessage is received                                 |
| `voicechange`                                                |                                                              | *Firefox OS specific*                                        | The [`MozMobileConnection.voice`](https://developer.mozilla.org/zh-CN/docs/Web/API/MozMobileConnection/voice) object changes values. |

## Mozilla 特定事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#Mozilla_%E7%89%B9%E5%AE%9A%E4%BA%8B%E4%BB%B6)

**注意：**这些事件不会暴露给 Web 内容使用，只能在 chrome 内容的上下文中使用。

### XUL 事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#XUL_%E4%BA%8B%E4%BB%B6)

| Event Name                                                   | Event Type   | Specification                                                | Fired when...                                                |
| ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `broadcast`                                                  |              | [XUL](https://developer.mozilla.org/en-US/docs/XUL/Tutorial/Broadcasters_and_Observers#Broadcast_event) | An`observer`noticed a change to the attributes of a watched broadcaster. |
| `CheckboxStateChange`                                        |              | XUL                                                          | The state of a`checkbox`has been changed either by a user action or by a script (useful for accessibility). |
| [close](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/close_event) |              | XUL                                                          | The close button of the window has been clicked.             |
| `command`                                                    |              | XUL                                                          | An element has been activated.                               |
| `commandupdate`                                              |              | XUL                                                          | A command update occurred on a`commandset`element.           |
| `DOMMenuItemActive`                                          |              | XUL                                                          | A menu or menuitem has been hovered or highlighted.          |
| `DOMMenuItemInactive`                                        |              | *XUL*                                                        | A menu or menuitem is no longer hovered or highlighted.      |
| `popuphidden`                                                | `PopupEvent` | [*XUL*](https://developer.mozilla.org/en-US/docs/XUL/PopupGuide/PopupEvents) | A menupopup, panel or tooltip has been hidden.               |
| `popuphiding`                                                | `PopupEvent` | [*XUL*](https://developer.mozilla.org/en-US/docs/XUL/PopupGuide/PopupEvents) | A menupopup, panel or tooltip is about to be hidden.         |
| `popupshowing`                                               | `PopupEvent` | [*XUL*](https://developer.mozilla.org/en-US/docs/XUL/PopupGuide/PopupEvents) | A menupopup, panel or tooltip is about to become visible.    |
| `popupshown`                                                 | `PopupEvent` | [*XUL*](https://developer.mozilla.org/en-US/docs/XUL/PopupGuide/PopupEvents) | A menupopup, panel or tooltip has become visible.            |
| `RadioStateChange`                                           |              | XUL                                                          | The state of a`radio`has been changed either by a user action or by a script (useful for accessibility). |
| `ValueChange`                                                |              | XUL                                                          | The value of an element has changed (a progress bar for example, useful for accessibility). |

### 附加组件特定事件[节](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E9%99%84%E5%8A%A0%E7%BB%84%E4%BB%B6%E7%89%B9%E5%AE%9A%E4%BA%8B%E4%BB%B6)

| Event Name                                                   | Event Type | Specification     | Fired when...                                                |
| ------------------------------------------------------------ | ---------- | ----------------- | ------------------------------------------------------------ |
| [MozSwipeGesture](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozSwipeGesture) |            | *Addons specific* | A touch point is swiped across the touch surface             |
| [MozMagnifyGestureStart](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozMagnifyGestureStart) |            | *Addons specific* | Two touch points start to move away from each other.         |
| [MozMagnifyGestureUpdate](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozMagnifyGestureUpdate) |            | *Addons specific* | Two touch points move away from each other (after a MozMagnifyGestureStart). |
| [MozMagnifyGesture](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozMagnifyGesture) |            | *Addons specific* | Two touch points moved away from each other (after a sequence of MozMagnifyGestureUpdate). |
| [MozRotateGestureStart](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozRotateGestureStart) |            | *Addons specific* | Two touch points start to rotate around a point.             |
| [MozRotateGestureUpdate](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozRotateGestureUpdate) |            | *Addons specific* | Two touch points rotate around a point (after a MozRotateGestureStart). |
| [MozRotateGesture](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozRotateGesture) |            | *Addons specific* | Two touch points rotate around a point (after a sequence of MozRotateGestureUpdate). |
| [MozTapGesture](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozTapGesture) |            | *Addons specific* | Two touch points are tapped on the touch surface.            |
| [MozPressTapGesture](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozPressTapGesture) |            | *Addons specific* | A "press-tap" gesture happened on the touch surface (first finger down, second finger down, second finger up, first finger up). |
| [MozEdgeUIGesture](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozEdgeUIGesture) |            | *Addons specific* | A touch point is swiped across the touch surface to invoke the edge UI (Win8 only). |
| [MozAfterPaint](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozAfterPaint) |            | *Addons specific* | Content has been repainted.                                  |
| [DOMPopupBlocked](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMPopupBlocked) |            | *Addons specific* | A popup has been blocked                                     |
| [DOMWindowCreated](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMWindowCreated) |            | *Addons specific* | A window has been created.                                   |
| [DOMWindowClose](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMWindowClose) |            | *Addons specific* | A window is about to be closed.                              |
| [DOMTitleChanged](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMTitleChanged) |            | *Addons specifc*  | The title of a window has changed.                           |
| [DOMLinkAdded](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMLinkAdded) |            | *Addons specifc*  | A link has been added a document.                            |
| [DOMLinkRemoved](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMLinkRemoved) |            | *Addons specifc*  | A link has been removed inside from a document.              |
| [DOMMetaAdded](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMMetaAdded) |            | *Addons specific* | A`meta`element has been added to a document.                 |
| [DOMMetaRemoved](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMMetaRemoved) |            | *Addons specific* | A`meta`element has been removed from a document.             |
| [DOMWillOpenModalDialog](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMWillOpenModalDialog) |            | *Addons specific* | A modal dialog is about to open.                             |
| [DOMModalDialogClosed](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMModalDialogClosed) |            | *Addons specific* | A modal dialog has been closed.                              |
| [DOMAutoComplete](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMAutoComplete) |            | *Addons specific* | The content of an element has been auto-completed.           |
| [DOMFrameContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMFrameContentLoaded) |            | *Addons specific* | The frame has finished loading (but not its dependent resources). |
| [AlertActive](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/AlertActive) |            | *Addons specific* | A`notification`element is shown.                             |
| [AlertClose](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/AlertClose) |            | *Addons specific* | A`notification`element is closed.                            |
| [fullscreen](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/fullscreen) |            | *Addons specific* | Browser fullscreen mode has been entered or left.            |
| [sizemodechange](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/sizemodechange) |            | *Addons specific* | Window has entered/left fullscreen mode, or has been minimized/unminimized. |
| [MozEnteredDomFullscreen](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/MozEnteredDomFullscreen) |            | *Addons specific* | [DOM fullscreen](https://developer.mozilla.org/en-US/docs/DOM/Using_full-screen_mode)mode has been entered. |
| [SSWindowClosing](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/SSWindowClosing) |            | *Addons specific* | The session store will stop tracking this window.            |
| [SSTabClosing](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/SSTabClosing) |            | *Addons specific* | The session store will stop tracking this tab.               |
| [SSTabRestoring](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/SSTabRestoring) |            | *Addons specific* | A tab is about to be restored.                               |
| [SSTabRestored](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/SSTabRestored) |            | *Addons specific* | A tab has been restored.                                     |
| [SSWindowStateReady](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/SSWindowStateReady) |            | *Addons specific* | A window state has switched to "ready".                      |
| [SSWindowStateBusy](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/SSWindowStateBusy) |            | *Addons specific* | A window state has switched to "busy".                       |
| [tabviewsearchenabled](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/tabviewsearchenabled) |            | *Addons specific* | The search feature of Panorama has been activated            |
| [tabviewsearchdisabled](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/tabviewsearchdisabled) |            | *Addons specific* | The search feature of Panorama has been deactivated          |
| [tabviewframeinitialized](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/tabviewframeinitialized) |            | *Addons specific* | The frame container of Panorama has been initialized         |
| [tabviewshown](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/tabviewshown) |            | *Addons specific* | The Panorama tab has been shown                              |
| [tabviewhidden](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/tabviewhidden) |            | *Addons specific* | The Panorama tab has been hidden                             |
| [TabOpen](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabOpen) |            | *Addons specific* | A tab has been opened.                                       |
| [TabClose](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabClose) |            | *Addons specific* | A tab has been closed.                                       |
| [TabSelect](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabSelect) |            | *Addons specific* | A tab has been selected.                                     |
| [TabShow](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabShow) |            | *Addons specific* | A tab has been shown.                                        |
| [TabHide](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabHide) |            | *Addons specific* | A tab has been hidden.                                       |
| [TabPinned](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabPinned) |            | *Addons specific* | A tab has been pinned.                                       |
| [TabUnpinned](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/TabUnpinned) |            | *Addons specific* | A tab has been unpinned.                                     |

### 开发者工具特定事件

| Event Name                                                   | Event Type | Specification       | Fired when...                                                |
| ------------------------------------------------------------ | ---------- | ------------------- | ------------------------------------------------------------ |
| [CssRuleViewRefreshed](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/CssRuleViewRefreshed) |            | *devtools specific* | The "Rules" view of the style inspector has been updated.    |
| [CssRuleViewChanged](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/CssRuleViewChanged) |            | *devtools specific* | The "Rules" view of the style inspector has been changed.    |
| [CssRuleViewCSSLinkClicked](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/CssRuleViewCSSLinkClicked) |            | *devtools specific* | A link to a CSS file has been clicked in the "Rules" view of the style inspector. |