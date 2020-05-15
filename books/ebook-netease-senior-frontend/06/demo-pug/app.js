const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const path = require('path');

const app = new Koa();
app.use(views.apply(path.resolve(__dirname, 'template'), {
  extension: 'pug'
}));

const router = new Router();

router.get('/', async ctx => {
  await ctx.render('index', {
    title: 'Michael An page',
    list: [
      {name: 'Mike', age: 20}
    ],
  });
});

app.use(router.routes());
app.listen(3000);
