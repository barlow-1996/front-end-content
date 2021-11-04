const express = require('express');
const path = require('path');
const app = express();

// app.get('pathname', func, func)
// 中间件可以有很多个， app.get('pathname', func, func, func, func...)
// 只要前一个回调函数中有 next()，就会依次执行下一个回调函数
app.get('/test1', (req, res, next) => {
  console.log('function1');
  next();
  // next('出错了！'); // 如果 next 带有参数，则抛出一个错误，参数为错误文本
  // 抛出错误以后，后面的中间件将不再执行，直到发现一个错误处理函数为止
}, 
(req, res) => {
  console.log('function2');
  // res.sendFile() 用于发送文件(必须是绝对路径)
  res.sendFile(path.resolve(__dirname, './静态资源目录/timg.jpg'));
  // res.send('test1');
})

app.listen(3000, () => {
  console.log('server start');
})