const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const ejs = require('koa-ejs');

const app = new Koa();
ejs(app, {
  // 把相对路径转换成绝对路径
  root: path.resolve(__dirname, 'template'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false,
});

const router = new Router();
router.get('/', async (ctx) => {
  // ctx.body = '主页';
  await ctx.render('index', {
    title: 'Michael test ejs page',
    list: [
      {name: 'Mike', age: 20},
      {name: 'Judy', age: 30},
    ],
  });
});

app.use(router.routes());
app.listen(3000);