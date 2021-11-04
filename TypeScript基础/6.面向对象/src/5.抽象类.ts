
// 以 abstract 开头的类是抽象类
// 抽象类和其他类的区别在于不能用来创建对象，它的作用就是专门用来被继承的类
abstract class People{
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 抽象类中可以添加抽象方法
  // 抽象方法使用 abstract 开头，并且没有方法体
  // 抽象方法只能定义在抽象类，且子类必须对抽象方法进行重写
  abstract sayHello(): void;
}
// const some = new Animal() // 这里会报错，无法创建抽象类的实例
class Man extends People{
  // 这里如果不重写这个方法就会报错
  sayHello() {
    console.log('fuck off');
  }
}

const byl = new Man('大帅哥', 20);
console.log(byl);
byl.sayHello();