const express = require('express');
const app = express();
const path = require('path'); // 该内置模块可以用来找到绝对路径

// console.log(__dirname);
const url = path.resolve(__dirname, './static')

// static 里面的参数必须是目录文件夹的绝对路径
app.use(express.static(url));

app.listen(3000, () => {
  console.log('server start');
})

// 设置了 static 以后，域名：3000 直接指向规定的静态目录
// 在网址中输入 localhost:3000/demo.html 即可访问静态目录中的 html 文件
// 在网址中输入 localhost:3000/timg.jpg 即可访问静态目录中的图片

// 还可以指定虚拟路径
// app.use('/public', express.static(url));
// 这样访问静态目录中的图片路径就为 localhost:3000/public/timg.jpg