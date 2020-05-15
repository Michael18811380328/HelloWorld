const Router = require('koa-router');
const md5 = require('md5-node');
const router = new Router();

router.get('/user', async ctx => {
  ctx.body = 'main page';
});
