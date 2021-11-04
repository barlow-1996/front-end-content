"use strict";
// 以 abstract 开头的类是抽象类
// 抽象类和其他类的区别在于不能用来创建对象，它的作用就是专门用来被继承的类
class People {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
// const some = new Animal() // 这里会报错，无法创建抽象类的实例
class Man extends People {
    // 这里如果不重写这个方法就会报错
    sayHello() {
        console.log('fuck off');
    }
}
const byl = new Man('大帅哥', 20);
console.log(byl);
byl.sayHello();
