class Animal{
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log('动物在叫');
  }
}

// 用 extens 使 Dog 类继承 Animal 类。此时 Animal 被称为父类，Dog 被称为子类
// 使用继承后，子类会拥有父类所有的属性和方法。通过继承可将多个子类中公有的代码写在一个父类中
class Dog extends Animal{
  run() {
    console.log(`${this.name}在跑`);
  }

  // 子类可以对继承的方法重写，即覆盖掉父类的方法
  sayHello() {
    console.log('汪汪汪');
  }
}
const dog = new Dog('旺财', 5);
console.log(dog);
dog.run();


class Pig extends Animal{}
const george = new Pig('乔治', 10);
console.log(george);