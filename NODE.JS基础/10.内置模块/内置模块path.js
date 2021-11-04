const path = require('path');

console.log(__dirname); // D:\VSCode\前端内容\NODE.JS基础\10.内置模块

// resolve 方法将参数解析为绝对路径，从右往左处理
// 若以 ./ 开头 或者没有符号 则拼接前面路径；
let path1 = path.resolve(__dirname, "dist");
console.log(path1); // D:\VSCode\前端内容\NODE.JS基础\10.内置模块\dist
path1 = path.resolve(__dirname, "./dist");
console.log(path1); // D:\VSCode\前端内容\NODE.JS基础\10.内置模块\dist
// 若以 / 开头，不会拼接到前面的路径(因为拼接到此已经是一个绝对路径)；
let path2 = path.resolve(__dirname, "/dist");
console.log(path2); // D:\dist
// 若以 ../ 开头，拼接前面的路径，且不含最后一节路径；
let path3 = path.resolve(__dirname, "../dist");
console.log(path3); // D:\VSCode\前端内容\NODE.JS基础\dist


// basename 方法返回路径中的最后一部分
console.log(path.basename(__dirname)); // 10.内置模块


// extname 方法返回路径中文件的后缀名
let file = path.resolve(__dirname, "./内置模块path.js");
console.log(path.extname(file)); // .js


// parse 方法将路径字符串转换成对象
console.log(path.parse("D:\VSCode\前端内容\NODE.JS基础\10.内置模块\dist"));
// { root: 'D:',
//   dir: 'D:',
//   base: 'VSCode前端内容NODE.JS基础\b.内置模块dist',
//   ext: '.内置模块dist',
//   name: 'VSCode前端内容NODE.JS基础\b' }


// format 方法将路径对象转换成字符串
let obj = {
  root: 'D:',
  dir: 'D:',
  base: 'VSCode前端内容NODE.JS基础\b.内置模块dist',
  ext: '.内置模块dist',
  name: 'VSCode前端内容NODE.JS基础\b'
}
console.log(path.format(obj)); // D:VSCode前端内容NODE.JS基 .内置模块dist