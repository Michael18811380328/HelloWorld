# JSON Server

JsonServer主要的作用就是搭建本地的数据接口，创建json文件，便于调试调用

如果我们只是get一些数据，只用借助 json placeholder（http://jsonplaceholder.typicode.com）就可以很好的实现，但是如果我们想要post一些数据，使用jsonplaceholder就有些力不从心了，所以我们今天就来聊聊怎么借助于 json-server 来搭建我们的本地的数据接口，对我们的数据进行增删改查。

json-server网址：https://www.npmjs.com/package/json-server



## Getting started

Install JSON Server

```bash
npm install -g json-server
```

Create a `db.json` file with some data

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

Start JSON Server

```bash
json-server --watch db.json
```

Now if you go to http://localhost:3000/posts/1, you'll get

```json
{ "id": 1, "title": "json-server", "author": "typicode" }
```

Also when doing requests, it's good to know that:

- If you make POST, PUT, PATCH or DELETE requests, changes will be automatically and safely saved to `db.json` using [lowdb](https://github.com/typicode/lowdb).
- Your request body JSON should be object enclosed, just like the GET output. (for example `{"name": "Foobar"}`)
- Id values are not mutable. Any `id` value in the body of your PUT or PATCH request will be ignored. Only a value set in a POST request will be respected, but only if not already taken.
- A POST, PUT or PATCH request should include a `Content-Type: application/json` header to use the JSON in the request body. Otherwise it will result in a 200 OK but without changes being made to the data.



## Routes 路由

Based on the previous `db.json` file, here are all the default routes. You can also add [other routes](https://github.com/typicode/json-server#add-custom-routes) using `--routes`. 下面是默认的路由，可以使用 --routes 增加其他的路由。

### Plural routes 多路由

```
GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1
```

### Singular routes 单路由

```
GET    /profile
POST   /profile
PUT    /profile
PATCH  /profile
```

### Filter 过滤

Use `.` to access deep properties

```
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode
```

### Paginate 分页

Use `_page` and optionally `_limit` to paginate returned data.

In the `Link` header you'll get `first`, `prev`, `next` and `last` links.

```
GET /posts?_page=7
GET /posts?_page=7&_limit=20
```

*10 items are returned by default*

### Sort 排序

Add `_sort` and `_order` (ascending order by default)

```
GET /posts?_sort=views&_order=asc
GET /posts/1/comments?_sort=votes&_order=asc
```

For multiple fields, use the following format:

```
GET /posts?_sort=user,views&_order=desc,asc
```

### Slice 获取数据切片

Add `_start` and `_end` or `_limit` (an `X-Total-Count` header is included in the response)

```
GET /posts?_start=20&_end=30
GET /posts/1/comments?_start=20&_end=30
GET /posts/1/comments?_start=20&_limit=10
```

*Works exactly as [Array.slice](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) (i.e. `_start` is inclusive and `_end` exclusive)*

### Operators 操作符

Add `_gte` or `_lte` for getting a range

```
GET /posts?views_gte=10&views_lte=20
```

Add `_ne` to exclude a value

```
GET /posts?id_ne=1
```

Add `_like` to filter (RegExp supported)

```
GET /posts?title_like=server
```

### Full-text search 全文检索

Add `q`

```
GET /posts?q=internet
```

### Relationships 父子关系

To include children resources, add `_embed`

```
GET /posts?_embed=comments
GET /posts/1?_embed=comments
```

To include parent resource, add `_expand`

```
GET /comments?_expand=post
GET /comments/1?_expand=post
```

To get or create nested resources (by default one level, [add custom routes](https://github.com/typicode/json-server#add-custom-routes) for more)

```
GET  /posts/1/comments
POST /posts/1/comments
```

### Database 数据库

```
GET /db
```

### Homepage 主页

Returns default index file or serves `./public` directory

```
GET /
```





## Extras 额外功能

### Static file server 静态文件服务器

You can use JSON Server to serve your HTML, JS and CSS, simply create a `./public` directory or use `--static` to set a different static files directory.

```bash
mkdir public
echo 'hello world' > public/index.html
json-server db.json
json-server db.json --static ./some-other-dir
```

### Alternative port 可选择的端口

You can start JSON Server on other ports with the `--port` flag:

```bash
$ json-server --watch db.json --port 3004
```

### Access from anywhere

You can access your fake API from anywhere using CORS and JSONP.

### Remote schema 远程模式

You can load remote schemas.

```bash
$ json-server http://example.com/file.json
$ json-server http://jsonplaceholder.typicode.com/db
```

### Generate random data 生成随机值

Using JS instead of a JSON file, you can create data programmatically.

```js
// index.js
module.exports = () => {
  const data = { users: [] }
  // Create 1000 users
  for (let i = 0; i < 1000; i++) {
    data.users.push({ id: i, name: `user${i}` })
  }
  return data
}

$ json-server index.js
```

**Tip** use modules like [Faker](https://github.com/Marak/faker.js), [Casual](https://github.com/boo1ean/casual), [Chance](https://github.com/victorquinn/chancejs) or [JSON Schema Faker](https://github.com/json-schema-faker/json-schema-faker).

### HTTPS 

There are many ways to set up SSL in development. One simple way is to use [hotel](https://github.com/typicode/hotel).

### Add custom routes 增加自定义路由

Create a `routes.json` file. Pay attention to start every route with `/`.

```json
{
  "/api/*": "/$1",
  "/:resource/:id/show": "/:resource/:id",
  "/posts/:category": "/posts?category=:category",
  "/articles\\?id=:id": "/posts/:id"
}
```

Start JSON Server with `--routes` option.

```
json-server db.json --routes routes.json
```

Now you can access resources using additional routes.

```
/api/posts # → /posts
/api/posts/1  # → /posts/1
/posts/1/show # → /posts/1
/posts/javascript # → /posts?category=javascript
/articles?id=1 # → /posts/1
```

### Add middlewares 中间件

You can add your middlewares from the CLI using `--middlewares` option:

```js
// hello.js
module.exports = (req, res, next) => {
  res.header('X-Hello', 'World')
  next()
}

json-server db.json --middlewares ./hello.js
json-server db.json --middlewares ./first.js ./second.js
```

### CLI usage

```bash
json-server [options] <source>

Options:
  --config, -c       Path to config file           [default: "json-server.json"]
  --port, -p         Set port                                    [default: 3000]
  --host, -H         Set host                             [default: "localhost"]
  --watch, -w        Watch file(s)                                     [boolean]
  --routes, -r       Path to routes file
  --middlewares, -m  Paths to middleware files                           [array]
  --static, -s       Set static files directory
  --read-only, --ro  Allow only GET requests                           [boolean]
  --no-cors, --nc    Disable Cross-Origin Resource Sharing             [boolean]
  --no-gzip, --ng    Disable GZIP Content-Encoding                     [boolean]
  --snapshots, -S    Set snapshots directory                      [default: "."]
  --delay, -d        Add delay to responses (ms)
  --id, -i           Set database id property (e.g. _id)         [default: "id"]
  --foreignKeySuffix, --fks  Set foreign key suffix, (e.g. _id as in post_id)
                                                                 [default: "Id"]
  --quiet, -q        Suppress log messages from output                 [boolean]
  --help, -h         Show help                                         [boolean]
  --version, -v      Show version number                               [boolean]

Examples:
  json-server db.json
  json-server file.js
  json-server http://example.com/db.json

https://github.com/typicode/json-server
```

You can also set options in a `json-server.json` configuration file.

```json
{
  "port": 3000
}
```

### Module 模块化

If you need to add authentication, validation, or **any behavior**, you can use the project as a module in combination with other Express middlewares.

#### Simple example

```js
$ npm install json-server --save-dev
// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

$ node server.js
```

The path you provide to the `jsonServer.router` function is relative to the directory from where you launch your node process. If you run the above code from another directory, it’s better to use an absolute path:

```js
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
```

For an in-memory database, simply pass an object to `jsonServer.router()`.

Please note also that `jsonServer.router()` can be used in existing Express projects.

#### Custom routes example

Let's say you want a route that echoes query parameters and another one that set a timestamp on every resource created.

```js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
```

#### Access control example

```js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use((req, res, next) => {
 if (isAuthorized(req)) { // add your authorization logic here
   next() // continue to JSON Server router
 } else {
   res.sendStatus(401)
 }
})
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
```

#### Custom output example

To modify responses, overwrite `router.render` method:

```js
// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data
  })
}
```

You can set your own status code for the response:

```js
// In this example we simulate a server side error response
router.render = (req, res) => {
  res.status(500).jsonp({
    error: "error message here"
  })
}
```

#### Rewriter example

To add rewrite rules, use `jsonServer.rewriter()`:

```js
// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}))
```

#### Mounting JSON Server on another endpoint example

Alternatively, you can also mount the router on `/api`.

```
server.use('/api', router)
```



#### API

**`jsonServer.create()`**

Returns an Express server.

**`jsonServer.defaults([options])`**

Returns middlewares used by JSON Server.

- options
  - `static` path to static files
  - `logger` enable logger middleware (default: true)
  - `bodyParser` enable body-parser middleware (default: true)
  - `noCors` disable CORS (default: false)
  - `readOnly` accept only GET requests (default: false)

**`jsonServer.router([path|object])`**

Returns JSON Server router.



参考链接

https://blog.csdn.net/lhjuejiang/article/details/81475993