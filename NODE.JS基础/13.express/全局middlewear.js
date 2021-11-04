const express = require('express');
const app = express();


// 当服务器开启时，正常情况下会进行下面两个 get 回调函数中的内容
// 但是当设置的这个拦截器以后，会优先执行这里面的回调函数
// 当该回调函数中执行了 next() 以后，才会继续往下执行下面两个 get
// 若第一个参数是根路径时(即'/'),可省略不写
app.use('/', (req, res, next) => {
  console.log('中间件');
  let {token} = req.query;
  if (token) { // 如果用户登录
    next();
  } else { // 如果不是登录状态
    res.send('缺少 token');
  }
  // next(); // 是否继续往下执行
})

app.get('/test1', (req, res) => {
  res.send('test1');
})

app.get('/test2', (req, res) => {
  res.send('test2');
})

app.listen(3000, () => {
  console.log('server start');
})