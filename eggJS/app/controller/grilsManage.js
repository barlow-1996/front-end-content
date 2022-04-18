'use strict';

const { Controller } = require('egg');

class girlsManageController extends Controller {
  async addGirl() {
    const { ctx } = this;
    const params = {
      id: 3,
      name: '小苍',
      age: 17,
      skill: 'net',
    };
    const res = await ctx.service.testdb.addGirl(params);
    if
    (res) {
      ctx.body = '添加女孩成功';
    } else {
      ctx.body = '添加女孩失败';
    }
  }
  async delGirl() {
    const { ctx } = this;
    const id = { id: 3 }; // 一定要传一个对象，如果传数字则会把该表的所有数据删除
    const res = await ctx.service.testdb.delGirl(id);
    if
    (res) {
      ctx.body = '删除女孩成功';
    } else {
      ctx.body = '删除女孩失败';
    }
  }
  async updateGirl() {
    const { ctx } = this;
    const params = {
      id: 2,
      name: '小波',
      age: 25,
      skill: 'read',
    };
    const res = await ctx.service.testdb.updateGirl(params);
    if
    (res) {
      ctx.body = '修改女孩成功';
    } else {
      ctx.body = '修改女孩失败';
    }
  }
  async showGirl() {
    const { ctx } = this;
    const res = await ctx.service.testdb.getGirl();
    ctx.body = '查询女孩:' + JSON.stringify(res);
  }
}

module.exports = girlsManageController;
