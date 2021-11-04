# node 多进程与多线程

Node.js 以单线程的模式运行，但它使用的是事件驱动来处理并发，可以在多核cpu的系统上创建多个进程

## 开启多进程

node 中开启多进程有两个模块：child_process 和 cluster

child_process 可以创建子进程
child_process 提供四种创建子进程的方法：

- spawn: 子进程中执行的是「非node程序」，提供一组参数后，执行的结果以「流」的形式返回
- execFile：子进程中执行的是「非node程序」，提供一组参数，执行的结果以「回调」的形式返回
- exec：子进程中执行的是「非node程序」，提供一组「shell命令」，执行的结果以「回调」的形式返回
- fork：子进程中执行的是「node程序」，提供一组参数后，执行的结果以「流」的形式返回

node中的主进程称为「Master」线程，子进程称为「Worker」进程。在创建子进程之后，父子进程就可以开始进行通信

cluster 模块可以创建共享服务器端口的子进程
cluster 模块调用 fork 方法来创建子进程，该方法与 child_process 中的 fork 是同一个方法

## 进程间通信

在 node 中，父子进程之间通信可以通过 on('message') 和 send() 方法实现通信。on('message')用来监听message事件，使用send()向其他进程发送消息

多个进程可以监听同一个端口吗？
master 和 worker 可以监听同一个端口，但是 master 进程不会处理具体业务,因此需要使用 worker 去处理事务
当网络请求到来的时候，会抢占调度，最后只会有一个 worker 抢到任务并且处理

除了父与子通信，还有别的通信方式:

- stdin/stdout (传递json)。是最直接的方式，适用于关联进程之间的通信，无法跨机器
- node原生IPC。同样无法跨机器(通过 child.send()，process.on('message') 实现发送和接收)
父进程：process.on('message') 收；child.send() 发
子进程：process.on('message') 收；process.send() 发
- 通过sockets。这是最通用的方式，有良好的跨环境能力，但存在网络性能消耗的问题
- 借助消息队列。是为通信问题而扩展出的一层强大的消息中间件，即进程间不直接通信，而是通过中间层（MQ）

## 开启多线程

node 中开启多线程的模块：worker_threads

## 线程间通信

线程间的通信方式有：

- 共享内存：线程之间可以共享内存，使用 ArrayBuffer 或 SharedArrayBuffer
- parentPort：主要用于父子线程通信，通过 on('message')，postMessage 形式
- MessageChannel：创建自定义的消息传递通道
