# Rust 简介

Rust 来自 Mozilla 公司，是一种可靠且高效的软件，可用来替换 C/C++
Rust 是一个静态且强类型的语言
优点：运行速度快、能保证内存安全

## 安装 Rust

`https://www.rust-lang.org/zh-CN/tools/install` 去官网进行安装
若在 VSCode 中使用需安装 Rust 插件

- rustc --version: 查看 Rust 版本
- rustup update: 可更新 Rust 版本
- rustup self uninstall：可卸载 Rust

- rustup doc: 可开启本地学习文档

## 安装 Visual Studio

若不安装 Visual Studio 则 Rust 在编译时会报错： "linking with `link.exe` failed"
`https://visualstudio.microsoft.com/zh-hans/vs/older-downloads/` 下载 VS 历史版本
下载后在工作负荷中选中 "使用 C++ 桌面开发" 进行安装，否则不会安装 link.exe

## 编译与运行

编译：rustc xxx.rs
运行: .\xxx.exe

编译和运行是单独的两步，编译成功后 windows 还会生成一个 .pdb 文件，里面包含调试信息
Rust 是一种预编译语言，可对程序先编译，然后将可执行文件交给别人(别人无需安装 Rust 环境)

## 程序解剖

main 函数是每个 Rust 可执行程序最先运行的代码
println! 是 Rust 的一个宏(macro)，如果是函数的话就不加感叹号
