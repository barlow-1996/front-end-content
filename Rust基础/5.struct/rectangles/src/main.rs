#[derive(Debug)]
struct Rectangle {
    width: i32,
    height: i32
}
impl Rectangle {
    fn area(&self) -> i32 {
        self.width * self.height
    }
    // 判断一个长方形能否容纳另一个长方形
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
    // 利用关联函数创建一个正方形
    fn square(width: i32) -> Rectangle {
        Rectangle {
            width,
            height: width
        }
    }
}
fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50
    };
    println!("The area of the rectangle is {} square pixels.", rect.area());

    // 打印 struct 类型
    println!("{:#?}", rect);

    let rect2 = Rectangle {
        width: 60,
        height: 90
    };
    println!("{}", rect2.can_hold(&rect));

    let square = Rectangle::square(50);
    println!("{:#?}", square);
}
