# 完整的 HTTP 请求

1. 建立 TCP 连接
在 HTTP 工作开始之前，Web浏览器首先要通过网络与Web服务器建立连接，该连接是通过TCP来完成的，该协议与IP协议共同构建Internet，即著名的TCP/IP协议族
因此Internet又被称作是TCP/IP网络。HTTP是比TCP更高层次的应用层协议，根据规则，只有低层协议建立之后才能，才能进行更层协议的连接，因此先要建立TCP连接，一般TCP连接的端口号是80

2. Web 浏览器向服务器发送请求行
一旦建立了TCP连接，Web浏览器就会向服务器发送请求行。例如：GET/sample/hello.jsp HTTP/1.1

3. Web 浏览器发送请求头信息
浏览器发送其请求行之后，还要以请求头的形式向 Web 服务器发送一些别的信息
之后浏览器发送了一空白行来通知服务器，它已经结束了该头信息的发送

4. 服务器响应行
客户机向服务器发出请求后，服务器向客户端发送响应行，HTTP/1.1 200 OK ，响应行是协议的版本号和状态码

5. 服务器发送响应头
正如客户端会随同请求发送关于自身的信息一样，服务器也会随同应答向用户发送关于它自己的数据及被请求的文档

6. 服务器发送数据
服务器向浏览器发送响应头信息后，它会发送一个空白行来表示头信息的发送到此为结束
接着，它就以 Content-Type 请求头信息所描述的格式发送用户所请求的实际数据

7. 服务器关闭TCP连接
一般情况下，一旦服务器向浏览器发送了请求数据，它就要关闭 TCP 连接

如果浏览器或者服务器在其头信息加入了这行代码：Connection:keep-alive
那么 TCP 连接在发送后将仍然保持打开状态，于是，浏览器可以继续通过相同的连接发送请求
保持连接节省了为每个请求建立新连接所需的时间，还节约了网络带宽
