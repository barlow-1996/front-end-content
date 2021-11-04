var express = require('express');
const { config } = require('process');
var app = express();

var http = require('http').createServer(app);

// 先通过 npm i socket.io 下载第三方插件
var io = require('socket.io')(http);
// 将 socket 服务器与 express 进行结合

app.get('/', (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendFile(__dirname + '/index.html');
})

// 总在线人员
var onLineUsers = {};
// 总在线人数
var onLineCounts = 0;

// 监听客户端连接
io.on('connection', (client) => {
  console.log("a user connected");

  // 监听新用户的加入
  client.on('login', (user) => {
    client.name = user.userId;
    if (!onLineUsers.hasOwnPropoty(client.name)) {
      // 若不存在则加入
      onLineUsers[client.name] = user.userName;
      onLineCounts++;
    }

    // 新用户加入时向所有的客户端login发送消息
    io.emit('login', {onLineUsers: onLineUsers, onLineCounts: onLineCounts, user: user});
    console.log(user.userName + " 进入了聊天室");
  });

  // 监听用户退出聊天室
  client.on('disconnect', () => {
    if (onLineUsers.hasOwnPropoty(client.name)) {
      var user = {userId: client.name, userName: onLineUsers[client.name]};
      delete onLineUsers[client.name];
      onLineCounts--;

      // 向所有客户端通知该用户退出了群聊
      io.emit('logout', {onLineUsers: onLineUsers, onLineCounts: onLineCounts, user: user});
      console.log(user.userName + ' 退出了聊天室');
    }
  });

  // 监听用户发送的消息，并将信息广播出去让所有客户端接收
  client.on('message', (obj) => {
    console.log('ok');
    io.emit('message', obj);
    console.log(obj.userName + ': ' + obj.content);
  });
})


// 设置端口号，后面设为 0.0.0.0 是让所有的ip访问
http.listen(3000, () => {
  console.log('Server start...');
});