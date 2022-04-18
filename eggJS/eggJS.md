# EggJS 基础

EggJS 是阿里开发的开源项目，基于 nodeJS，奉行【约定优于配置】

## 安装

`npm init egg --type=simple`

安装完后通过 `npm i` 安装所有 package.json 中的依赖，通过 npm run dev 启动项目
**start 是生产环境中使用的，一般在开发环境使用 dev**

## 页面结构

1. app：项目的开发结构
--controller：控制器目录
--public: 公共组件目录
2. config：项目的配置目录(包括系统配置文件和插件配置文件)
3. logs：项目运行后的日志文件
4. run：项目启动后的临时文件，保证项目正确运行
5. test：单元测试文件

## Controller

Controller 中包含三种页面
第一种为 restful，接收用户提供的参数，然后从数据库中查找内容返回给用户，或更新数据库
第二种为 HTML，根据用户访问的 url 返回给用户相对应的页面：

```js
// controller/test.js
'use strict';

const { Controller } = require('egg');

// EGGJS 代码规范：只要是 controller 就需要在控制器名后面加 Controller
class TestController extends Controller {
  async index() {
    const { ctx } = this; // 获取上下文
    ctx.body = '<h1>这是个人主页</h1>';
  }
}

module.exports = TestController;

// router.js 注册路由
// 第一个参数为想要注册的路径，第二个参数为对应的导出函数
router.get('/test', controller.test.index);
```

第三种为 代理服务器，将用户发来的请求转发到其他服务器，并将其他服务器返回的结果返回给用户

## get 请求接收传参

get 请求可分为自由传参模式和严格传参模式

```js
// 自由传参模式
// 参数可接收 url 地址栏上任何参数，如 http://127.0.0.1:7001/getFreeQuery?name=byl&age=19
async getFreeQuery() {
  const { ctx } = this;
  ctx.body = ctx.query; {"name": "byl", "age": "19"}
}
// router.js
router.get('/getFreeQuery', controller.test.getFreeQuery);

// 严格传参模式
// 可严格控制 url 地址栏传送多少参数，否则页面为404，如 http://127.0.0.1:7001/getStrictQuery/byl/19
async getStrictQuery() {
  const { ctx } = this;
  ctx.body = '接收到的参数name为：' + ctx.params.name + '，age为：' + ctx.params.age;
}
// router.js
router.get('/getStrictQuery/:name/:age', controller.test.getStrictQuery);
```

## post 请求接收参数

因为 url 地址栏中发出的都是 get 请求，所以可以使用 postman 模拟发送请求
由于页面设置了 csrf，所以需要在配置文件中关掉 csrf：
// config/config.default.js
config.security = {
  csrf: {
    enable: false,
  },
};

```js
// post 传参
async add() {
  const { ctx } = this;
  ctx.body = {
    status: 200,
    data: ctx.request.body,
  };
}
// router.js
router.post('/add', controller.test.add);
```

## Service

Service 封装了一个抽象层，是与数据库交互的代码

Service 优点：

- 保持 Controller 逻辑更加简单
- 保持业务逻辑的独立性，可在多个 Controller 之间调用
- 更容易编写测试用例

### 编写一个Service

首先在 app 文件夹中创建 Service 文件夹，用于存放 Service

```js
// Service/test.js
'use strict';

const { Service } = require('egg');

// 类名后缀最好带上 Service
class TestService extends Service {
  async getGirl(id) {
    return {
      id,
      name: '小红',
      age: 18,
    };
  }
}

module.exports = TestService;

// controller/test.js
// 调用 Service
async getGirl() {
  const { ctx } = this;
  const id = ctx.query.id;
  const res = await ctx.service.test.getGirl(id);
  ctx.body = res;
}

// router.js
router.get('/getGirl', controller.test.getGirl);

// 访问 http://127.0.0.1:7001/getGirl?id=18
// 得到数据: {"id":"18","name":"小红","age":18}
```

## EJS

EJS 是一个服务端渲染引擎
在 Egg.js 中安装 EJS：`npm i egg-view-ejs --save`

### 配置

```js
// plugins.js
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
// config.default.js
config.view = {
  mapping: {
    '.html': 'ejs',
  },
};
config.ejs = {};
```

### 使用

首先在 app 文件夹中创建 View 文件夹，用于存放 html 模板

```js
// controller/test.js
async index() {
  const { ctx } = this;
  await ctx.render('test.html');
}
// 接着在 view 文件夹中创建 test.html 文件，然后输入指定路由即可显示 html 页面

// render 方法的第二个参数也可以用来传参
await ctx.render('test.html', {
  name: 'byl',
  age: 18,
  hobby: ['study', 'basket', 'fuck']
});
// test.html 中可以用 <% %> 模板来接收并显示参数
// 如果不想用 % 可以在 config.default.js 中配置成任意符号
config.ejs = {
  delimiter: '$',
};

// 模板也可以将模板路径中的模板片段包含进来
<$ include header.html $>
```

## cookie

cookie 的增删改查：

- ctx.cookies.set('user', 'barlow1996', { // 添加
      maxAge: 2 * 1000, // 设置 cookie 存活时间
      httpOnly: false // 将 httpOnly 设置为 false
    });
- ctx.cookies.set('user', null); // 删除
- ctx.cookies.set('user', 'newBarlow1996'); // 修改
- const cookie = ctx.cookies.get('user'); // 查看

session 的增删改查：

- ctx.session.username = 'byl'; // 添加
- ctx.session.username = null; // 删除
- const { username } = ctx.session; // 查看

配置 session 需要在 config.default.js 里进行配置

```js
config.session = {
  key: 'BYL_SESS', // session 默认的 key 为 'EGG_SESS'，可以修改
  httpOnly: false,
  maxAge: 60 * 1000,
  renew: true, // 当用户与页面发生交互后，可以自动刷新 session 的存活时间
};
```

## 中间件(middleware)

首先在 app 文件夹下创建 middleware 文件夹来存放所有中间件
在文件中创建中间件并导出：

```js
// middleware/counter.js
module.exports = () => {
  return async (ctx, next) => {
    if(ctx.session.counter) {
      ctx.session.counter++;
    } else {
      ctx.session.counter = 1;
    }
    await next();
  };
};
// 注册全局中间件
// config.default.js:
config.middleware = ['counter'];
// 如果不想在所有路由下生效，可以配置局部中间件来指定路由
// 注册局部中间件：
config.middleware = []; // 去掉全局中间件
// router.js:
const counter = app.middleware.counter();
router.get('/index', counter, controller.test.index); // 第二个参数可以放中间件
// 配置之后只有进入 /index 时 counter 中间件才会生效
```

## 扩展属性及方法

首先在 app 文件夹下创建 extend 文件夹，用于存放所有扩展方法或属性

### extend-application

在 extend 文件夹下创建 application.js

```js
// application.js:
// 方法扩展
getTime() {
  const now = new Date();
  const year = now.getFullYear();
  const mouth = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const nowTime = `${year}年${mouth}月${date}日${hour}：${minute}：{second}`;
  return nowTime;
},
  // 属性扩展
  get week() {
    return new Date().getDay();
  },
// 在 controller.test.js 中使用：
const { ctx, app } = this; // 在全局中引入 app
const nowTime = app.getTime();
const week = app.week;
```

### extend-context

在 extend 文件夹下创建 context.js

```js
// context.js:
params(key) {
  const method = this.request.method;
  if
  (method === 'GET') {
    return key ? this.query[key] : this.query;
  }
  return key ? this.request.body[key] : this.request.body;
},
// 在 controller.test.js 中使用：
const { ctx } = this;
const params = ctx.params('name');
```

### extend-request

在 extend 文件夹下创建 request.js

```js
// request.js:
get token() {
  console.log('token', this.get('token'));
  return this.get('token');
}
// 在 controller.test.js 中使用：
const { ctx } = this;
const token = ctx.request.token;
```

### extend-response

在 extend 文件夹下创建 response.js

```js
// response.js:
set token(token) {
  this.set('token', token);
}
// 在 controller.test.js 中使用：
const { ctx } = this;
ctx.response.token = 'byl1996';
```

### extend-helper

在 extend 文件夹下创建 helper.js

```js
// helper.js:
base64Encode(str = '') {
  return new Buffer(str).toString('base64');
}
// 在 controller.test.js 中使用：
const base64 = ctx.helper.base64Encode('byl1996');
```

## 编写定时任务

首先在 app 文件夹中创建 schedule 文件夹，用于存放所有定时任务

```js
// 首先导入 egg 的 Subscription，并继承
const { Subscription } = require('egg');
class GetTime extends Subscription {
  static get schedule() {
    return { // 这里用来配置定时任务参数
      // interval: '3s', // 定时任务的时间间隔

      // 定时任务的执行时机
      /*
        每个 * 分别代表 秒(0-59)分(0-59)时(0-23)日(1-31)月(1-12)星期(0-7)
        "*/3 * * * * *"：每三秒执行一次
        "0 0 */3 * * *": 每三小时执行一次
      */
      cron: '*/3 * * * * *', 

      type: 'worker', // worker 类型为只有一个 worker 会执行该定时任务，all 类型为每个 worker 都会执行这个定时任务
    };
  }
  async subscribe() {
    console.log(Date.now());
  }
}

module.exports = GetTime;
```

## egg-mysql

若需要 egg 与 mysql 进行交互，需要安装 egg-mysql
`npm i egg-mysql --save`

### 配置方法

```js
// plugin.js:
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
}
// config.default.js:
config.mysql = {
  app: true, // 是否挂载到 app 下，默认为 true
  client: {
    host: '127.0.0.1', // 数据库地址
    port: '3306', // 数据库端口
    user: 'root',
    password: '123456',
    database: 'test-egg', // 选择要交互的数据库
  },
};
```

### 使用方法

先在 Service 文件夹中创建相应的 service 文件

```js
// 增：app.mysql.insert('表名', 参数);
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
// 删：app.mysql.delete('表名', id);
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
// 改：app.mysql.update('表名', 参数);
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
// 查：app.mysql.select('表名');
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
```

然后去 Controller 文件夹中配置对应文件（记得在 router.js 中配置路由）
通过 ctx.service.testdb.xxx(); 方法来操作数据库
