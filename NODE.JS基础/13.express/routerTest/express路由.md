# express 路由

## 构建基础路由

```javascript
const express = require('express');
// 创建路由对象
const router = express.Router();
// 将路由和请求路径进行匹配
app.use('/router', router);

// 二级路由  /router/index
router.get('/index', (req, res) => {
    res.send('ok');
})
```

## 构建模块化路由

```javascript
// food.js
const food = express.Router();
food.get('/index', (req, res) => {
    res.send('欢迎来到食品页面');
})
module.exports = food;

// user.js
const user = express.Router();
user.get('/index', (req, res) => {
    res.send('欢迎来到用户页面');
})
module.exports = user;

// server.js
const user = require('./router/user');
const food = require('./router/food');
app.use('/user', user);
app.use('/food', food);
```
