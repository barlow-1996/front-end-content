// 游戏控制器，控制其他类
// 所以要引入其他类
import Snake from './Snake';
import Panel from './Panel';
import Food from './food';

class GameControl {
  // 定义三个属性
  snake: Snake;
  panel: Panel;
  food: Food;

  // 创建一个属性来设置蛇的移动方向(也就是按键的方向)
  direction: string = '';
  // 创建一个属性来记录游戏是否结束
  isLive: boolean = true;

  constructor() {
    this.snake = new Snake();
    this.panel = new Panel();
    this.food = new Food();
    this.init();
  }

  // 游戏初始化
  init() {
    // 绑定键盘按键按下事件
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    this.run();
  }

  // 创建键盘按下响应函数
  keydownHandler(event: KeyboardEvent) {
    // console.log(event);
    /*
    "ArrowUp"
    "keydown"
    "ArrowLeft"
    "ArrowRight"
    */
    // 检查用户按下的键是否合法
    this.direction = event.key;
  }

  // 控制蛇移动的方法
  run() {
    // 获取蛇目前的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    // 根据 this.direction 属性来使蛇的位置改变
    switch (this.direction) {
      // 向上移动，top 减少
      case "ArrowUp":
        Y -= 10;
        break;
      // 向下移动，top 增加
      case "ArrowDown":
        Y += 10;
        break;
      // 向左移动，left 减少
      case "ArrowLeft":
        X -= 10;
        break;
      // 向右移动，left 增加
      case "ArrowRight":
        X += 10;
        break;
    }
    // 判断蛇是否吃到食物
    this.isEat(X, Y);

    // 判断蛇是否撞墙
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (error) {
      alert(error.message);
      this.isLive = false;
    }

    // 开启一个定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.panel.level - 1) * 30);
  }

  // 检查蛇是否吃到食物
  isEat(X:number, Y:number) {
    if(X === this.food.X && Y === this.food.Y) {
      // 食物的位置要重置
      this.food.change();
      // 分数要增加
      this.panel.addScore();
      // 蛇要增加一节
      this.snake.addBody();
    }
  }
}

export default GameControl;