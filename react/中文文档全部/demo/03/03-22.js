// Web component 
// 编写第三方组件会使用这部分内容
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        <x-search>
          {this.props.name}
        </x-search>
      </div>
    );
  }
}

class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    const name = this.getAttribute('name');
    const url = 'http://www.baidu.com/search?q=' + encodeURIComponent(name);
  ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}

customElements.define('x-search', XSearch);
// 注意：这个在babel下面不起作用