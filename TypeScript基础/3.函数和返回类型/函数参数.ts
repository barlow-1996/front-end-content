function getAdd(one, two) {
  return one + two;
}
let add = getAdd(1, 2)
console.log(add);

function getAdd1(one: number, two: number, ...items: any []): Number {
  console.log(items); // ['a', 'b', 'c', 3]
  return 1;
}
// rest 参数：
// 在不使用 arguments 对象的情况允许函数传递可变数量的参数的另一种实现方式
// 一个函数只能有一个 rest 参数，且只能出现在参数列表的最后一个，该参数必须是数组类型

getAdd1(1, 2, 'a', 'b', 'c', 3);