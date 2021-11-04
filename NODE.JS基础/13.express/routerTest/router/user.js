var express = require('express');
var user = express.Router(); // 获取路由的实例

// define the home page route
user.get('/add', (req, res) => {
  res.send('user add ok')
});
// define the about route
user.get('/del', (req, res) => {
  res.send('user del ok')
});

module.exports = user;