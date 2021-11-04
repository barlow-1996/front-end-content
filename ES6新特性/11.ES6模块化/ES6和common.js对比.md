# ES6 模块化和 CommonJS 对比

CommonJS 主要用于服务器端(node.js)，因为 CommonJS 加载模块是同步的，服务器编程加载文件一般都在本地硬盘，加载起来比较快，不用考虑异步加载的问题
然而，这并不适合在浏览器环境，同步意味着阻塞加载，浏览器资源一般都是是异步加载的

- 加载时期不同
CommonJS 是运行时加载 --> 只有运行时才能得到这个对象(module.exports对象)
ES6 模块化是编译时加载 --> import 命令在编译阶段就执行，即在代码运行之前，在编译的时候就能确定模块之间的关系(Tree Sharking 实现原理)

- CommonJS 是同步加载模块，而 ES6 是异步加载模块
CommonJS 模块的require()是同步加载模块
ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段

- commonJS 中顶层的 this 指向这个模块本身，而 ES6 中顶层 this 指向 undefined

- CommonJS 模块输出的是一个值的拷贝(会缓存)，ES6 模块输出的是值的引用(动态更新)
CommonJS 在第一次加载后会被缓存，引入的是缓存中的值。一旦内部再修改这个值，则不会同步到外部(看下面例题)
而 ES6 模块中的值属于动态只读引用。当模块遇到import命令时，就会生成一个只读引用(该属性是只读的，所以不能修改)
等到脚本真正执行时再根据这个只读引用到被加载的模块里去取值，内部修改可以同步到外部

```javascript
// ./a.js
let count = 1;
setCount = () => {
    count++;
}
setTimeout(() => {
    console.log('a', count)
}, 1000);
module.exports = {
    count, 
    setCount
}

//b.js
const obj = require('./a.js');
obj.setCount();
console.log('b', obj.count)
setTimeout(() => {
    console.log('b next', obj.count);
}, 2000);
/*
    执行顺序：
    'b' 1
    'a' 2
    'b next' 1
*/
```

- CommonJS 是动态语法(可以在判断中引入)，ES6 模块是静态语法，只能写在顶层

```javascript
// CommonJS 动态引入 
if (condition) {
  myDynamicModule = require("foo");
} else {
  myDynamicModule = require("bar");
}

// es6 module 只能静态引入
import foo from "foo";
import bar from "bar";
if (condition) {
  // foo.xxxx
} else {
  // bar.xxx
}
```

## AMD

AMD 规范可以实现异步加载模块，并且会提前加载，模块的加载不影响它后面语句的运行
所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行

模块需采用特定的 define() 函数定义
define(dependencies?, factory)
dependencies：要载入的依赖模块(可选)，使用相对路径,注意是数组格式
factory：返回一个回调函数，通过变量来引用模块里面的方法，最后通过 return 来输出

AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：
require([module], callback);
第一个参数[module]，是一个数组，里面的成员就是要加载的模块
第二个参数callback，则是加载成功之后的回调函数

## CMD

CMD 规范也可实现异步加载模块，也是采用特定的define()函数来定义,用require方式来引用模块

## AMD 和 CMD 区别

AMD 和 CMD 都是异步加载模块，他们最大的区别在于对依赖模块的执行时机不同

AMD 依赖前置，在定义模块的时候就要声明其依赖的模块

CMD 依赖就近，只有在用到某个模块的时候再去require
