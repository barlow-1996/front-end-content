# http 压缩

对 js、css、图片 等进行压缩，尽可能减小文件的大小，减少文件下载的时间，从而减少网页响应的时间

## http 压缩过程

1. 浏览器发送Http请求头声明Accept-Encoding: gzip, deflate。 (告诉服务器， 浏览器支持gzip压缩) gzip表示压缩格式，deflate表示压缩算法
2. 服务器通过 content-Encoding 来启用压缩，配置压缩的文件类型和压缩方式
3. 压缩后响应头中有 Content-Type 和 Content-Length(压缩后的大小)， 并且增加了Content-Encoding:gzip.  然后把Response发送给浏览器。
4. 浏览器接到响应头的 Content-Encoding:gzip 来对资源进行解析

怎样使用 gzip 压缩文件？
客户端不用做任何配置，在服务端配置即可

## HTTP 压缩的优缺点

优点：减少 HTTP 响应时间，提升传输效率
缺点：压缩过程占用服务器额外的CPU，客户端也要对压缩文件进行解压，这也需要占用部分时间

## Gzip 压缩原理

开启了 Gzip 压缩其实体积并不一定会减少，因为它的原理是找出文本中重复的字符串，临时替换它们，使文件变小
所以代码中的重复率越高，压缩效果会越好
