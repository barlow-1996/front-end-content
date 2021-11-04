const mongoose = require('mongoose')

// 获取 schema 对象
var userSchema = new mongoose.Schema({
  us: {type: String, required: true}, 
  pw: {type: String, required: true},
  age: Number,
  sex: {type: Number, default: 0},
  hobby: String
});

// 将 schema 对象转化为数据模型(model)
var User = mongoose.model('users', userSchema); 

module.exports = User;