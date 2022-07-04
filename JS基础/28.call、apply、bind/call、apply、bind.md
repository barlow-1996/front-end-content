# call / apply / bind 用法

call 和 apply 都是为了改变某个函数运行时的执行上下文而存在的。换句话说，就是为了改变函数体内部 this 的指向

call 和 apply 二者的作用完全一样，只是接受参数的方式不太一样

## call

`function.call(obj, arg1, arg2..)` 方法接受收多个参数:
obj：这个对象将替代 function 里面的 this 对象
arg1..: 这是一个参数列表，传递该 function 所需要的参数
判断类型:

```javascript
let obj = {};
let arr = [];
console.log(Object.prototype.toString.call(obj)) // '[object Object]'
console.log(Object.prototype.toString.call(arr)) // '[object Array]'
```

将类数组转化为数组:

```javascript
let trueArr = Array.prototype.slice.call(arrayLike);
```

## apply

`function.apply(obj,args)` 方法接收两个参数:
obj：与 call 方法的一致
args：这个是数组或类数组，apply 方法把这个集合中的元素作为参数传递给被调用的函数

```javascript
// 合并数组:
var arr1=new Array("1","2","3"); 
var arr2=new Array("4","5","6"); 
Array.prototype.push.apply(arr1,arr2); 
console.log(arr1); // ["1", "2", "3", "4", "5", "6"]

// 求类数组的最大值:
var arr = [1,2,3,4,5,6]
var maxNum1 = Math.max.apply(Math, arr);
var maxNum2 = Math.max.call(Math, ...arr);
console.log(maxNum1, maxNum2); // 6, 6
```

## bind

和 call 相似，第一个参数是 this 的指向，从第二个参数开始是接收的参数列表
**区别在于 bind 方法返回值是函数, 所以 bind 不会立即调用**
例：

```javascript
let obj = {name: 'byl'};
function printName(){
  console.log(this.name);
}
let a = printName.bind(obj);
console.log(a) // function printName(){console.log(this.name)}
a() // 'byl'
```

如果对一个函数进行多次 bind

```javascript
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => window
```

可以从上述代码中发现，不管给函数 bind 几次，fn 中的 this 永远由第一次 bind 决定
因为第一次 bind 处理会对当前函数进行 call/apply 处理，然后返回一个函数包起来；而后面的 bind 只会对这个返回的函数再包一次，因此后面的 bind 都无法生效
