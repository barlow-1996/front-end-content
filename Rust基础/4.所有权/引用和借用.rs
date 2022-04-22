
fn main() {
  let s1 = String::from("hello");
  let len = calculate_length(&s1); // 将 s1 的引用传递给 calculate_length 函数
  println!("The length of '{}' is {}.", s1, len); // 由于只引用了 s1，所以 s1 变量不会被清除
}

fn calculate_length(s: &String) -> usize {
  // s.push_str("world"); // 报错，因为借用的值无法被修改
  s.len();
}