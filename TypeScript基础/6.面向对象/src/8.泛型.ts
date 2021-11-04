// function func(a: any): any {
//   return a;
// }
// 在定义类或函数时，如果遇到类型不明确时就可以使用泛型
// 泛型是泛指某一类型，更像是一个类型变量，主要作用是创建逻辑可复用的组件
// 定义泛型就是在函数名后面添加 <xxx>，然后后面可以将函数的参数和返回值都声明为 xxx
// xxx 表示一个不确定的类型，只有在函数调用时才能知道 xxx 的类型。
// 这样定义跟上面那样定义的好处是可以让参数和返回值的类型保持一致
function func<k>(a: k): k {
  return a
}

func(10); // 不指定泛型，TS可自动对类型进行推断
func<string>('hello'); // 指定泛型
// func<string>(10); // 若指定了泛型，如果参数不满足泛型会报错

// 泛型还可以指定多个
function func2<t,k>(a: t, b: k):t {
  console.log(b);
  // return b; // 这里会报错，因为 ts  检测出 b 的类型不属于 t
  return a;
}
func2(123, 'hello');
func2<number, string>(123, 'hello');

// 泛型也可以与接口联用，表示泛型 t 必须是 Inter 的实现类(子类)
interface Inter{
  length: number
}
function func3<t extends Inter>(a: t):number {
  return a.length;
}
func3('abc') // 这样不会报错，因为字符串中有 length 属性
func3([1, 2, 3]) // 跟上面同理

// 类的泛型
class MyClass<t>{
  constructor(public name: t){}
}
const mc = new MyClass<string>('byl');