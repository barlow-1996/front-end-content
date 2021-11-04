// 队列的封装
function Queue() {
  // 队列的属性
  this.items = []

  // 队列的方法
  // 向尾部添加新元素
  Queue.prototype.enqueue = function (element) {
    this.items.push(element)
  }

  // 删除头部元素，并返回该元素
  Queue.prototype.dequeue = function () {
    return this.items.length == 0 ? -1 : this.items.shift()
  }

  // 查看队列中的第一个元素
  Queue.prototype.front = function () {
    return this.items[0]
  }

  // 查询队列是否为空
  Queue.prototype.isEmpty = function () {
    return this.items.length == 0
  }

  // 查询队列中的元素个数
  Queue.prototype.size = function () {
    return this.items.length
  }

  // 将队列中内容转成字符串格式
  Queue.prototype.toString = function () {
    var queueString = ''
    for (let i = 0; i < this.items.length; i++) {
      queueString += this.items[i] + ' '
    }
    return queueString
  }
}