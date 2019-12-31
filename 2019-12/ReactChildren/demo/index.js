import * as React from 'react';
import * as ReactDOM from 'react-dom';

function Step({index, currentStep}) {
  return (
    <div className={`{currentStep >= index + 1 ? 'active' : ''}`}></div>
  );
}

function Steps({currentStep, children}) {
  return (
    <div>
      {
        React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            index: index,
            currentStep: currentStep,
          });
        })
      }
    </div>
  );
}

function App() {
  return (
    <div>
      <Steps currentStep={1}>
        <Step/>
        <Step/>
        <Step/>
      </Steps>
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));
