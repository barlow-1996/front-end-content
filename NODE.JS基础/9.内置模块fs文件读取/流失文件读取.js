// 流失文件读取也适用于一些大文件，可以分多次将文件读取到内存中

var fs = require('fs');

// 创建一个可读流
var rs = fs.createReadStream('hello3.txt');

// 监听流的开启和关闭
rs.once('open',function() {
    console.log('可读流开启')
});
rs.once('close',function() {
    console.log('可读流关闭')
});

// 如果要读取一个可读流中的数据，必须要为可读流绑定一个data 事件
// data 事件绑定完毕它会自动开始读取数据

rs.on('data',function(data) {
    console.log(data)
});