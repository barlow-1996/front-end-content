'use strict';

const { Controller } = require('egg');

// EGGJS 代码规范：只要是 controller 就需要在控制器名后面加 Controller
class TestController extends Controller {
  async index() {
    const { ctx, app } = this;
    console.log(ctx.session.counter);
    await ctx.render('test.html', {
      nowTime: app.getTime(),
      week: app.week,
      name: 'byl',
      age: 18,
      hobby: [
        'study', 'basket', 'fuck',
      ],
    });
    // ctx.body = '<h1>这是个人主页</h1>';
  }
  // get 传参
  // 自由传参模式
  async getFreeQuery() {
    const { ctx } = this;
    ctx.body = ctx.query;
  }
  // 严格传参模式
  async getStrictQuery() {
    const { ctx } = this;
    ctx.body = '接收到的参数name为：' + ctx.params.name + '，age为：' + ctx.params.age;
  }

  // post 传参
  async post() {
    const { ctx } = this;
    ctx.body = {
      status: 200,
      data: ctx.request.body,
    };
  }

  // 调用 Service
  async getGirl() {
    const { ctx } = this;
    const id = ctx.query.id;
    const res = await ctx.service.test.getGirl(id);
    ctx.body = res;
  }

  // cookie 的增删改查
  async cookie() {
    const { ctx } = this;
    await ctx.render('cookie.html');
  }
  // 添加 cookie
  async add() {
    const { ctx } = this;
    ctx.cookies.set('user', 'barlow1996', {
      maxAge: 60 * 1000,
      httpOnly: false,
    });
    ctx.session.username = 'byl';
    ctx.body = {
      status: 200,
      data: 'cookie 添加成功',
    };
  }
  // 删除 cookie
  async del() {
    const { ctx } = this;
    ctx.cookies.set('user', null);
    ctx.session.username = null;
    ctx.body = {
      status: 200,
      data: 'cookie 删除成功',
    };
  }
  // 修改 cookie
  async edit() {
    const { ctx } = this;
    ctx.cookies.set('user', 'newBarlow1996');
    ctx.session.username = 'newbyl';
    ctx.body = {
      status: 200,
      data: 'cookie 修改成功',
    };
  }
  // 查看 cookie
  async show() {
    const { ctx } = this;
    const cookie = ctx.cookies.get('user');
    const { username } = ctx.session;
    ctx.body = {
      status: 200,
      data: {
        cookie,
        username,
      },
    };
  }
  // 扩展 context
  async newContext() {
    const { ctx } = this;
    const params = ctx.params('name');
    console.log(params);
    ctx.body = 'newContext';
  }
  // 扩展 request
  async newRequest() {
    const { ctx } = this;
    const token = ctx.request.token;
    ctx.body = {
      status: 200,
      body: token,
    };
  }
  // 扩展 request
  async newResponse() {
    const { ctx } = this;
    ctx.response.token = 'byl1996';
    const base64 = ctx.helper.base64Encode('byl1996');
    ctx.body = base64;
  }
}

module.exports = TestController;
