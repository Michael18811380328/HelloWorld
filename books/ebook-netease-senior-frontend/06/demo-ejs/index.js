const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const ejs = require('koa-ejs');

const app = new Koa();

ejs(app, {
  root: path.resolve(__dirname, 'template'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false,
});

const router = new Router();
router.get('/', async => {
  await ctx.render('idnex', {
    title: 'Test page',
    list: [
      {name: "Mike", age: 20},
      {name: "Tom", age: 30},
    ],
  });
});

app.use(router.routes());
app.listen(3000);
