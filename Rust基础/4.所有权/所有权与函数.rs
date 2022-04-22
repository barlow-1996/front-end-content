fn main() {
  // 将值传递给函数，将发生移动或复制


  let s = String::from("hello!");
  makes_move(s);
  // String 类型的值传递给函数时会发生移动，将 s 传进去后值的所有者变为 some_string，s 就已经失效
  // println!("{}", s); // s 失效，因此这里会报错

  let x = 5;
  makes_copy(x); // 字符串字面值传递给函数时会发生复制，因此 x 始终有效，下面打印结果不报错
  println!("{}", x);
}
fn makes_move(some_string: String) {
  println!("{}", some_string);
}
fn makes_copy(some_number: i32) {
  println!("{}", some_number);
}