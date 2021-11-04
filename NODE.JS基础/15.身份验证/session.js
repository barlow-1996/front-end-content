const cookieParse = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const app = express();

app.use(session({
  secret: 'hubwizApp', // 私钥，对用户相关信息一起做加密操作
  cookie: {maxAge: 60 * 1000 * 30}, // 设置cookie的过期时间(毫秒为单位)
  resave: true, // 即使session没有被修改，也保存session值，默认为true
  saveUninitialized: false, // 无论有没有session cookie，每次请求都设置一个session cookie，默认给个标示为 connect.sid
}));
