# cargo

Cargo 是 Rust 的包管理工具，安装 Rust 时自动安装 Cargo
在编译复杂程序时，无法用 rustc 编译，需要用到 cargo

## cargo 命令

- cargo --version: 查看 cargo 版本
- cargo new xxx: 创建项目
系统会在当前目录下创建一个名为 xxx 的文件夹，且项目名称也为 xxx
  ·Cargo.toml：toml 是 cargo 的配置格式

  ```rust
  [package] // 是一个区域标题，表示下方内容是用来配置包的
  name = "hello_cargo" // 项目名称
  version = "0.1.0" // 项目版本
  authors = ["Your Name <you@example.com>"] // 项目作者
  edition = "2018" // 使用的 Rust 版本

  [dependencies] // 另一个区域标题，会列出项目的依赖项
  ```

  ·src 目录 // 项目的源代码都放在该目录下
    -main.rs

若创建项目时未使用 cargo，可通过将源码放入 src 目录下并创建 cargo.toml 填写相应配置后转化为 cargo 项目

- cargo build：在项目根目录生成 target 文件夹，并创建可执行文件: target\debug\xxx.exe
第一次运行 cargo build 会在项目根目录下生成 Cargo.lock 文件，该文件计算出了所有符合要求的依赖版本
将来构建项目时 Cargo 会直接使用 Cargo.lock 文件中已存在的依赖版本

- cargo run: 构建并运行 cargo 项目，该命令相当于既执行了 cargo build，又运行了可执行文件，很常用
若之前编译成功过，且源码未改变，则执行 cargo run 就会直接运行可执行文件

- cargo check: 检查代码确保能通过编译，但不会产生任何可执行文件
cargo check 比 cargo build 快得多，编写代码时常用该命令检查代码，提高效率

- cargo build --release: 发布项目
编译时会进行优化，代码会运行更快，但编译时间更长
会在 target/release 而不是 target/debug 下生成可执行文件

- cargo update：会忽略 Cargo.lock 文件，并计算出 Cargo.toml 声明的所有依赖的最新版本
计算成功后 Cargo 会把这些版本写入 Cargo.lock 文件
