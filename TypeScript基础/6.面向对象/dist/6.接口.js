"use strict";
const obj = {
    name: 'byl',
    age: 18
};
const obj1 = {
    name: 'byl',
    age: 18,
    gender: '男',
    sayHello: () => { console.log('Hi'); }
};
// 接口可以在定义类的时候去限制类的结构
// 接口中的所有属性都不能有实际值
// 接口中所有方法都是抽象方法
// 定义一个类时，可使类去实现一个接口，用 implements 关键字
class myClass {
    constructor(name, age, gender) {
        this.name = name,
            this.age = age,
            this.gender = gender;
    }
    sayHello() {
        console.log('大家好');
    }
}
