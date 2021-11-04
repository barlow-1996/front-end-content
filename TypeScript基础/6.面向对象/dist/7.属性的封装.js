"use strict";
(function () {
    class Person {
        // name: string;
        // age: number
        // constructor(name: string, age: number) {
        //   this.name = name;
        //   this.age = age;
        // }
        // 可以直接将属性定义在构造函数中
        // 下面这种定义跟上面一样，是种语法糖
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }
    const per = new Person('byl', 18);
    console.log(per); // Person {name: "byl", age: 18}
    // 现在属性是在对象中设置的，可随意被修改，有很大的安全隐患
    per.name = 'hmy';
    per.age = 20;
    console.log(per); // Person {name: "hmy", age: 20}
    /* TS 可在属性前添加修饰符：
       public：公有属性，可在任意位置访问(修改)属性，属性默认为 public
       private：私有属性，只能在当前类内部访问(修改)属性，它的子类也无法访问
          - 可以通过在类中添加 getter 和 setter 方法使得私有属性可被外部访问
       protected：受保护属性，只能在当前类和当前类的子类中访问(修改)属性
    */
    class NewPerson {
        // private age: number;
        constructor(name, age) {
            this.name = name;
            // this.age = age;
        }
        // 定义 getter 方法，用来读取 name 属性
        getName() {
            return this.name;
        }
        // 定义 setter 方法，用来设置 name 属性
        setName(name) {
            this.name = name;
        }
        // getter 和 setter 方法被称为属性的存取器
        // TS 中设置 getter 和 setter 方法有简写的方式:
        get age() {
            return this.age;
        }
        set age(value) {
            this.age = value;
        }
    }
    // 如果有安全隐患，可以不写 setter 方法，即该属性只能被外界访问，但无法修改
    const newPer = new NewPerson('byl', 18);
    console.log(newPer); // NewPerson {name: "byl", age: 18}
    // console.log(newPer.name); // 这里会报错，因为 name 是私有属性，无法在外部直接访问
    console.log(newPer.getName()); // byl
    newPer.setName('hmy');
    console.log(newPer.getName()); // hmy
})();
