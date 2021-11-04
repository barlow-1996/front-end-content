const son = require ('./son');

console.log(son.y); // 20

son.y = 30;
console.log(son.y); // 30

console.log(son.add(123,789)); // 912

console.log(son.arr); // [1, 2, 3]
son.pushArr();
console.log(son.arr); // [1, 2, 3, 4]