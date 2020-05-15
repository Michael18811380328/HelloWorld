const mongoose = require('mongoose');

// 27017 是默认的端口号;下面是配置
mongoose.connect('mongodb://localhost:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5
});

module.exports = mongoose;