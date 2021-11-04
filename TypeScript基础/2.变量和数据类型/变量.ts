let age: Number; // 声明变量并指定类型
age = 18; // 给变量赋值
console.log(age);

// 或者
let username: String = 'byl';

let num1: Number = 10;
let num2: Number = 20;
let temp: Number;
temp = num1;
num1 = num2;
num2 = temp;
console.log(num1);
console.log(num2);

let u: Number;
console.log(u); // undefined

let c: unknown;
c = true;
let e: boolean;
// e = c; // 这里会有报错提醒
// if (typeof c === 'boolean') {
//   e = c; // 这样就不会报错了
// }
// e = c as boolean; // 或这样