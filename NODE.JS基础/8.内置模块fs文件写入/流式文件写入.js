// 无论同步、异步还是简单写入文件，都不适合大文件写入
// 因为它们都是一次性写入，如果要写大文件可能会导致性能较差、容易导致内存溢出

var fs = require('fs');

// 流式文件写入
// 先创建一个可写流
// fs.createWriteStream(path,[options])
// 可创建一个可写流，path为文件路径，options为配置参数

var ws = fs.createWriteStream('hello3.txt');

// 可以通过监听流的open和close事件来监听流的打开和关闭
ws.once('open',function() {
    console.log('写入流打开了~')
})
ws.once('close',function() {
    console.log('写入流关闭了~')
})


// 通过 ws 像文件中输出内容
ws.write('通过可写流写入文件的内容1');
// 可以持续写入
ws.write('通过可写流写入文件的内容2');
ws.write('通过可写流写入文件的内容3');
ws.write('通过可写流写入文件的内容4');
ws.write('通过可写流写入文件的内容5');

//关闭流
ws.end();