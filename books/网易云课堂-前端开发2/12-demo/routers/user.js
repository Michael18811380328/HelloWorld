const Router = require('koa-router');
const router = new Router();
const { User } = require('../models/user');

router.prefix('/api/user');

router.get('/', ctx => {
  ctx.body = '用户主页'
});

// 查询用户
router.get('/index', async ctx => {
  ctx.body = await User.find();
});

// 注册
router.post('./register', async ctx => {
  const { username, password } = ctx.request.body;
  const user = await User.create({
    username,
    password
  });
});

// 登录
router.post('./login', async ctx => {
  // ctx.body = 'login page';
  const { username, password } = ctx.request.body;
  const user = await User.findOne({
    username,
    password
  });
  if (!user) {
    return ctx.body = {
      status: 400,
      message: 'User is not valid'
    }
  }
  if (user) {
    return ctx.body = {
      status: 200,
      message: 'login success'
    };
  }
})

module.exports = router;