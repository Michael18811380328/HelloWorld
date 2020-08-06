// 测试渲染性能
// Profiler 识别APP中渲染较慢的部分，然后进行优化
// 在测试环境中使用，在生产环境中禁止使用

// props: ID, 回调函数 onRender
// 第一个是目标对象，第二个是测试渲染的回调结果

render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation/>
    </Profiler>
    <Main/>
  </App>
);

// 可以监测不同组件的渲染情况
render(
  <App>
    <Profiler id="Panel" onRender={callback1}>
      <Panel>
        <Profiler id="Content" onRender={fn}>
          <Content/>
        </Profiler>
        <Panel/>
      </Panel>
    </Profiler>
  </App>
);

function onRenderCallback() {
  id
  phase
  actualDuration
  baseDuration
  commitTime
  interactions
}
