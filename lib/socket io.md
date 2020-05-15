# socket io 

## How to use

A standalone build of `socket.io-client` is exposed automatically by the socket.io server as `/socket.io/socket.io.js`. Alternatively you can serve the file `socket.io.js` found in the `dist` folder.

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io('http://localhost');
  socket.on('connect', function(){});
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
</script>
```

JS

~~~js
// with ES6 import
import io from 'socket.io-client';
const socket = io('http://localhost');
~~~

Socket.IO is compatible with [browserify](http://browserify.org/) and [webpack](https://webpack.js.org/) (see example [there](https://github.com/socketio/socket.io/tree/2.0.3/examples/webpack-build)).

### Node.JS (server-side usage)

Add `socket.io-client` to your `package.json` and then:

```js
var socket = require('socket.io-client')('http://localhost');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
```

## API

### Table of Contents

- IO
  - [io.protocol](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#ioprotocol)
  - io([url][, options])
    - Initialization examples
      - [With multiplexing](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#with-multiplexing)
      - [With custom path](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#with-custom-path)
      - [With query parameters](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#with-query-parameters)
      - [With query option](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#with-query-option)
      - [With extraHeaders](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#with-extraheaders)
      - [With websocket transport only](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#with-websocket-transport-only)
      - [With a custom parser](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#with-a-custom-parser)
  - Class: io.Manager
    - [new Manager(url[, options\])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#new-managerurl-options)
    - [manager.reconnection([value\])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#managerreconnectionvalue)
    - [manager.reconnectionAttempts([value\])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#managerreconnectionattemptsvalue)
    - [manager.reconnectionDelay([value\])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#managerreconnectiondelayvalue)
    - [manager.reconnectionDelayMax([value\])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#managerreconnectiondelaymaxvalue)
    - [manager.timeout([value\])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#managertimeoutvalue)
    - [manager.open([callback\])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#manageropencallback)
    - [manager.connect([callback\])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#managerconnectcallback)
    - [manager.socket(nsp, options)](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#managersocketnsp-options)
    - [Event: 'connect_error'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-connect_error)
    - [Event: 'connect_timeout'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-connect_timeout)
    - [Event: 'reconnect'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-reconnect)
    - [Event: 'reconnect_attempt'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-reconnect_attempt)
    - [Event: 'reconnecting'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-reconnecting)
    - [Event: 'reconnect_error'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-reconnect_error)
    - [Event: 'reconnect_failed'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-reconnect_failed)
    - [Event: 'ping'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-ping)
    - [Event: 'pong'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-pong)
  - Class: io.Socket
    - [socket.id](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketid)
    - [socket.connected](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketconnected)
    - [socket.disconnected](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketdisconnected)
    - [socket.open()](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketopen)
    - [socket.connect()](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketconnect)
    - [socket.send([...args\][, ack])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketsendargs-ack)
    - [socket.emit(eventName[, ...args\][, ack])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketemiteventname-args-ack)
    - [socket.on(eventName, callback)](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketoneventname-callback)
    - [socket.compress(value)](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketcompressvalue)
    - [socket.binary(value)](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketbinaryvalue)
    - [socket.close()](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketclose)
    - [socket.disconnect()](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketdisconnect)
    - [Event: 'connect'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-connect)
    - [Event: 'connect_error'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-connect_error-1)
    - [Event: 'connect_timeout'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-connect_timeout-1)
    - [Event: 'error'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-error)
    - [Event: 'disconnect'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-disconnect)
    - [Event: 'reconnect'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-reconnect-1)
    - [Event: 'reconnect_attempt'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-reconnect_attempt-1)
    - [Event: 'reconnecting'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-reconnecting-1)
    - [Event: 'reconnect_error'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-reconnect_error-1)
    - [Event: 'reconnect_failed'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-reconnect_failed-1)
    - [Event: 'ping'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-ping-1)
    - [Event: 'pong'](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-pong-1)

### IO

Exposed as the `io` namespace in the standalone build, or the result of calling `require('socket.io-client')`.

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io('http://localhost');
</script>
```

~~~js
const io = require('socket.io-client');
// or with import syntax
import io from 'socket.io-client';
~~~

#### io.protocol

- *(Number)*

The protocol revision number.

#### io([url][, options])

- `url` *(String)* (defaults to `window.location`)

- ```
  options
  ```

   

  (Object)

  - `forceNew` *(Boolean)* whether to reuse an existing connection

- **Returns** `Socket`

Creates a new `Manager` for the given URL, and attempts to reuse an existing `Manager` for subsequent calls, unless the `multiplex` option is passed with `false`. Passing this option is the equivalent of passing `'force new connection': true` or `forceNew: true`.

A new `Socket` instance is returned for the namespace specified by the pathname in the URL, defaulting to `/`. For example, if the `url` is `http://localhost/users`, a transport connection will be established to `http://localhost` and a Socket.IO connection will be established to `/users`.

Query parameters can also be provided, either with the `query` option or directly in the url (example: `http://localhost/users?token=abc`).

See [new Manager(url[, options\])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#new-managerurl-options) for available `options`.

#### Initialization examples

##### With multiplexing

By default, a single connection is used when connecting to different namespaces (to minimize resources):

```js
const socket = io();
const adminSocket = io('/admin');
// a single connection will be established
```

That behaviour can be disabled with the `forceNew` option:

```
const socket = io();
const adminSocket = io('/admin', { forceNew: true });
// will create two distinct connections
```

Note: reusing the same namespace will also create two connections

```
const socket = io();
const socket2 = io();
// will also create two distinct connections
```

##### With custom `path`

```
const socket = io('http://localhost', {
  path: '/myownpath'
});

// server-side
const io = require('socket.io')({
  path: '/myownpath'
});
```

The request URLs will look like: `localhost/myownpath/?EIO=3&transport=polling&sid=`

```
const socket = io('http://localhost/admin', {
  path: '/mypath'
});
```

Here, the socket connects to the `admin` namespace, with the custom path `mypath`.

The request URLs will look like: `localhost/mypath/?EIO=3&transport=polling&sid=` (the namespace is sent as part of the payload).

##### With query parameters

```js
const socket = io('http://localhost?token=abc');

// server-side
const io = require('socket.io')();

// middleware
io.use((socket, next) => {
  let token = socket.handshake.query.token;
  if (isValid(token)) {
    return next();
  }
  return next(new Error('authentication error'));
});

// then
io.on('connection', (socket) => {
  let token = socket.handshake.query.token;
  // ...
});
```

##### With query option

```
const socket = io({
  query: {
    token: 'cde'
  }
});
```

The query content can also be updated on reconnection:

```
socket.on('reconnect_attempt', () => {
  socket.io.opts.query = {
    token: 'fgh'
  }
});
```

##### With `extraHeaders`

This only works if `polling` transport is enabled (which is the default). Custom headers will not be appended when using `websocket` as the transport. This happens because the WebSocket handshake does not honor custom headers. (For background see the [WebSocket protocol RFC](https://tools.ietf.org/html/rfc6455#section-4))

```
const socket = io({
  transportOptions: {
    polling: {
      extraHeaders: {
        'x-clientid': 'abc'
      }
    }
  }
});

// server-side
const io = require('socket.io')();

// middleware
io.use((socket, next) => {
  let clientId = socket.handshake.headers['x-clientid'];
  if (isValid(clientId)) {
    return next();
  }
  return next(new Error('authentication error'));
});
```

##### With `websocket` transport only

By default, a long-polling connection is established first, then upgraded to "better" transports (like WebSocket). If you like to live dangerously, this part can be skipped:

```
const socket = io({
  transports: ['websocket']
});

// on reconnection, reset the transports option, as the Websocket
// connection may have failed (caused by proxy, firewall, browser, ...)
socket.on('reconnect_attempt', () => {
  socket.io.opts.transports = ['polling', 'websocket'];
});
```

##### With a custom parser

The default [parser](https://github.com/socketio/socket.io-parser) promotes compatibility (support for `Blob`, `File`, binary check) at the expense of performance. A custom parser can be provided to match the needs of your application. Please see the example [here](https://github.com/socketio/socket.io/tree/master/examples/custom-parsers).

```
const parser = require('socket.io-msgpack-parser'); // or require('socket.io-json-parser')
const socket = io({
  parser: parser
});

// the server-side must have the same parser, to be able to communicate
const io = require('socket.io')({
  parser: parser
});
```

### Manager

#### new Manager(url[, options])

- `url` *(String)*

- ```
  options
  ```

   

  (Object)

  - `path` *(String)* name of the path that is captured on the server side (`/socket.io`)
  - `reconnection` *(Boolean)* whether to reconnect automatically (`true`)
  - `reconnectionAttempts` *(Number)* number of reconnection attempts before giving up (`Infinity`)
  - `reconnectionDelay` *(Number)* how long to initially wait before attempting a new reconnection (`1000`). Affected by +/- `randomizationFactor`, for example the default initial delay will be between 500 to 1500ms.
  - `reconnectionDelayMax` *(Number)* maximum amount of time to wait between reconnections (`5000`). Each attempt increases the reconnection delay by 2x along with a randomization as above
  - `randomizationFactor` *(Number)* (`0.5`), 0 <= randomizationFactor <= 1
  - `timeout` *(Number)* connection timeout before a `connect_error` and `connect_timeout` events are emitted (`20000`)
  - `autoConnect` *(Boolean)* by setting this false, you have to call `manager.open` whenever you decide it's appropriate
  - `query` *(Object)*: additional query parameters that are sent when connecting a namespace (then found in `socket.handshake.query` object on the server-side)
  - `parser` *(Parser)*: the parser to use. Defaults to an instance of the `Parser` that ships with socket.io. See [socket.io-parser](https://github.com/socketio/socket.io-parser).

- **Returns** `Manager`

The `options` are also passed to `engine.io-client` upon initialization of the underlying `Socket`. See the available `options` [here](https://github.com/socketio/engine.io-client#methods).

#### manager.reconnection([value])

- `value` *(Boolean)*
- **Returns** `Manager|Boolean`

Sets the `reconnection` option, or returns it if no parameters are passed.

#### manager.reconnectionAttempts([value])

- `value` *(Number)*
- **Returns** `Manager|Number`

Sets the `reconnectionAttempts` option, or returns it if no parameters are passed.

#### manager.reconnectionDelay([value])

- `value` *(Number)*
- **Returns** `Manager|Number`

Sets the `reconnectionDelay` option, or returns it if no parameters are passed.

#### manager.reconnectionDelayMax([value])

- `value` *(Number)*
- **Returns** `Manager|Number`

Sets the `reconnectionDelayMax` option, or returns it if no parameters are passed.

#### manager.timeout([value])

- `value` *(Number)*
- **Returns** `Manager|Number`

Sets the `timeout` option, or returns it if no parameters are passed.

#### manager.open([callback])

- `callback` *(Function)*
- **Returns** `Manager`

If the manager was initiated with `autoConnect` to `false`, launch a new connection attempt.

The `callback` argument is optional and will be called once the attempt fails/succeeds.

#### manager.connect([callback])

Synonym of [manager.open([callback\])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#manageropencallback).

#### manager.socket(nsp, options)

- `nsp` *(String)*
- `options` *(Object)*
- **Returns** `Socket`

Creates a new `Socket` for the given namespace.

#### Event: 'connect_error'

- `error` *(Object)* error object

Fired upon a connection error.

#### Event: 'connect_timeout'

Fired upon a connection timeout.

#### Event: 'reconnect'

- `attempt` *(Number)* reconnection attempt number

Fired upon a successful reconnection.

#### Event: 'reconnect_attempt'

Fired upon an attempt to reconnect.

#### Event: 'reconnecting'

- `attempt` *(Number)* reconnection attempt number

Fired upon a successful reconnection.

#### Event: 'reconnect_error'

- `error` *(Object)* error object

Fired upon a reconnection attempt error.

#### Event: 'reconnect_failed'

Fired when couldn't reconnect within `reconnectionAttempts`.

#### Event: 'ping'

Fired when a ping packet is written out to the server.

#### Event: 'pong'

- `ms` *(Number)* number of ms elapsed since `ping` packet (i.e.: latency).

Fired when a pong is received from the server.

### Socket

#### socket.id

- *(String)*

An unique identifier for the socket session. Set after the `connect` event is triggered, and updated after the `reconnect` event.

```
const socket = io('http://localhost');

console.log(socket.id); // undefined

socket.on('connect', () => {
  console.log(socket.id); // 'G5p5...'
});
```

#### socket.connected

- *(Boolean)*

Whether or not the socket is connected to the server.

```
const socket = io('http://localhost');

socket.on('connect', () => {
  console.log(socket.connected); // true
});
```

#### socket.disconnected

- *(Boolean)*

Whether or not the socket is disconnected from the server.

```
const socket = io('http://localhost');

socket.on('connect', () => {
  console.log(socket.disconnected); // false
});
```

#### socket.open()

- **Returns** `Socket`

Manually opens the socket.

```
const socket = io({
  autoConnect: false
});

// ...
socket.open();
```

It can also be used to manually reconnect:

```
socket.on('disconnect', () => {
  socket.open();
});
```

#### socket.connect()

Synonym of [socket.open()](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketopen).

#### socket.send([...args][, ack])

- `args`
- `ack` *(Function)*
- **Returns** `Socket`

Sends a `message` event. See [socket.emit(eventName[, ...args\][, ack])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketemiteventname-args-ack).

#### socket.emit(eventName[, ...args][, ack])

- `eventName` *(String)*
- `args`
- `ack` *(Function)*
- **Returns** `Socket`

Emits an event to the socket identified by the string name. Any other parameters can be included. All serializable datastructures are supported, including `Buffer`.

```
socket.emit('hello', 'world');
socket.emit('with-binary', 1, '2', { 3: '4', 5: new Buffer(6) });
```

The `ack` argument is optional and will be called with the server answer.

```
socket.emit('ferret', 'tobi', (data) => {
  console.log(data); // data will be 'woot'
});

// server:
//  io.on('connection', (socket) => {
//    socket.on('ferret', (name, fn) => {
//      fn('woot');
//    });
//  });
```

#### socket.on(eventName, callback)

- `eventName` *(String)*
- `callback` *(Function)*
- **Returns** `Socket`

Register a new handler for the given event.

```
socket.on('news', (data) => {
  console.log(data);
});

// with multiple arguments
socket.on('news', (arg1, arg2, arg3, arg4) => {
  // ...
});
// with callback
socket.on('news', (cb) => {
  cb(0);
});
```

The socket actually inherits every method of the [Emitter](https://github.com/component/emitter) class, like `hasListeners`, `once` or `off` (to remove an event listener).

#### socket.compress(value)

- `value` *(Boolean)*
- **Returns** `Socket`

Sets a modifier for a subsequent event emission that the event data will only be *compressed* if the value is `true`. Defaults to `true` when you don't call the method.

```
socket.compress(false).emit('an event', { some: 'data' });
```

#### socket.binary(value)

Specifies whether the emitted data contains binary. Increases performance when specified. Can be `true` or `false`.

```
socket.binary(false).emit('an event', { some: 'data' });
```

#### socket.close()

- **Returns** `Socket`

Disconnects the socket manually.

#### socket.disconnect()

Synonym of [socket.close()](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socketclose).

#### Event: 'connect'

Fired upon a connection including a successful reconnection.

```
socket.on('connect', () => {
  // ...
});

// note: you should register event handlers outside of connect,
// so they are not registered again on reconnection
socket.on('myevent', () => {
  // ...
});
```

#### Event: 'connect_error'

- `error` *(Object)* error object

Fired upon a connection error.

```
socket.on('connect_error', (error) => {
  // ...
});
```

#### Event: 'connect_timeout'

Fired upon a connection timeout.

```
socket.on('connect_timeout', (timeout) => {
  // ...
});
```

#### Event: 'error'

- `error` *(Object)* error object

Fired when an error occurs.

```
socket.on('error', (error) => {
  // ...
});
```

#### Event: 'disconnect'

- `reason` *(String)* either 'io server disconnect' or 'io client disconnect'

Fired upon a disconnection.

```
socket.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
  // else the socket will automatically try to reconnect
});
```

#### Event: 'reconnect'

- `attempt` *(Number)* reconnection attempt number

Fired upon a successful reconnection.

```
socket.on('reconnect', (attemptNumber) => {
  // ...
});
```

#### Event: 'reconnect_attempt'

- `attempt` *(Number)* reconnection attempt number

Fired upon an attempt to reconnect.

```
socket.on('reconnect_attempt', (attemptNumber) => {
  // ...
});
```

#### Event: 'reconnecting'

- `attempt` *(Number)* reconnection attempt number

Fired upon an attempt to reconnect.

```
socket.on('reconnecting', (attemptNumber) => {
  // ...
});
```

#### Event: 'reconnect_error'

- `error` *(Object)* error object

Fired upon a reconnection attempt error.

```
socket.on('reconnect_error', (error) => {
  // ...
});
```

#### Event: 'reconnect_failed'

Fired when couldn't reconnect within `reconnectionAttempts`.

```
socket.on('reconnect_failed', () => {
  // ...
});
```

#### Event: 'ping'

Fired when a ping packet is written out to the server.

```
socket.on('ping', () => {
  // ...
});
```

#### Event: 'pong'

- `ms` *(Number)* number of ms elapsed since `ping` packet (i.e.: latency).

Fired when a pong is received from the server.

```
socket.on('pong', (latency) => {
  // ...
});
```

