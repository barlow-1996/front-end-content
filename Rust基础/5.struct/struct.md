# struct

结构体(struct) 是一种自定义的数据类型，近似于 JS 中的对象
定义 struct 时要使用 struct 关键字，在花括号内为所有字段定义名称和类型
例如：

```rust
struct User {
  username: String,
  email: String,
  sign_in_count: u64,
  active: bool, // 最后一组字段也要加逗号
}

// 实例化 struct 时字段的数量必须与 struct 保持一致
let mut user1 = User {
  username: String::from("barlow"),
  email: String::from("13345453697@163.com"),
  active: true,
  // sign_in_count: 820, // 若不实例化该字段会报错
};
user1.email = String::from("869198950@qq.com");
// 一旦 struct 实例是可变的，则实例中所有字段都是可变的**
```

## 字段初始化简写形式

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email, // 等同于 email: email,
        username, // 等同于 username: username,
        active: true,
        sign_in_count: 1,
    }
}
```

## 从其他实例创建更新

```rust
let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    ..user1
};
// 等同于：
// let user2 = User {
//     email: String::from("another@example.com"),
//     username: String::from("anotherusername567"),
//     active: user1.active,
//     sign_in_count: user1.sign_in_count,
// };
```

## tuple struct

若想给整个元组起名，让它不同于其他元组，且不需要给每个元素起名，则可用 tuple struct

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
// black 和 origin 是不同类型，因为它们是不同 tuple struct 实例
```

## 打印 struct

使用 println! 宏 打印 struct 结构会报错，须在定义结构体之前加上 #[derive(Debug)] 注解，并在 println! 中使用 {:#?} 替换 {}

## 定义 struct 方法

方法是在 struct 上下文中定义，方法跟函数一样具有 fn 关键字及名称
方法需在 impl 块中定义，第一个参数是 self，表示调用该方法的 struct 实例
**一个 struct 可以拥有多个 impl 块**

### 关联函数

在 impl 块中还可定义关联函数，关联函数是不把 self 作为第一个参数的函数
调用关联函数时用 `::` 调用，例如 String::from()
