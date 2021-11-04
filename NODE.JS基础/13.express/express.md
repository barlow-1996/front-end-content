# 通过 express 框架书写API

## 什么是 API

ajax请求数据所用的URL就是API接口

通过 API 接口实现数据的请求

API 接口的构成要素：

- ip: 无法控制

- port：可以控制

- pathname：可以控制(保持语义化)

- method(get\post)：可以控制

- data:数据格式由后端决定

## express 基本使用

express 是一个基于 Node 的应用开发框架，帮助用户创建各种 Web 应用
express 和 KOA 这两个框架类似，都是一个第三方插件

- 安装 express
npm install express --save

- 引入 express

```javascript
// 引入 express 框架
const express = require('express');
// 搭建网站服务器
const app = express();
```

### express API

```javascript
// 监听 get 请求：
app.get('/', (req, res) => { // 监听根路径可直接用 '/' 表示
  let data = req.query; // 接收 get 请求参数，get 请求的参数保存在 req.query 中
  // send() 向客户端进行响应
  // send 方法内部会检测相应内容的类型
  // send 方法会自动设置 http 状态码
  // send 方法会自动设置响应内容的类型和编码
  res.send('hello express');
})

// 监听 post 请求：
app.post('/', (req, res) => {
  let {us, pw} = req.body; // 接收 post post 请求的参数保存在 req.body 中
  if(us === '123' && pw === '456') {
    res.send({err:0,msg:'register ok'})
  }else {
    res.send({err:-1,msg:'regitser not ok'})
  }
})

// 监听所有的请求方式：
app.use('/', (req, res) => {

})

// 路由参数
app.get('/find/:id', (req, res) => { // :id 是一个占位符
  console.log(req.params) // {id: 123}
})
localhost:3000/find/123
```

## express 核心特型

- 提供中间件机制有效控制 HTTP 请求(一个中间件处理完，再传递给下一个中间件)
- 提供方便简洁的路由定义方式
- 可以通过向模板传递参数来动态渲染 HTML 页面
- 对获取 HTTP 请求参数进行了简化

## postman 接口测试

get 传参在Params里面写参数
post 传参在body中写参数

## API 接口的书写

1. 接收数据

- get   req.query
- post  req.body 不能直接解析，需要第三方插件 body-parser 进行解析
  注意数据格式： json \ x-www-form-urlencode \ formdata
- put
- delete

## 中间件 middleware

- 内置中间件 static（又叫做静态资源目录）
静态资源目录：指定一个目录，该目录可以被访问  等同于 apache 下面(www)这个目录

- 自定义中间件 （全局 局部）

- 第三方中间件 （body-parser） (拦截器)

中间件要在合适的地方使用 next()

### 中间件的实现原理

express 内部维护一个函数数组，这个函数数组表示在发出响应之前要执行的所有函数
使用 app.use(fn) 后，传进来的 fn 就会被扔到这个数组里，执行完毕后调用 next() 方法执行函数数组里的下一个函数
如果没有调用 next() 的话，就不会调用下一个函数了，也就是说调用就会被终止

### 中间件应用场景

1. 路由保护。用中间件判断用户登录状态，若未登录则拦截请求，禁止用户进入需要登录的页面
2. 网站维护公告。当网站正在维护时，在根路径上定义中间件拦截所有请求，为客户端做出响应，网站正在维护中
app.use((req, res, next) => {
  res.send('当前网站正在维护中...');
})
3. 自定义 404 页面。在最后面定义一个根路径的中间件，如果请求会被该中间件接收，说明上面定义的请求接收路径都不匹配，即资源不存在
app.use((req, res, next) => {
  res.status(404); // 为客户端响应 404 状态码
  res.send('当前访问的页面不存在');
})

## 静态资源处理

通过 express 内置的 express.static 可以方便地托管静态文件，如 img，css，js 文件等

```javascript
app.use(express.static('public'));

// 还可以指定虚拟路径
app.use('/static', express.static('public'));
```
