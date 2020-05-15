const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
app.context.db = require('.database.js');
app.context.config = require('./config.js');

app.use(body());
router.user('/api', require('./router.js'));

app.use(router.toutes());
app.listen(3000);
