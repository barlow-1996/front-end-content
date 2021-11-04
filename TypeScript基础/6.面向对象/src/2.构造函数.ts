class Cat{
  name: string;
  age: number;

  // 构造函数，该函数会在对象创建时调用
  constructor(name: string, age: number) {
    // console.log('构造函数执行了');
    // 在实例方法中，this就指向当前的实例。构造函数中的this就是当前新建的那个对象
    console.log(this);
    this.name = name;
    this.age = age
  }

  bark() {
    // 在方法中可以通过 this 来表示当前调用方法的对象
    console.log(this.name);
  }
}

let cat1 = new Cat('新一', 1);
console.log(cat1);
cat1.bark();