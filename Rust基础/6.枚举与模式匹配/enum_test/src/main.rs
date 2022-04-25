#[derive(Debug)]
// 枚举变体中可关联任意类型的数据，包括 struct 类型
enum Message {
    Quit, // 未关联任何类型数据
    Move { x: i32, y: i32 }, // 关联一个匿名 struct
    Write(String), // 关联一个字符串
    ChangeColor(i32, i32, i32), // 关联 3 个 i32 类型
}
// 为枚举定义方法
impl Message {
    fn call(&self) {
        println!("{:#?}", self);
    }
}


fn main() {
    let q = Message::Quit;
    let m = Message::Move {x: 12, y: 24};
    let w = Message::Write(String::from("helloworld"));
    let c = Message::ChangeColor(0, 255, 255);

    m.call();
}
