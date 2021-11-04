const express = require('express')
const food = express.Router() // 获取路由的实例

// define the home page route
food.get('/add', (req, res) => {
  res.send('food add ok')
})
// define the about route
food.get('/del', (req, res) => {
  res.send('food del ok')
})

module.exports = food;