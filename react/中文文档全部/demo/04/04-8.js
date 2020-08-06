import TestRenderer from 'react-test-renderer';

// 不依赖原生的DOM或者移动环境，将REACT渲染成JS对象
function Link(props) {
  return <a href={props.page}>P{props.children}</a>
}

const testRender = TestRenderer.create(
  <Link page="http://www.baidu.com"></Link>
);

console.log(testRenderer.toJSON());
// 这里是渲染出来的结果