
// 简单文件写入
// 异步：fs.writeFile(file,data,[options],callback) 
// 同步：fs.writeFileSync(file,data,[options])
// - file 要操作文件的路径
// - data 要写入的数据
// - options 选项，可以对写入进行一些设置（可选）
// - callback 写入完成后执行的函数

// options是一个对象，可以传三个参数(一般都可省略不写)
// - encoding 指定编码，默认'utf-8'
// - mode 指定文件权限，默认是 0o666
// - flag 操作形式，默认是 'w'.如果目标文件里原本有内容且不想被覆盖，设置成'a'

var fs = require('fs');

fs.writeFile('hello3.txt','这是通过writeFile写入的内容',function(err) {
    if(!err) {
        console.log('写入成功')
    }
})

// 对普通的方法进行了封装，不需要先打开再写入最后保存，直接一气呵成。