# get 和 post 区别

## 功能不同

get 是从服务器获取数据
post 是向服务器传送数据

## 过程不同

get 是将请求的数据附加在 URL 之后，以 ? 分割 URL 和传输数据，多个参数用 & 连接
比如：

GET /hello.html?name=tom HTTP1.1  请求行(方法、URL、协议版本号)
key: value  请求头
key: value  请求头
key: value  请求头
.....
\r\n        空一行

POST 是将请求把请求的数据放置在 HTTP 请求主体中。上面的id=1213&name=suguniang就是两个实际的传输数据键值对
比如：
POST /hello.html HTTP1.1 请求行(方法、URL、协议版本号)
key: value  请求头
key: value  请求头
key: value  请求头
.....
\r\n        空一行
name=tom    请求主体

## 传输数据大小不同

在使用 GET 请求时，传输数据会受到URL长度的限制(http不会限制，而浏览器会限制)
对于 POST，由于不是 URL 传值，理论上是不会受限制的，但实际上各服务器会规定对POST提交数据大小进行限制(比 GET 大)

## 安全性

POST 的安全性比 GET 的高
通过 GET 请求，用户名和密码都会暴露在 URL 上
登录页面有可能被浏览器缓存以及其他人查看浏览器的历史记录的原因，此时的用户名和密码就很容易被他人拿到

但其实 get 和 post 都是不安全的，因为 http 是明文传输，只要被拦截就能轻易获取到信息。想要安全传输必须用 https 加密处理

## 数据包不同(重要！！！)

GET 产生一个 TCP 数据包，POST 产生两个 TCP 数据包

对于 GET 方式的请求，浏览器会把 header 和 data 一并发送出去，服务器响应200(返回数据)
而对于POST，浏览器先发送 header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok(返回数据)
