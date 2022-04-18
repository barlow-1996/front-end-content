'use strict';

module.exports = {
  // 方法扩展
  getTime() {
    const now = new Date();
    const year = now.getFullYear();
    const mouth = now.getMonth() + 1;
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const nowTime = `${year}年${mouth}月${date}日${hour}：${minute}：${second}`;
    return nowTime;
  },
  // 属性扩展
  get week() {
    return new Date().getDay();
  },
};
