const mongoose = require('../libs/db');
const md5 = require('node-md5');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    set(val) {
      return md5(val)
    }
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
