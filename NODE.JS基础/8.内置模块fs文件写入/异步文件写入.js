// 异步文件写入

// 引入fs模块
var fs = require('fs');

// 1.打开文件
// fs.open(path, flags, [mode], callback)
// 用来打开一个文件
// 异步调用的方法，结果都是通过回调函数的参数返回的，不需要自己设定描述符
// 回调函数有两个参数： err 错误对象，如果没有对象则为null； fd 文件的描述符
fs.open('hello2.txt','w',function(err,fd) {
    console.log(arguments)
    // 判断是否出错
    if(!err) {
        console.log(fd)
        // 如果没有出错，则对文件进行写入操作
        fs.write(fd,"这是异步写入的内容",function(err) {
            if(!err) {
                console.log('写入成功')
                fs.close(fd,function(err){
                    if(!err) {
                        console.log('文件已关闭')
                    }
                })
            }else{
                console.log(err)
            }
        })
    }else{
        console.log(err)
    }
})

// 2.异步写入文件
// fs.write(fd,string,[position],[encoding],callback)
// 既然需要fd，那么就将写入文件的代码放在上面打开文件的代码里

// 3. 保存及关闭文件
// fs.close(fd,callback)
// 也需要fd，所以继续写入上面的代码