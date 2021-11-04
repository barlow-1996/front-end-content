const WebSocket = require('ws');
const ws = new WebSocket.Server({port: 8080}, () => {
  console.log('socket start');
})

let clients = [];

ws.on('connection', (client) => {
  clients.push(client);
  console.log(client.nickname);
  // client.send('欢迎光临'); // 主动向前端发送消息，数据传输字符串
  let obj = {
    type: 1,
    msg: '你好啊',
    userId: 'byl'
  }
  client.send(JSON.stringify(obj));

  // 前端发来的数据
  client.on('message', (msg) => {
    console.log('来自前端的数据：' + msg);
    if(msg.indexOf('广播') !== -1) {
      sendAll();
    }
  })
  client.on('close', (msg) => {
    console.log('前端主动断开连接');
  })
})

function sendAll () {
  clients.forEach(v => {
    v.send('群发消息');
  })
}


