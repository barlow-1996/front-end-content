# nodejs 执行机制

node服务器是单线程的，但是在底层拥有一个I/O线程池(通过 Libuv 实现)
Nodejs 之所以可以处理高并发，得益于 libuv 层的事件循环机制 和 线程池

1. V8 引擎解析 js 脚本
2. 解析后调用 node API
3. libuv库 负责执行这些 API，它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎
4. v8 引擎再将结果返回给用户

## nodejs 事件循环

Nodejs 事件循环机制基于 libuv 层
**事件循环的实现原理是非阻塞的I/O机制**

Nodejs 维护了一个宏任务队列，分为 6 个阶段，它们会按照顺序反复运行
6个阶段分别为:

* timers: 这个阶段执行定时器队列中的回调如 setTimeout() 和 setInterval()
* I/O callbacks: 这个阶段执行几乎所有的回调。但是不包括close事件，定时器和setImmediate()的回调
* idle, prepare: 这个阶段仅在内部使用，可以不必理会
* poll: 等待新的I/O事件，node在一些特殊情况下会阻塞在这里
* check: setImmediate()的回调会在这个阶段执行
* close callbacks: 例如 socket.on('close', ...) 这种close事件的回调

每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。
**当队列为空或者执行的回调函数数量到达系统设定的阈值，才会进入下一阶段**

执行顺序:

1. 执行同步代码
2. 执行微任务队列，先执行 process.nextTick(process.nextTick 是 node 中独有的一个微任务)，再执行其他的微任务队列
3. 开始执行宏任务，从第 1 阶段开始，将该阶段宏任务队列中的所有任务执行完
4. timers queue -- > 步骤 2 --> I/O queue --> 步骤 2 --> check queue --> 步骤 2 --> close callback queue --> 步骤 2 --> timers queue...

```javascript
process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B(){console.log(2);});
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0)
// 1
// 2
// TIMEOUT FIRED
```

浏览器环境下，微任务是每个宏任务执行完之后执行
而在 Node.js 中，微任务会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行微任务
