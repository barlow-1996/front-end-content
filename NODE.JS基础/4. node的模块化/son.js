console.log('我是子模块')

// 向外部暴露属性或方法
var x = 10;    // 正常的定义变量无法暴露

exports.x = 10; // 可以通过 exports 向外暴露变量
exports.y = 20;

exports.add = function(x,y){
    return x+y
}

let arr = [1, 2, 3]
exports.arr = arr;
exports.pushArr = function() {
    arr.push(4);
  }

console.log(arguments.callee + '') // 证明了在node中，每一个js文件中的js代码都是独立运行在一个函数中，而不是全局作用域。
// 打印结果：
// function (exports, require, module, __filename, __dirname) {函数体内放的是该 js 文件的整个内容}

// 当 node 在执行模块中的代码时，会将模块中的代码用function (exports, require, module, __filename, __dirname) {} 包裹起来
// 在函数执行时，同时传递进了5个实参
// exports: 该对象用来将变量或函数暴露在外部,是module.exports的一个引用
// require：函数，用来引入外部模块
// module：代表的是当前模块本身，exports 就是 module 的属性(exports == module.exports)
// __filename：当前这个模块的完整路径 D:\VSCode\前端内容\NODE.JS基础\4. node的模块化\son.js
// __dirname：当前这个模块所在文件夹的完整路径 D:\VSCode\前端内容\NODE.JS基础\4. node的模块化

// exports 和 module.exports 的区别：
// exports 必须通过 .的形式向外暴露对象，如： exports.x = 10;
// module.exports 既可以通过 .的形式也可以通过直接赋值的形式
// 如：module.exports.x = 10;  或者 module.exports = 10;

// exports会默认设置为module.exports的快捷方式,可以往里面添加属性(exports.x)；
// 但是不可以修改它的指向，修改了他的指向,他就和普通的对象没有啥差别,因为对外输出的是module.exports而不是exports。如果exports改变了指向之后,就会不再生效。