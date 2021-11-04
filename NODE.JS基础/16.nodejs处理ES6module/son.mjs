console.log('我是子模块')

// 向外部暴露属性或方法
export var x = 10;    // 正常的定义变量无法暴露

export var y = 20;

export var add = function(x, y) {
    return x + y
}

export let arr = [1, 2, 3]
export function pushArr() {
    arr.push(4);
  }