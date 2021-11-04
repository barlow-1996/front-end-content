"use strict";
// function func(a: any): any {
//   return a;
// }
// 在定义类或函数时，如果遇到类型不明确时就可以使用泛型
// 定义泛型就是在函数名后面添加 <xxx>，然后后面可以将函数的参数和返回值都声明为 xxx
// xxx 表示一个不确定的类型，只有在函数调用时才能知道 xxx 的类型。
// 这样定义跟上面那样定义的好处是可以让参数和返回值的类型保持一致
function func(a) {
    return a;
}
func(10); // 不指定泛型，TS可自动对类型进行推断
func('hello'); // 指定泛型
// func<string>(10); // 若指定了泛型，如果参数不满足泛型会报错
// 泛型还可以指定多个
function func2(a, b) {
    console.log(b);
    return a;
}
func2(123, 'hello');
func2(123, 'hello');
function func3(a) {
    return a.length;
}
func3('abc'); // 这样不会报错，因为字符串中有 length 属性
func3([1, 2, 3]); // 跟上面同理
// 类的泛型
class MyClass {
    constructor(name) {
        this.name = name;
    }
}
const mc = new MyClass('byl');
