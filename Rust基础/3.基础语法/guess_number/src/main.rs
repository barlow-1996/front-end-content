// 标准库(std)为外部包，但与下面的 rand 不同，无需在 .toml 中定义，但也需用 use 将 std 中特定项引入
use std::io;
use std::cmp::Ordering; // Ordering 是一个枚举类型，成员有 Less、Greater 和 Equal
use rand::Rng; // 在 .toml 文件中定义完依赖后引入该依赖，Rng 是一个 trait，它定义了随机数生成器应实现的方法

fn main() {
    println!("猜数游戏!");

    // thread_rng 就是一个随机数生成器，gen_range 是产生随机数的方法，提供两个参数，分别为最小值和最大值
    let target = rand::thread_rng().gen_range(1, 101);

    loop { // 为了实现多次猜测功能，需要放入循环中
        println!("请输入一个数：");

        // 在 Rust 中，let 声明的变量都是不可变的，若要修改变量值则需加上关键字 mut
        // String::new() 表示定义了一个 String 类型的实例，::表示 new 是 String 类型下的函数
        let mut guess = String::new();

        // 调用 io 库中的函数 stdin,调用 read_line 方法从标准输入句柄获取用户输入
        // & 为取地址符号，需要取到 guess 变量的内存地址后才能重新赋值
        // read_line 方法返回一个 io::Result，Result 与 Ordering 一样也是枚举类型，只不过成员有 Ok 和 Err
        // io::Result 实例拥有 expect 方法。若值是 Err，则显示传递给 expect 的参数。若不编写 expect 程序也能编译，但会出现警告
        io::stdin().read_line(&mut guess).expect("无法读取行");

        // {} 为占位符，打印时 {} 被替换为后面的变量，第一对 {} 被替换为字符串后第一个参数，第二对 {} 被替换为第二个参数，以此类推
        println!("你猜的数为：{}", guess);

        // 将 guess 由字符串转换为数字类型，u32 为 Rust的内置类型，表示让 parse 转换为无符号整数类型
        // parse() 也返回 Result 类型，因此可用于 match 表达式
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue, // _ 代表通配符，表示任意字符。当输入的字符串无法转换成数字时，跳出本次循环
        };

        // guess 变量有一个 cmp 方法，用于比较另一个同类型的值，接收的参数为另一个值的引用，返回 Ordering 类型
        match guess.cmp(&target) { // 一个 match 表达式由分支(arms)构成
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break; // 打破循环
            },
        }
    }
}
