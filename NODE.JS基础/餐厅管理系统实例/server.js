// express 实例化
const express = require ('express');
const db = require('./db/connect');
const bodyParser = require('body-parser');
const app = express();
const cookieParse = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const jwt = require('./utils/jwt')

const cors = require('cors');
const requst = require('request');

// 引入路由
const userRouter = require('./router/userRouter');
const foodRouter = require('./router/foodRouter');
const fileRouter = require('./router/fileRouter');

// 解析表单数据 x-www-form-urlencode
app.use(bodyParser.urlencoded({ extended: false }));
// 解析 json 格式数据
app.use(bodyParser.json());

// 配置session
app.use(session({
  secret: 'asdfarfafsdfsf', 
  cookie: {maxAge: 60 * 1000},
  resave: true, 
  saveUninitialized: false,
}));

// 设置 cors 来解决跨域问题
app.use(cors());

// 设置静态目录
// 这样设置之后，/public 就相当于 当前目录 + /api
app.use('/public', express.static(path.join(__dirname, './static')));

app.use('/user', 
// (req, res, next) => {
//   console.log(req.session);
//   // Session {
//   //   cookie:
//   //     { path: '/',
//   //      _expires: 2020-12-01T08:11:27.507Z,
//   //      originalMaxAge: 60000,
//   //      httpOnly: true
//   //     } 
//   // }
//   next();
// }, 
userRouter);

// 使用 session 方法：
// app.use('/food', 
// (req, res, next) => {
//   // console.log(req.session);
//   // Session {
//   //   cookie:
//   //     { path: '/',
//   //      _expires: 2020-12-01T08:48:16.864Z,
//   //      originalMaxAge: 120000,
//   //      httpOnly: true 
//   //     },
//   //   login: true,
//   //   name: 'byl' 
//   // }
//   if (req.session.login) {
//     next();
//   } else {
//     res.send({err: -999, msg: '请先登录'});
//   }
// }, 
// foodRouter);

// 使用 token 方法：
app.use('/food', 
(req, res, next) => {
  let {token} = req.body;
  console.log(token);
  // 验证 token 的合法性
  jwt.verifyToken(token)
  .then((data) => {
    console.log(data);
    // 验证 token 是否过期
    if(Date.now() - data.ctime <= (1000*60)) { // 设置 token 的有效期为 1分钟
      next();
    } else {
      res.send({err: -997, msg: 'token已过期'});
    }
  })
  .catch((err) => {
    res.send({err: -998, msg: 'token 非法'});
  })
}, 
foodRouter);
app.use('/file', fileRouter);


app.get('/cors', (req, res) => {
  // 发送一个服务器请求
  console.log('cors.html 的 ajax');
  requst('https://www.baidu.com', (err, response, body) => {
  })
  res.send('ok')
})

// 通过 express 开启一个 node 服务器，监听 3000 端口
app.listen(3000, () => {
  console.log('server start');
})
