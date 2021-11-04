# eval

eval 是一个函数，函数里面的字符串是可以执行的 JS 代码

eval("alert(11)");
// 等价于
alert(11);

eval("function sayHi() { alert('hi'); }");
sayHi();

通过 eval 执行的代码是执行环境的一部分，被执行的代码与该执行环境有相同的作用域链
**eval中创建的任何变量或函数都不会被提升，因为在预编译时，它们被包含在字符串中**

## eval 缺点

1. eval 不容易调试，在 eval 处无法打断点
2. eval 性能较低，编译时间慢
3. 不安全。eval 在处理未知字符串时，很可能引起 XSS 攻击
