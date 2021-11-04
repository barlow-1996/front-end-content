class Snake {
  // 表示蛇头元素
  head: HTMLElement;
  // 表示蛇身元素
  bodies: HTMLCollection;
  // 表示蛇的整体
  element: HTMLElement;

  constructor() {
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.element = document.getElementById('snake')!;
    this.bodies = this.element.children;
  }

  // 获取蛇的坐标(蛇头)
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }

  set X(value: number) {
    // 如果新值无变化，则直接返回，不用再次赋值
    if (this.X === value) return;

    // 判断蛇是否撞墙
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了！');
    }

    // 判断蛇是否发生了掉头，即蛇在往左移动时，不能向右走，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // 判断蛇的第二节是否存在，若存在，蛇头与蛇的第二节位置发生重叠，则说明掉头了
      // 如果发生了掉头，让蛇向反方向继续移动
      if (value > this.X) { // 说明向右掉头，此时应该让蛇继续往左走
        value = this.X - 10;
      } else { // 说明向左掉头，此时应该让蛇继续往右走
        value = this.X + 10;
      }
    }

    // 移动身体
    this.moveBody();

    // 蛇的新位置满足要求，让蛇移动
    this.head.style.left = value + 'px';

    // 蛇头移动后，检查是否撞到蛇身
    this.isCollision();
  }
  set Y(value: number) {
    // 如果新值无变化，则直接返回，不用再次赋值
    if (this.Y === value) return;

    // 判断蛇是否撞墙
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了！');
    }

    // 判断蛇是否发生了掉头，即蛇在往上移动时，不能向下走，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // 判断蛇的第二节是否存在，若存在，蛇头与蛇的第二节位置发生重叠，则说明掉头了
      // 如果发生了掉头，让蛇向反方向继续移动
      if (value > this.Y) { // 说明向下掉头，此时应该让蛇继续往上走
        value = this.Y - 10;
      } else { // 说明向上掉头，此时应该让蛇继续往下走
        value = this.Y + 10;
      }
    }

    // 移动身体
    this.moveBody();

    // 蛇头的新位置满足要求，让蛇移动
    this.head.style.top = value + 'px';

    // 蛇头移动后，检查是否撞到蛇身
    this.isCollision();
  }

  // 蛇长度增加的方法
  addBody() {
    // 向element添加一个div
    this.element.insertAdjacentHTML('beforeend', '<div></div>');
  }

  // 添加蛇身体移动的方法
  moveBody() {
    // 将后一节身体的位置设置为前一节身体的位置
    // 比如：第四节位置变为第三节的位置，第三节变为第二节的位置，第二节位置变为蛇头的位置
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前一节身体的位置
      let preX = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let preY = (this.bodies[i - 1] as HTMLElement).offsetTop;
      // 设置当前这一节
      (this.bodies[i] as HTMLElement).style.left = preX + 'px';
      (this.bodies[i] as HTMLElement).style.top = preY + 'px';
    }
  }

  // 检查蛇头与身体是否相撞
  isCollision() {
    // 获取所有身体位置，检查是否和蛇头的位置重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let body = this.bodies[i] as HTMLElement;
      // 进入判断
      if (this.X === body.offsetLeft && this.Y === body.offsetTop) { // 撞到身体了
        throw new Error('蛇撞到自己了！');
      }
    }
  }
}

export default Snake;