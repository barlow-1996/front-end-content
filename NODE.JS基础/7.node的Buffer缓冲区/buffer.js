var str = 'hello world';

// 将一个字符串保存到 buffer 中
var buf = Buffer.from(str);
console.log(buf)

// 在 buffer 中存储的都是二进制数据，但是在显示时都是以16进制显示的

// 创建一个10个字节的buffer
var buf2 = Buffer.alloc(10);
buf2[0] = 88;
buf2[1] = 255;
console.log(buf2)

var buf4 = Buffer.from('我是一段文本');
console.log(buf4.toString()) // 通过 toString() 方法将二进制数据转换成字符串