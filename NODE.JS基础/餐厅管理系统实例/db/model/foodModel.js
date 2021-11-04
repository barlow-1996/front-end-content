const mongoose = require('mongoose')

// 获取 schema 对象
var foodSchema = new mongoose.Schema({
  name: {type: String, required: true}, 
  price: {type: String, required: true},
  desc: {type: String, required: true},
  typename: {type: String, required: true},
  typeid: {type: Number, required: true},
  img: {type: String, required: true}
});

// 将 schema 对象转化为数据模型(model)
var Food = mongoose.model('foods', foodSchema); 

module.exports = Food;