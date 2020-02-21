const mongoose = require('../libs/db');
// 可选：加密
// const md5 = require('node-md5');

// 指定默认规则
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    // set(val) {
    //  return md5(val);
    // }
  }
});

// 使用规则
const User = mongoose.model('User', UserSchema);

module.exports = { User };