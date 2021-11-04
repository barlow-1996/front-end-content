// 定义积分牌
class Panel{
  // score 和 level 表示分数和等级
  // scoreEle 和 levelEle 表示分数和等级对应的元素
  score:number = 0;
  level:number = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  // 设置一个等级上限
  maxLevel: number;
  // 设置一个变量设置升级所需要求
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) { // 为等级上限提供一个默认值
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
  }

  // 设置加分方法
  addScore(){
    this.score++;
    this.scoreEle.innerHTML = this.score + '';
    // 判断分数是否达到等级提升要求
    if(this.score % this.upScore == 0) {
      this.levelUp();
    }
  }
  // 设置等级提升方法
  levelUp(){
    if(this.level < this.maxLevel) {
      this.level++;
      this.levelEle.innerHTML = this.level + '';
    }
  }
}
export default Panel;