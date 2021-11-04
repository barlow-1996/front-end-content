const userName: {
  name: String,
  age: Number
} = {
  name: 'byl',
  age: 18
}
console.log(userName.age);

let array: string [] = ['1', 'a', 'f', '8']
console.log(array[3]);

class Person{}
let byl: Person = new Person()
console.log(byl);

let func: () => Number;
// func = function() {
//   return 'byl' // 这里会报错
// }
func = function() {
  return 10
}

let one = 1;
let two = 2;
let three = one + two; // 这里 ts 会自动分析数据类型

function getTotal(one, two) {
  return one + two;
}
const total = getTotal(1, 2)
console.log(total);