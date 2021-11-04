var fs = require('fs');

// 创建一个可读流
var rs = fs.createReadStream('hello3.txt');
// 创建一个可写流
var ws = fs.createWriteStream('copy.txt');

// pipe()可将可读流的内容直接输出到可写流中
rs.pipe(ws);