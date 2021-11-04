# socket.io

socket.io 与 websocket 最大的区别就是 emit 和 on

## emit 和 on

emit 和 on 是最重要的两个api，分别对应 发送 和 监听 事件。

socket.emit(eventName, [...args])：发射（触发）一个事件
socket.on(eventName, callback)：监听一个 emit 发射的事件

例：
/*** 服务端 **/
socket.on('message', data =>{
  console.log(data)
});

socket.emit('send', 'hello everybody');

/*** 客户端 **/
socket.emit('message', {id:'1',txt:'hello'});

socket.on('send', data =>{
  console.log(data);
});

我们可以在服务端定义并发送一个事件emit，然后在客户端监听 on，反过来也一样
发送的内容格式非常自由，既可以是基本数据类型 Number，String，Boolean 等，也可以是 Object，Array 类型，甚至还可以是函数

## broadcast广播

broadcast 默认是向所有的socket连接进行广播，但是不包括发送者自身
如果自己也打算接收消息的话，需要给自己单独发送
例：
/*** 服务端 **/
io.on('connection', socket => {
 const data= {
   txt:'new user login',
   time:new Date()
 }
 //广播向所有socket连接
 socket.broadcast.emit('userin',data);

 //给自己也发一份
 socket.emit('userin',data);
});
