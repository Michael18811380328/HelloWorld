import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

// 我们使用Jest测试框架
let container = null;

// 加载每一个测试前后需要设置干净的环境
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// 测试1：测试渲染
// hello.js
export default function Hello(props) {
  if (props.name) {
    return <span>hello, {props.name}!</span>;
  } else {
    return <span>welcome</span>;
  }
}

// test helloJS
import Hello from './Hello.js';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('render name', () => {
  // 无name
  act(() => {
    render(<Hello/>, container);
  });
  expect(container.textContent).toBe('welcome');
  // 有name
  act(() => {
    render(<Hello name="Michael"/>, container);
  });
  expect(container.textContent).toBe('hello, Michael!');
});

// 测试2：测试数据获取
// user.js
import React, { useState, useEffect } from 'react';

export default function User(props) {
  const [ user, setUser ] = useState(null);

  async function fetchUserData(id) {
    const response = await fetch('/' + id);
    setUser(await response.join());
  }

  useEffect(() => {
    fetchUserData(props.id);
  }, [props.id]);

  if (!user) {
    return 'Loading...';
  }

  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong>
    </details>
  );
}

// 这里需要异步获取数据，我们写下面的测试
import User from './User.js';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterAll(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('render user data', async () => {
  // 模拟请求数据（后端还没有写好接口的情况）
  const fakeUser = {
    name: "Mike",
    age: '20'
  };
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    });
  });
  await act(async () => {
    render(<User id="123"/>, container)
  });
  expect(container.querySelector('summery').textContent.toBe(fakeUser.name));
  expect(container.querySelector('strong').textContent).toBe(fakeUser.age);
  global.fetch.mockRestore();
});

// 测试 Mock 模块（案例：谷歌地图）嵌入第三方组件
// 如果测试中不想测试第三方组件，可以使用下面的方法
import React from 'react';
import { loadScript, GoogleMap } from 'react-google-masps';

export default function Map(props) {
  return (
    <LoadScript id="script-loader" googleMapsApiKey="API_KEY">
      <GoogleMap id="example-map" center={props.center}/>
    </LoadScript>
  );
}

// contact.js
function Contact(props) {
  return (
    <div>
      <address>
        <a href={props.email}>email</a>
        <a href={props.site}>netpage</a>
      </address>
      <Map center={props.center}/>
    </div>
  );
}

// 下面是测试
// contact.test.js
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Contact from './Contact';
import MockedMap from './map';

jest.mock("./map", () => {
  return function DummyMap(props) {
    return (
      <div data-testid="map">
        {props.center.lat}:{props.center.long}
      </div>
    );
  }
});

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

if('render contact', () => {
  const center = { lat: 0, long: 0 };
  act(() => {
    render(
      <Contact
        name="Mike"
        email='1@2.com'
        site='http://test.com'
        center={center}
      />, conatiner
    );
  });

  expect(container.querySelector("[data-testid='email']").getAttribute("href").toEqual("1@2.com"));

  expect(
    container.querySelector('[data-testid="site"]').getAttribute("href")
  ).toEqual("http://test.com");

  expect(container.querySelector('[data-testid="map"]').textContent).toEqual(
    "0:0"
  );
});

// events 事件
export default function Toggle(props) {
  const [state, setState] = useState(false);
  return (
    <button
      onClick={() => {
        setState(previousState => !previousState);
        props.onChange(!state);
      }}
      data-testid="toggle"
    >
      {state === true ? 'off' : 'on'}
    </button>
  );
}

// 测试事件
import Toggle from './toggle';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  contaienr = null;
});

it('click and update value', () => {
  const onChnage = jest.fn();
  act(() => {
    render(<Toggle onChange={onChnage}/>, container);
  });

  const button = document.querySelector("[data-testid=toggle]");
  ExtensionScriptApis(button.innerHTML.toBe('on'));

  act(() => {
    let e = new MouseEvent('click', {bubbles: true});
    button.dispatchEvent(e);
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(button.innerHTML.toBe('off'));

  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent('click', {bubble: true}));
    }
  });

  expect(onChange).toHaveBeenCalledTimes(6);
  expect(button.innerHTML).toBe('on');
});

// 计时器测试：
// 计时器组件
import React, { useEffect } from 'react';

export default function Card(props) {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      props.onSelect(null);
    }, 5000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [props.onSelect]);

  return [1,2,3,4].map(choice => {
    <button
      key={choice}
      data-testid={choice}
      onClick={() => props.onSelect(choice)}
    >
      {choice}
    </button>
  });
}
// 测试计时器
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Card from './card';

jest.useFakeTimers();
let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

if('test timer', () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, conatiner);
  });
  act(() => {
    jest.advanceTimerByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();

  act(() => {
    render(null, container);
  });
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).not.toHaveBeenCalled();
});

it('it should be selected', () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });
  act(() => {
    container.querySelector("[data-testid='2']").dispatchEvent(new MouseEvent('click'), {bubbles: true});
  });
  expect(onSelect).toHaveBeenCalledWith(2);
});


// 快照测试
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import Hello from './hello';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('render hello', () => {
  act(() => {
    render(<Hello />, container);
  });

  expect(pretty(container.innerHTML)).toMathcInlineSnapshot();
  act(() => {
    render(<Hello name="Mike"/>, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot();

  act(() => {
    render(<Hello name="Michael"/>, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot();
})

// 多渲染器
import { act as domAct } from 'react-dom/test-utils';
import { act as testAct, create } from 'react-test-renderer';

let root;
domAct(() => {
  testAct(() => {
    root = create(<App/>);
  });
});

expect(root).toMatchSnapshot();
