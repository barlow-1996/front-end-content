'use strict';

const { Service } = require('egg');
// 操作数据库的命令最好用 try-catch 语句封装
class testdbService extends Service {
  async addGirl(params) {
    try {
      const { app } = this;
      const res = await app.mysql.insert('girls', params);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async delGirl(id) {
    try {
      const { app } = this;
      const res = await app.mysql.delete('girls', id);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updateGirl(params) {
    try {
      const { app } = this;
      const res = await app.mysql.update('girls', params);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getGirl() {
    try {
      const { app } = this;
      const res = await app.mysql.select('girls'); // 选择 girls 表
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = testdbService;
