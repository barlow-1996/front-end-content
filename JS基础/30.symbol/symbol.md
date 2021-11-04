# symbol

symbol是ES6中新出现的一种基本数据类型
symbol 本质上是一种唯一标识符，可用作对象的唯一属性名，这样其他人就不会改写或覆盖你设置的属性值

## 声明方法

let id = Symbol();
括号中可以添加描述，如：let id = Symbol('id');

## 特点

1. 与其他基本数据类型相比，symbol 没有 toString 方法
console.log(id); // Symbol(id)
console.log(id.toString()); // "Symbol(id)"
console.log(id.description); // "id"

2. 与Object相似的一点是，即便两个symbol有相同的值，也并不相等
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 == id2);   // false

3. 无法被 for..in.. 和 object.keys()遍历
 let id = Symbol("id");
 let obj = {
  [id]:'symbol'
 };
 for(let option in obj){
     console.log(obj[option]); //空
 }

- 能够访问 symbol 的方法：Object.getOwnPropertySymbols
该方法会返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值

## 多次使用同一个symbol

当我们需要多次使用同一个 symbol 值时，可以使用 Symbol.for()
该方法在第一次定义时会将描述放在全局中，后面如果还定义了同一个 symbol 描述，就会去全局中检测有没有这个描述，如果有的话就会把它拿出来继续使用
let name1 = Symbol.for('name'); //检测到未创建后新建
let name2 = Symbol.for('name'); //检测到已创建后返回
console.log(name1 === name2); // true

当使用 Symbol.for() 方法定义时，可以用 Symbol.keyFor() 方法去全局中找到并返回它的描述
但是用普通的 Symbol() 方法定义时，就无法用这个方法来取得描述，因为普通的描述并没有被放到全局中
let a = Symbol('id');
let b = Symbol.for('name');
console.log(Symbol.keyFor(a)); // undefined
console.log(Symbol.keyFor(b)); // name
