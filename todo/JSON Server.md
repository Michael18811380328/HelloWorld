# JSON Server [![img](https://camo.githubusercontent.com/a421588394ea9e0ecb32748b17b5bc7a2b37ce81/68747470733a2f2f7472617669732d63692e6f72672f74797069636f64652f6a736f6e2d7365727665722e7376673f6272616e63683d6d6173746572)](https://travis-ci.org/typicode/json-server) [![img](https://camo.githubusercontent.com/b9bd2e485334a23113018992d4413a9e40171fa3/68747470733a2f2f62616467652e667572792e696f2f6a732f6a736f6e2d7365727665722e737667)](http://badge.fury.io/js/json-server)

Get a full fake REST API with **zero coding** in **less than 30 seconds** (seriously)

Created with <3 for front-end developers who need a quick back-end for prototyping and mocking.

- [Egghead.io free video tutorial - Creating demo APIs with json-server](https://egghead.io/lessons/nodejs-creating-demo-apis-with-json-server)
- [JSONPlaceholder - Live running version](https://jsonplaceholder.typicode.com/)
- [**My JSON Server** - no installation required, use your own data](https://my-json-server.typicode.com/)

See also:

- 🐶 [husky - Git hooks made easy](https://github.com/typicode/husky)
- 🏨 [hotel - developer tool with local .localhost domain and https out of the box](https://github.com/typicode/hotel)

 

## Gold sponsors 🥇

 

[![img](https://camo.githubusercontent.com/76c198997f6de91632941ca350fbb3ce4707c3d4/68747470733a2f2f692e696d6775722e636f6d2f4942497441546e2e706e67)](https://tryretool.com/?utm_source=sponsor&utm_campaign=typicode)

 

## Bronze sponsors 🥉

 

[![img](https://camo.githubusercontent.com/62a5546453d7ea199b2fac28f99ebc4aa8dda3c5/68747470733a2f2f692e696d6775722e636f6d2f336d4a475441512e706e67)](https://www.zinggrid.com/hello/json-server?utm_source=jsonserver&utm_medium=github&utm_campaign=sponsorship)

 

[Become a sponsor and have your company logo here](https://github.com/users/typicode/sponsorship)

## Table of contents

- [Getting started](https://github.com/typicode/json-server#getting-started)
- Routes
  - [Plural routes](https://github.com/typicode/json-server#plural-routes)
  - [Singular routes](https://github.com/typicode/json-server#singular-routes)
  - [Filter](https://github.com/typicode/json-server#filter)
  - [Paginate](https://github.com/typicode/json-server#paginate)
  - [Sort](https://github.com/typicode/json-server#sort)
  - [Slice](https://github.com/typicode/json-server#slice)
  - [Operators](https://github.com/typicode/json-server#operators)
  - [Full-text search](https://github.com/typicode/json-server#full-text-search)
  - [Relationships](https://github.com/typicode/json-server#relationships)
  - [Database](https://github.com/typicode/json-server#database)
  - [Homepage](https://github.com/typicode/json-server#homepage)
- Extras
  - [Static file server](https://github.com/typicode/json-server#static-file-server)
  - [Alternative port](https://github.com/typicode/json-server#alternative-port)
  - [Access from anywhere](https://github.com/typicode/json-server#access-from-anywhere)
  - [Remote schema](https://github.com/typicode/json-server#remote-schema)
  - [Generate random data](https://github.com/typicode/json-server#generate-random-data)
  - [HTTPS](https://github.com/typicode/json-server#https)
  - [Add custom routes](https://github.com/typicode/json-server#add-custom-routes)
  - [Add middlewares](https://github.com/typicode/json-server#add-middlewares)
  - [CLI usage](https://github.com/typicode/json-server#cli-usage)
  - Module
    - [Simple example](https://github.com/typicode/json-server#simple-example)
    - [Custom routes example](https://github.com/typicode/json-server#custom-routes-example)
    - [Access control example](https://github.com/typicode/json-server#access-control-example)
    - [Custom output example](https://github.com/typicode/json-server#custom-output-example)
    - [Rewriter example](https://github.com/typicode/json-server#rewriter-example)
    - [Mounting JSON Server on another endpoint example](https://github.com/typicode/json-server#mounting-json-server-on-another-endpoint-example)
    - [API](https://github.com/typicode/json-server#api)
  - [Deployment](https://github.com/typicode/json-server#deployment)
- Links
  - [Video](https://github.com/typicode/json-server#video)
  - [Articles](https://github.com/typicode/json-server#articles)
  - [Third-party tools](https://github.com/typicode/json-server#third-party-tools)
- [License](https://github.com/typicode/json-server#license)

## Getting started

Install JSON Server

```
npm install -g json-server
```

Create a `db.json` file with some data

```
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

```
json-server --watch db.json
```

Now if you go to http://localhost:3000/posts/1, you'll get

```
{ "id": 1, "title": "json-server", "author": "typicode" }
```

Also when doing requests, it's good to know that:

- If you make POST, PUT, PATCH or DELETE requests, changes will be automatically and safely saved to `db.json` using [lowdb](https://github.com/typicode/lowdb).
- Your request body JSON should be object enclosed, just like the GET output. (for example `{"name": "Foobar"}`)
- Id values are not mutable. Any `id` value in the body of your PUT or PATCH request will be ignored. Only a value set in a POST request will be respected, but only if not already taken.
- A POST, PUT or PATCH request should include a `Content-Type: application/json` header to use the JSON in the request body. Otherwise it will result in a 200 OK but without changes being made to the data.

## Routes

Based on the previous `db.json` file, here are all the default routes. You can also add [other routes](https://github.com/typicode/json-server#add-custom-routes) using `--routes`.

### Plural routes

```
GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1
```

### Singular routes

```
GET    /profile
POST   /profile
PUT    /profile
PATCH  /profile
```

### Filter

Use `.` to access deep properties

```
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode
```

### Paginate

Use `_page` and optionally `_limit` to paginate returned data.

In the `Link` header you'll get `first`, `prev`, `next` and `last` links.

```
GET /posts?_page=7
GET /posts?_page=7&_limit=20
```

*10 items are returned by default*

### Sort

Add `_sort` and `_order` (ascending order by default)

```
GET /posts?_sort=views&_order=asc
GET /posts/1/comments?_sort=votes&_order=asc
```

For multiple fields, use the following format:

```
GET /posts?_sort=user,views&_order=desc,asc
```

### Slice

Add `_start` and `_end` or `_limit` (an `X-Total-Count` header is included in the response)

```
GET /posts?_start=20&_end=30
GET /posts/1/comments?_start=20&_end=30
GET /posts/1/comments?_start=20&_limit=10
```

*Works exactly as [Array.slice](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) (i.e. `_start` is inclusive and `_end` exclusive)*

### Operators

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

### Full-text search

Add `q`

```
GET /posts?q=internet
```

### Relationships

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

### Database

```
GET /db
```

### Homepage

Returns default index file or serves `./public` directory

```
GET /
```

## Extras

### Static file server

You can use JSON Server to serve your HTML, JS and CSS, simply create a `./public` directory or use `--static` to set a different static files directory.

```
mkdir public
echo 'hello world' > public/index.html
json-server db.json
json-server db.json --static ./some-other-dir
```

### Alternative port

You can start JSON Server on other ports with the `--port` flag:

```
$ json-server --watch db.json --port 3004
```

### Access from anywhere

You can access your fake API from anywhere using CORS and JSONP.

### Remote schema

You can load remote schemas.

```
$ json-server http://example.com/file.json
$ json-server http://jsonplaceholder.typicode.com/db
```

### Generate random data

Using JS instead of a JSON file, you can create data programmatically.

```
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

### Add custom routes

Create a `routes.json` file. Pay attention to start every route with `/`.

```
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

### Add middlewares

You can add your middlewares from the CLI using `--middlewares` option:

```
// hello.js
module.exports = (req, res, next) => {
  res.header('X-Hello', 'World')
  next()
}
json-server db.json --middlewares ./hello.js
json-server db.json --middlewares ./first.js ./second.js
```

### CLI usage

```
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

```
{
  "port": 3000
}
```

### Module

If you need to add authentication, validation, or **any behavior**, you can use the project as a module in combination with other Express middlewares.

#### Simple example

```
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

```
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
```

For an in-memory database, simply pass an object to `jsonServer.router()`.

Please note also that `jsonServer.router()` can be used in existing Express projects.

#### Custom routes example

Let's say you want a route that echoes query parameters and another one that set a timestamp on every resource created.

```
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

```
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

```
// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data
  })
}
```

You can set your own status code for the response:

```
// In this example we simulate a server side error response
router.render = (req, res) => {
  res.status(500).jsonp({
    error: "error message here"
  })
}
```

#### Rewriter example

To add rewrite rules, use `jsonServer.rewriter()`:

```
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

### Deployment

You can deploy JSON Server. For example, [JSONPlaceholder](http://jsonplaceholder.typicode.com/) is an online fake API powered by JSON Server and running on Heroku.

## Links

### Video

- [Creating Demo APIs with json-server on egghead.io](https://egghead.io/lessons/nodejs-creating-demo-apis-with-json-server)

### Articles

- [Node Module Of The Week - json-server](http://nmotw.in/json-server/)
- [Mock up your REST API with JSON Server](http://www.betterpixels.co.uk/projects/2015/05/09/mock-up-your-rest-api-with-json-server/)
- [ng-admin: Add an AngularJS admin GUI to any RESTful API](http://marmelab.com/blog/2014/09/15/easy-backend-for-your-restful-api.html)
- [Fast prototyping using Restangular and Json-server](https://glebbahmutov.com/blog/fast-prototyping-restangular-and-json-server/)
- [Create a Mock REST API in Seconds for Prototyping your Frontend](https://coligo.io/create-mock-rest-api-with-json-server/)
- [No API? No Problem! Rapid Development via Mock APIs](https://medium.com/@housecor/rapid-development-via-mock-apis-e559087be066#.93d7w8oro)
- [Zero Code REST With json-server](https://dzone.com/articles/zero-code-rest-with-json-server)

### Third-party tools

- [Grunt JSON Server](https://github.com/tfiwm/grunt-json-server)
- [Docker JSON Server](https://github.com/clue/docker-json-server)
- [JSON Server GUI](https://github.com/naholyr/json-server-gui)
- [JSON file generator](https://github.com/dfsq/json-server-init)
- [JSON Server extension](https://github.com/maty21/json-server-extension)

## License

MIT

[Supporters](https://thanks.typicode.com/) ✨