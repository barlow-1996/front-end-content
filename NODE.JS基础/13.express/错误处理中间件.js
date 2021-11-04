const express = require('express');
const fs = require('fs');
const app = express();

app.get('/index', (req, res) => {
    throw new Error('程序发生了未知错误');
    // res.send('程序正常执行'); // 若不报错，就不会执行错误处理中间件
})

// 错误处理中间件
// 当前路径若捕获到错误就会执行错误处理中间件
// 不指定路径表示所有路径请求
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

// 错误处理中间件只能被同步错误触发，无法被异步代码错误触发
// 处理异步错误只能手动处理
app.get('/read', (req, res, next) => {
    fs.readFile('/not-exist', (err, data) => {
        if(err) {
            next(err); // 如果 next 方法带有参数，则抛出一个错误，参数为错误文本，这样就会触发错误处理中间件
        } else {
            res.send(data);
        }
    })
})

app.listen(3000, () => {
    console.log('Server start');
})