use minigrep::Config;
use std::env; // 处理命令行模块
use std::process; // 处理程序运行状态

fn main() {
    let args: Vec<String> = env::args().collect(); // 获取命令行参数

    let config = Config::new(&args).unwrap_or_else(|err| { // unwrap_or_else 方法处理 Result 类型，若为 Ok 则返回 Ok 中结果；若为 Err，执行闭包函数
        println!("Problem parsing arguments: {}", err);
        process::exit(1); // 会立即停止程序并将传递给它的数字作为退出状态码
    });

    if let Err(e) = minigrep::run(config) { // 如果返回的 result 是错误变体
        println!("Application error: {}", e);
        process::exit(1);
    }
}