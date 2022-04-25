# rust 代码组织

模块系统：
· Packages（包）： Cargo 的特性，它允许构建、测试和分享 crate
· Crates（单元包）：一个模块树，它形成了库或可执行文件
· Modules（模块）和 use： 允许控制作用域和私有路径
· path（路径）：为 struct、function 或 module 等命名的方式

## Packages

一个 Package 包含：
· 1 个 Cargo.toml，它描述了如何构建这些 Crates
· 只能包含 0-1 个 library crate
· 可包含任意多个二进制 crate(binary crate)
· 必须至少包含一个 crate，无论是库的还是二进制的

## Crate 类型

- binary（二进制）
- library（库）

Crate Root 是源代码文件，rust 编译器从这里开始

src/main.rs：是 binary crate 的 crate root，crate名与 package名相同
src/lib.rs：是 library crate 的 crate root，crate名与 package名相同
一个 Package 可同时包含 src/main.rs 和 src/lib.rs，即 一个 binary crate 和一个 library crate
Cargo 把 crate root 文件交给 rustc 来构建 library 或 binary

## Module

module 在一个 crate 内，可将代码进行分组，且可增加代码可读性、易于复用，并控制项目的私有性（public、private）

建立 module：
· mod 关键字
· 可嵌套
· 可包含其他项（struct、enum、常量、trait、函数等）的定义

src/main.rs 和 src/lib.rs 都叫做 crate root，这俩文件(任意一个)内容形成了 crate 模块，位于整个模块的根部
my-project/src/lib.rs 中模块树的结构：
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment

## Path

路径的两种形式：
· 绝对路径：从 crate 根开始，以 crate 名或者字面值 crate 开头
· 相对路径：从当前模块开始，以 self、super 或当前模块的标识符开头
self 相当于 ./ 表示当前文件夹；super 相当于 ../ 表示父级文件夹

路径至少由一个标识符组成，标识符之间使用 :: 分隔

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}
// 调用 add_to_waitlist 方法
pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();

    // 相对路径
    // 函数 eat_at_restaurant 与 模块 front_of_house 在同一级内，相对路径可省略 crate
    front_of_house::hosting::add_to_waitlist();
}

fn serve_order() {}
// 调用 serve_order
mod back_of_house {
    fn fix_incorrect_order() {
        cook_order(); // 同一级方法可直接调用
        super::serve_order(); // 父级方法需用super
        crate::serve_order(); // 绝对路径
    }

    fn cook_order() {}
}
```

## 私有边界

模块不仅可组织代码，还可定义私有边界，若想将函数或 struct 等设为私有，则可将它放入某模块中
rust 中所有项(函数、方法、结构体、枚举、模块和常量)默认为私有，可使用 pub 关键字设为公有，使子模块的内部部分暴露给上级模块

设置 struct 为公有时，该结构体内字段仍为私有，需在字段名前加 pub 关键字变为公有字段
设置 enum 为公有时，该枚举内部变体也变为公共

父级模块无法访问子模块中的私有项，而子模块可使用所有祖先模块中的项
在上方代码中，front_of_house 默认为私有，而 eat_at_restaurant 可访问 front_of_house 是因为它俩都是该文件中的根级，根级之间可相互调用

## use 关键字

可使用 use 关键字将路径导入作用域内(但仍遵守私有性规则)
当引用某一函数时，习惯用法是用 use 关键字指定作用域到其父级模块
当引用函数以外项时(struct\enum)，习惯用法是用 use 关键字指定作用域到其本身

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
        fn private_function() {}
    }
}
// 使用 use 将 hosting 引入当前作用域，引入时可用绝对路径或相对路径
use crate::front_of_house::hosting; // 绝对路径
use front_of_house::hosting; // 相对路径

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist(); // hosting 当前作用域为全局，所以可直接调用内部的 add_to_waitlist
    // hosting::private_function(); // 由于 private_function 默认为私有，所以无法调用 hosting 内部的 private_function
}
```

### 使用 as 起别名

当遇到要引入不同父级下的同名函数时，可用 as 为该函数起别名

```rust
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {}
fn function2() -> IoResult {}
```
