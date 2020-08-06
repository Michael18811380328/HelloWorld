// Test Utilities
// 结合JEST实现测试框架
import ReactTestUtils from 'react-dom/test-utils';

// main API 
act()
mockComponent()
isElement()
isElementOfType()
isDOMComponent()
isCompositeComponent()
isCompositeComponentWithType()
findAllInRenderedTree()

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    alert(this.state.count);
  }

  componentDidUpdate() {
    alert(this.state.count);
  }

  handleClick() {
    this.setState((state) => {
      return {
        count: state.count + 1
      }
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}></button>
      </div>
    );
  }
}

// test code
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

if('can render and update a counter', () => {
  act(() => {
    ReactDOM.render(<Counter></Counter>, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('Ypu clicked 0 times');

  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    expect(document.title).toBe('You clicked 1 times');
  });
});
