import {hi} from './m1' // 要想引入 ts 模块，就要在 webpack 配置文件中的 resolve 属性中进行设置

function sum(a: number, b: number) {
  return a + b;
}

console.log(sum(123, 456));
console.log("嘻嘻");
console.log(hi);