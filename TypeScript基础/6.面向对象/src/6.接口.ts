// 类型声明，描述一个对象的类型
type myType = {
  name: string,
  age: number
}
const obj: myType = {
  name: 'byl',
  age: 18
}

// 接口用来描述一个类结构，用来定义一个类中要包含哪些属性和方法，同时也能当成类型声明去使用
// 其作用就是为类型进行命名，或为你的代码或者三方代码定义结构

// 用 interface 关键字开头表示接口
interface myInter{
  name: string,
  age: number
}
// 接口允许同名使用，这就相当于这个接口有三个属性和一个方法
interface myInter{
  gender: string,
  sayHello(): void
}

// 当做类型声明使用：
const obj1: myInter = {
  name: 'byl',
  age: 18,
  gender: '男',
  sayHello: () => {console.log('Hi');}
}

// 接口可以在定义类的时候去限制类的结构
// 接口中的所有属性都不能有实际值
// 接口中所有方法都是抽象方法

// 定义一个类时，可使类去实现一个接口，用 implements 关键字
class myClass implements myInter{
  name: string;
  age: number;
  gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
  sayHello() {
    console.log('大家好');
  }

}

/*
接口(interface) 和 类型别名(type) 的区别：
区别一：type 不会真的创建一个新的名字，当你在编译器上将鼠标悬停在定义为该类型别名定义的变量上时返回的是该类型别名引用的对象
       而接口会创建一个新名字 ，当你把鼠标悬停在该接口定义的变量上时返回的是该接口名。
区别二：type 不能 extends 和 implements
区别三：对于元组，联合类型时一般使用 type。
*/