// 传递函数给组件
// 前两中方法使用 bind 推荐
class Foo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('click');
  }
  render() {
    return (
      <button onClick={this.handleClick}>button</button>
    );
  }
}

class Foo extends Component {
  handleClick() {
    console.log('1');
  }
  render() {
    let id = 1;
    return(
      <button onClick={this.handleClick.bind(this, id)}>click</button>
    );
  }
}

// 直接在JSX写入箭头函数，每次都会渲染新的函数，这样不利于性能
// 这样传参比较方便
class Foo extends Component {
  handleClick() {
    console.log(1);
  }
  render() {
    let id = 1;
    return <button onClick={() => this.handleClick(id)}>click</button>
  }
}

// 例子：箭头函数传参
const A = 65;

class Com extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      justClicked: null,
      letters: Array.from({length: 26}, (_, i) => {String.fromCharCode(A + i)}),
    };
  }
  handleClick(letter) {
    this.setState({
      justClicked: letter
    });
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.letters.map(letter => {
            <li key={letter} onClick={() => this.handleClick(letter)}>
              {letter}
            </li>
          })}
        </ul>
      </div>
    );
  }
}

// 传值可以通过函数参数传值（常用）
// 或者把值绑定到 date- 属性上，通过点击事件的对象获取属性传值

// 阻止函数调用过快或者太多次
// 节流防抖
// throttle debounce requestAnimationFrame

// 节流：每秒只能执行一次函数（适应于频繁点击事件）
import throttle from lodash.throttle;

class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickThrottled = throttle(this.handleClick, 1000);
  }

  componentWillUnmount() {
    this.handleClickThrottled.calcel();
  }

  handleClick() {
    this.props.loadMore();
  }

  render() {
    return <button onClick={this.handleClickThrottled}>Load More</button>
  }
}

import debounce from 'lodash.debounce';

class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emitChnageDebounce = debounce(this.emitChange, 250);
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.handleChange}
        placeholder="Search"
        defaultValue={this.props.value}
      />
    );
  }

  handleChange(e) {
    this.emitChangeDebounced(e.target.value);
  }

  emitChange(value) {
    this.props.onChange(value);
  }
}

// 使用 RequestAnimationFrame 节流
// 这个使用 raf-schd 实现
import rafSchedule from 'raf-schd';

class ScrollListener extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.scheduleUpdate = rafSchedule(
      point => this.props.onScroll(point)
    );
  }

  handleScroll(e) {
    // When we receive a scroll event, schedule an update.
    // If we receive many updates within a frame, we'll only publish the latest value.
    this.scheduleUpdate({
      x: e.clientX,
      y: e.clientY,
    });
  }

  componentWillUnmount() {
    this.scheduleUpdate.cancel();
  }

  render() {
    return (
      <div style={style} onScroll={this.handleScroll}>
        <img src="" />
      </div>
    );
  }
}
