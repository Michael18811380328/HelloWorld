const Koa = require('koa');
const Router = require('koa-router');
const users = require('./routers/user');
const body = require('koa-bodyparser');
const error = require('./middleware/error');
const app = new Koa();
app.use(error);
app.use(body());

const router = new Rouoter();

router.get('/', ctx => {
  ctx.body = 'main page';
});

app.use(router.routes());
app.use(users.routes(), user.allowedMethods());
app.listen(3000, () => {
  console.log('listen http://localhost:3000');
});
