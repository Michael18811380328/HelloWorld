// React 不建议直接操作DOM
// 有些情况可以直接操作DOM
// 下面是常用的API
//  dangerouslySetInnerHTML
function createMarkup() {
  return {
    __html: '&nbsp ss'
  };
}

function MyComponent() {
  return (
    <div dangerouslySetInnerHTML={createMarkup()}></div>
  );
}

// style
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}></div>
}

// 样式中，默认的单位是px