// 定义食物类 Food
class Food{
  // 定义一个属性表示食物所对应的元素
  element:HTMLElement;
  constructor(){
    // 获取页面中的food元素并将其赋值给element
    this.element = document.getElementById('food')!;
  }

  // 获取食物x轴坐标的方法
  get X(){
    return this.element.offsetLeft;
  }
  // 获取食物y轴坐标的方法
  get Y(){
    return this.element.offsetTop;
  }

  // 修改食物的位置方法
  change() {
    // 生成随机位置
    // 食物位置最小是0，最大是290(300-10)
    // 蛇一次移动就是一格，也就是10，所以要求事物的坐标必须是10的倍数
    let left = Math.round(Math.random() * 29) * 10;
    let top = Math.round(Math.random() * 29) * 10;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }
}

export default Food;