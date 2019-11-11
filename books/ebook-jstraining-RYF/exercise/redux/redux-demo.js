import React from 'react';
import ReactDOM from 'react-dom';

class MyComponent extends React.Component {
  render() {
    const { text, name, onChange } = this.props;
    return (
      <div className="index">
        <p>{text}</p>
        <input defaultValue={name} onChange={onChange}/>
      </div>
    );
  }
}

import { connect } from 'react-redux';

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    text: state.text,
    name: state.name
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onChange: (e) => dispatch({
      type: 'change',
      payload: e.target.value
    })
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);

function reducer(state = {text: 'Hello Michael', name: 'An'}, action) {
  switch (action.type) {
    case 'change':
      return {
        name: action.payload,
        text: "Hello" + action.payload
      };
    default:
      return state;
  }
}


import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducer);

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);






