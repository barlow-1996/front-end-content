fn main() {
  let mut s = String::from("hello world");
  let len = first_word(&s);
  println!("{}", len); // 5
}

fn first_word(s: &String) -> &str {
  let bytes = s.as_bytes(); // 将字符串转为数组

  for (i, &item) in bytes.iter().enumerate() { // enumerate 方法会将每个数据包装成一个元组，元组第一个元素为索引，第二个元素为数组中的数据
    if item == b' ' { // b' ' 表示匹配空格
      return &s[..i];
    }
  }
  &s[..]
}