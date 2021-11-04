// 引入 express 框架
const express = require ('express');
const bodyParser = require('body-parser');
// 搭建网站服务器
const app = express();

// app.use 表示使用插件
// 解析表单数据 x-www-form-urlencode
app.use(bodyParser.urlencoded({ extended: false })) 
// 解析 json 格式数据
app.use(bodyParser.json())

// 最简单的 API 接口
app.get('/user/login', (req, res) => {
  // 1. 接收 get 参数，前端发来的参数保存在 req.query 中
  console.log(req.query);
  console.log(req.ip); // 获取 http 请求的 IP地址
  // 2. 处理参数
  let {us, pw} = req.query;
  if(us === '123' && pw === '456') {
    res.send({err:0,msg:'login ok'})
  }else {
    res.send({err:-1,msg:'login not ok'})
  }
})

app.post('/user/register', (req, res) => {
  // 接收 post 数据，前端发来的数据保存在 req.body 中
  console.log(req.body); // undefined 因为 express 不能直接解析消息体
  // 想要解析post消息体中的内容，需要下载第三方模块 body-parser

  let {us, pw} = req.body;
  if(us === '123' && pw === '456') {
    res.send({err:0,msg:'register ok'})
  }else {
    res.send({err:-1,msg:'regitser not ok'})
  }
})

// 监听服务器的 3000 端口
app.listen(3000, () => {
  console.log('server start');
})

// 完整的 API 接口 URL：http://localhost:3000/user/login
// localhost 就相当于是本地 ip
// http://localhost:3000/user/login?us=123&pw=456 相当于给服务器传参