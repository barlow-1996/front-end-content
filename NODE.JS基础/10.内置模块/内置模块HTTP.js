// node.js 服务器
// 127.0.0.1 --> 本机IP
// 172.22.171.159 --> 局域网IP
// localhost --> 本机域名
// 引入模块
const http = require('http');
const { type } = require('os');

// 创建服务器
const server = http.createServer();

// 监听请求事件，当有请求事件发生时就返回数据
server.on('request', (req, res) => {
  // req: 请求对象，包含了客户端请求的数据，请求头和请求主体。
  // res: 响应对象，包含了服务器发送给客户端的数据，响应头和响应主体。
  // res.write('<h1>hello Node.js</h1>');
  // res.write('<p>hello 1111</p>');

  // 设置响应头
  // res.writeHead(状态码，响应头对象)；
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  res.write('<h1>大哥大嫂过年好</h1>');

  // 必须要结束
  res.end();
})

// 监听端口
server.listen(80, function() {
  console.log('服务器已运行...');
})