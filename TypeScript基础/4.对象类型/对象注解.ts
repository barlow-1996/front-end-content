let a: {name: string, age: number};
// a = {name: 'byl'} // 报错，缺少 age 属性
a = {
    name: 'byl', 
    age: 18
};
console.log(a.name);

let b: {name: string, age?: number};
b = {name: 'byl'};
console.log(b.name);

let d: (a: number, b: number) => number // 表示 d 是一个函数，函数接收两个 number 类型的参数，且返回值也是 number 类型
d = function(n1, n2): number{
  return n1 + n2;
}