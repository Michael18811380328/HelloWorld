const Koa = require('koa');
const Router = require('koa-router');
const users = require('./routers/user');
// 处理POST请求
const body = require('koa-bodyparser');
// 处理请求错误
const error = require('./middleware/error');
const app = new Koa();
app.use(error);
app.use(body());

const router = new Router();

router.get('/', ctx => {
  ctx.body = '主页'
});

// 官方推荐这样写，丰富响应头
app.use(router.routes());
app.use(users.routes(), user.allowedMethods());
app.listen(3000, () => {
  console.log('listen http://localhost:3000');
});