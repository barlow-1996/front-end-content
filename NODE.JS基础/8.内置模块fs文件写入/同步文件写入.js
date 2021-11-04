

// fs 模块中所有操作方法中都有两种形式可以选择：同步和异步

// 同步文件系统会阻塞程序执行，除非操作完毕，否则不会向下执行。
// 异步文件系统不会阻塞程序的执行，而是在操作完成时通过回调函数将结果返回。

// 文件的写入

// 同步：
// 1. 打开文件    fs.openSync(path,flags,[mode])  
// flags 打开文件要操作的类型。 r 只读的； w 可写的。
// mode 设置文件的操作权限，可选，一般不传。
// 返回值： 该方法会返回一个文件描述符作为结果

// 2. 向文件写入内容    fs.writeSync(fd,string,[position],[encoding])
// fd 文件描述符，需要传递要写入的文件描述符
// string  要写入的内容
// position   要写入的起始位置,默认是0
// encoding   写入的编码，默认是 utf-8

// 3. 保存并关闭文件    fs.closeSync(fd)

var fs = require('fs');

// 打开文件
var fd = fs.openSync('./hello.txt','w');
console.log(fd)

//写入内容
fs.writeSync(fd, '今天天气真不错！')

// 操作完必须要关闭文件，否则会占用计算机内存
fs.closeSync(fd)
