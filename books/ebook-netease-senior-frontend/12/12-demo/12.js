// app.js
const Koa = require('koa');
const Router = require('koa-router');
const users = require('./routers/users');
const body = require('koa-bodyparser');
const error = require('./middleware/error');

const app = new Koa();
app.use(error);
app.use(body());

const router = new Router();
router.get('/', ctx => {
  ctx.body = 'main page';
});

app.use(router.routes());
app.use(users.routes(), user.allowedMethods());
app.linten(3000, () => {
  console.log('listen at http://localhost:3000');
});

// routers/users.js
const Router = require('koa-router');
const router = new Router();
const { User } = require('../models/user');
router.prefix('/api/user');

router.get('/', ctx => {
  ctx.body = '用户主页';
});
router.get('/index', async ctx => {
  ctx.body = await User.find();
});

router.post('./register', async ctx => {
  const { username, password } = ctx.request.body;
  const user = await User.create({
    username,
    password,
  });
});

router.post('./login', async ctx => {
  const { username, password } = ctx.request.body;
  const user = await User.findOne({
    username,
    password
  });
  if (!user) {
    return ctx.body = {
      status: 400,
      message: 'Uset is not valid',
    };
  }
  if (user) {
    return ctx.body = {
      status: 200,
      message: 'login success',
    };
  }
});

module.exports = router;

// /models/users
const mongoose = require('../libs/db');
const md5 = require('node-md5');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    set(val) {
      return md5(val);
    }
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = { User };

// /libs/db.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5
});

module.exports = mongoose;

// middleware/error
const error = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = {
      message: 'server is error',
      error: error.message,
    };
  }
}
