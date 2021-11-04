// 使用 class 关键字定义一个类

class Person{
  // 类中包含两个部分：属性和方法

  // 直接定义的属性是实例属性，需要通过对象的实例去访问
  // readonly 开头的属性表示是只读属性，无法被修改
  readonly name: string = 'byl'
  age: number = 18

  // 在属性前使用 static 关键字可以定义静态属性，可以直接通过类去访问
  // readonly 必须放在 static 后面
  static readonly sex: number = 0

  // 方法也可以在前面加上 static 变为静态方法，可以直接通过类访问
  sayHello() {
    console.log('fuck off');
  }
}

const per = new Person();
console.log(per);

console.log(per.name);
// per.name = 'hmy' // 这里会报错，因为 name 属性为只读属性

// console.log(Person.age); // 这里会报错，因为 age 不是 Person 的静态属性
console.log(Person.sex); // 0

per.sayHello();