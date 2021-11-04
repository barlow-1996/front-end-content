"use strict";
class Player {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log('fuck off');
    }
}
class NBAPlayer extends Player {
    constructor(name, age) {
        // 如果在子类中定义了构造函数，在子类构造函数中必须调用父类的构造函数，否则会报错
        // super() 就相当于调用父类的构造函数
        super(name);
        this.age = age;
    }
    sayHello() {
        // super 表示当前类的父类
        super.sayHello();
    }
}
const LBJ = new NBAPlayer('lebron', 35);
console.log(LBJ);
LBJ.sayHello();
