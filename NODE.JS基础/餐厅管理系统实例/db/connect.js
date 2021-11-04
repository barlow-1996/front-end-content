const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/local', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection; // 数据库的连接对象

// 连接失败回调
db.on('error', console.error.bind(console, 'connection error:'));

// 连接成功回调
db.once('open', function () {
  console.log('db ok');
});