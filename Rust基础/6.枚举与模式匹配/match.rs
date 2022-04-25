#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska
}

enum Coin {
  Penny,
  Nickel,
  Dime,
  Quarter(UsState)
}

fn value_in_cents(coin: Coin) -> u8 {
  match coin {
      Coin::Penny => 1,
      Coin::Nickel => 5,
      Coin::Dime => 10, // match 必须列举所有匹配可能，若该行注释掉会报错
      Coin::Quarter(state) => {
        println!("State quarter from {:?}!", state);
        25
      }
  }
}

fn main() {
  let coin = Coin::Quarter(UsState::Alaska);
  println!("{}", value_in_cents(coin));

  let v = Some(0u8);
  if let Some(3) = v {
    println!("three");
  }
}