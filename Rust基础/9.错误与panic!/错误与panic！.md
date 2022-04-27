# 错误与 panic

rust 错误分类：
· 可恢复错误(例如文件未找到，可再次尝试)
· 不可恢复错误(例如访问索引超出范围)

## 不可恢复的错误

当 rust 遇到不可恢复的错误时，会执行 panic! 宏
执行宏时，程序会打印出错误信息，展开并清理栈数据，然后退出程序

panic 会默认展开调用栈并清理遇到的每一个函数数据，该过程工作量很大
另一种选择是直接终止调用栈，这会不清理数据直接退出程序
若要设置为终止，需在 Cargo.toml 的 `profile` 部分增加 panic = 'abort'

```rust
[profile.release]
panic = 'abort'
```

## Result 枚举与可恢复错误

Result 枚举:
enum Result<T, E> {
  Ok(T), // 操作成功时，返回 Ok 变体中的数据
  Err(E) // 操作失败时，返回 Err 变体中的数据
}

```rust
// 利用 match 表达式处理 Result
let f = File::open("hello.txt");
let f = match f {
  Ok(file) => file,
  Err(error) => {
    panic!("Problem opening the file: {:?}", error)
  },
};
// unwrap 是 match 的快捷方法，相当于以上代码。若 result 结果为 Ok 则返回里面的值，若为 Err，则会调用 panic! 宏
let f = File::open("hello.txt").unwrap();

// expect 方法允许自定义错误信息
let f = File::open("hello.txt").expect("无法打开指定文件");

// ? 运算符是传播错误的快捷方法，若 result 结果是 Ok，则 Ok 值就为表达式结果，然后继续往后执行程序
// 若 result 值是 Err，Err 中的值将作为整个函数的返回值，相当于使用了 return 关键字
// ? 运算符只适用于返回类型为 Result 的函数
fn read_username_from_file() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?; // 相当于以下代码
    // let f = File::open("hello.txt");
    // let mut f = match f {
    //   Ok(file) => file,
    //   Err(e) => return Err(e),
    // };
}

```

## 使用 panic! 的时机

在定义一个可能失败的函数时，优先考虑返回 Result，否则使用 panic!
定义原型代码时常用 unwrap 和 expect
当代码最终可能处于损坏状态时，最好使用 panic!

场景建议：
· 调用代码时，传入无意义的参数值：panic!
· 调用外部代码时，返回非法状态且无法修复：panic!(若失败是可预期的最好返回Result)
