# webSocket

webSocket 是HTML5新增内容，低版本浏览器不兼容(IE10以下)，使用方法简单
通过 websocket 也能解决跨域问题

## webSocket 原理

webSocket 是一个应用层协议，它必须依赖 HTTP 协议进行一次握手，握手成功后数据就直接从 TCP 通道传输，与 HTTP 无关了
即：websocket 分为握手和数据传输阶段，进行了 HTTP 握手 + 双工的 TCP 连接

## 实现 webSocket 的过程

前后端连接

1. 搭建 webSocket 服务器
new WebSocket.server({port: 8080}, () => { })
ws.on('connection', () => {}) // 打开连接
2. 前端进行连接
new WebSocket('ws://localhost:8080') // 这里得用websocket的协议 ws
**如果要使用 https 协议，则用 new WebSocket('wss://localhost:8080')**
ws.onopen();
数据交互
3. 前端发送/接收数据
ws.send() // 前端主动向后端发送消息
ws.onmessage = () => {} // 前端监听后端发来的消息，若收到消息就触发该函数
4. 后端发送/监听数据
ws.send() // 后端主动发送数据
client.on('message', () => { }) // 一旦后端收到前端发来的消息，就会触发该函数
5. 断开连接
后端断开连接： ws.on('close', () => {})
前端断开连接： ws.onclose()

## webSocket 头信息

请求头：

```javascript
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: `http://example.com`
```

Upgrade: websocket 提醒服务端更新协议，采用 webSocket 协议通信
Sec-WebSocket-Key 是一个 Base64 编码的值，是浏览器随机生成的，用于验证服务器端身份
Sec-WebSocket-Protocol 是用户定义的字符串，用来区分同 URL 下，不同的服务所需要的协议
Sec-WebSocket-Version 是告诉服务器所使用的协议版本

响应头：

```javascript
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
```

**注意: websocket 状态码是 101(101 表示切换协议)**
Upgrade: websocket 服务端也要向客户端发送该字段，通信双方要同时更新协议
Sec-WebSocket-Accept 这个是经过服务器确认，并且加密过后的 Sec-WebSocket-Key，返回给客户端证明服务端的身份
