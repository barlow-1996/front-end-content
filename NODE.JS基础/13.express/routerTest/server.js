const express = require('express');
const app = express();

// app.get('/user/add', (req, res) => {
//   res.send('add ok');
// })
// app.get('/user/del', (req, res) => {
//   res.send('del ok');
// })

const user = require('./router/user');
const food = require('./router/food');

app.use('/user', user);
app.use('/food', food);

app.listen(3000, () => {
  // 监听 3000 端口，开启服务器
  console.log('server start');
})