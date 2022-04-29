# Trait

Trait 类似于 JAVA 中的接口，会告诉编译器某种类型拥有可能与其他类型共享的功能

声明一个 Trait 用 trait 关键字，后面是 trait 名，在大括号中声明描述实现这个 trait 的类型所需行为的方法签名
pub trait Summary {
    fn summarize(&self) -> String;
}

## 在类型上实现 Trait

```rust
// src/lib.rs
pub trait Summary {
    fn summarize(&self) -> String { // trait 默认实现
        String::from("(Read more...)")
    }
}
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String
}
impl Summary for NewsArticle { // impl xxx for yyy，在 yyy 类型上实现 xxx Trait
    // 若想用默认 trait 方法，可通过 impl Summary for NewsArticle {} 指定一个空的 impl 块
    // fn summarize(&self) -> String {
    //     format!("{}, by {} ({})", self.headline, self.author, self.location)
    // }
}

pub struct Tweet {
    pub username: String,
    pub content: String
}
impl Summary for Tweet {
    fn summarize(&self) -> String { // 对 trait 中方法进行重写
        format!("{}: {}", self.username, self.content)
    }
}

// src/main.rs
use demo::Summary // 必须要引入 Trait 声明，否则报错
let tweet = Tweet {
    username: String::from("horse_ebooks"),
    content: String::from("of course, as you probably already know, people"),
};

println!("1 new tweet: {}", tweet.summarize());
```

Trait 实现约束：只有当 trait 或要实现 trait 的类型位于 crate 本地作用域时，才能为该类型实现 trait

## trait 作为参数

使用 trait 可接受多种不同类型的参数

```rust
// 例如在上例为 NewsArticle 和 Tweet 类型实现 Summary trait
pub fn notify(item: impl Summary) { // 该参数支持任何实现了指定 trait 的类型
    println!("Breaking news! {}", item.summarize());
}
// 或者用 trait bound 语法
pub fn notify<T: Summary>(item: T) {
    println!("Breaking news! {}", item.summarize());
}

若指定多个 trait 类型，用 + 即可
pub trait Another {}
// impl trait 写法：
pub fn notify(item: impl Summary + Another) {
    println!("Breaking news! {}", item.summarize());
}
// trait bound 写法：
pub fn notify<T: Summary + Another>(item: T) {
    println!("Breaking news! {}", item.summarize());
}

// trait bound 使用 where 子句
//多个泛型参数的函数在名称和参数列表之间会有很长的 trait bound 信息
fn some_function<T: Display + Clone, U: Clone + Debug>(t: T, u: U) -> i32 {}
// 使用 where 子句易于阅读
fn some_function<T, U>(t: T, u: U) -> i32
    where T: Display + Clone,
          U: Clone + Debug
{}

// 可在返回值中使用 impl Trait 语法，来返回实现了某个 trait 的类型
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        retweet: false,
    }
}
```
