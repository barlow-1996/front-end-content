var fs = require('fs');

// 简单文件读取
// fs.readFile(path,[options],callback)  异步
// fs.readFileSync(path,[options])  同步
// -path:要读取文件的路径
// -options：读取的配置选项
// callback：回调函数，通过回调函数将读取到的内容返回
// err 错误对象     data 读取到的数据，会返回一个Buffer

fs.readFile('hello3.txt',function(err,data) {
    if(!err) {
        console.log(data.toString())

        // 可以加写入方法达到一个复制的功能
        fs.writeFile('hello.txt',data,function(err) {
            if(!err) {
                console.log('文件写入成功')
            }
        })
    }
})