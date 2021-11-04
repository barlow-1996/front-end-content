const express = require('express');
const router = express.Router();
const User = require('../db/model/userModel');
const Mail = require('../utils/mail');
const jwt = require('../utils/jwt');
const { createToken } = require('../utils/jwt');

let codes = {}; // 通过内存保存验证码

/**
 * @api {post} /user/reg 用户注册
 * @apiName 用户注册
 * @apiGroup User
 *
 * @apiParam {String} us 用户名.
 * @apiParam {String} pw 密码.
 * @apiParam {String} code 邮箱验证码.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
*/
router.post('/reg', (req, res) => {
  // 获取用户数据
  let {
    us,
    pw,
    code
  } = req.body;

  if (us && pw && code) {
    // 判断验证码是否OK
    if (codes[us] != code) {
      return res.send({
        err: -4,
        msg: '验证码错误'
      })
    }
    // 用户数据完整
    User.find({
        us,
        pw
      })
      .then((data) => {
        if (data.length === 0) {
          // 用户名不存在，可以注册
          return User.insertMany({
            us,
            pw
          })
        } else {
          res.send({
            err: -3,
            msg: '用户名已存在'
          })
        }
      })
      .then(() => {
        // 返回数据
        res.send({
          err: 0,
          msg: '注册成功！'
        })
      })
      .catch((err) => {
        res.send({
          err: -2,
          msg: '注册失败'
        })
      })
  } else {
    return res.send({
      err: -1,
      msg: '参数错误'
    })
  }
  console.log(us, pw);
  // 每一次请求服务器只能返回一条数据，即 res.send 只能执行一次
})

/**
 * @api {post} /user/login 用户登陆
 * @apiName 用户登陆
 * @apiGroup User
 *
 * @apiParam {String} us 用户名.
 * @apiParam {String} pw 密码.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
*/
router.post('/login', (req, res) => {
  let {
    us,
    pw
  } = req.body;
  if (!us || !pw) {
    return res.send({
      err: -1,
      msg: '参数错误'
    })
  }
  User.find({
      us,
      pw
    })
    .then((data) => {
      // 如果数据库里找不到这个数据，则 data 会返回一个空数组
      // console.log(data);
      if (data.length > 0) {
        // 用 session 方法验证：
        // 登陆成功之后，将用户的相关信息存入session
        // req.session.login = true;
        // req.session.name = us;

        // 用 token 方法验证：
        // 从引入文件的方法中生成 token
        let token = jwt.createToken({login: true, name: us});
        // 将生成的 token 返回给前端
        console.log(token);
        res.send({
          err: 0,
          msg: '登陆成功！',
          token: token
        })
      } else {
        res.send({
          err: -2,
          msg: '用户名或密码不正确'
        })
      }
    })
    .catch((err) => {
      return res.send({err: -1, msg: '内部错误'});
    })
})

router.post('/logout', (req, res) => {
  req.session.destroy(); // 销毁保存的 session
  res.send({err: 0, msg: '已退出'});
})

/**
 * @api {post} /user/getMailCode 发送邮箱验证码
 * @apiName 发送邮箱验证码
 * @apiGroup User
 *
 * @apiParam {String} mail 用户邮箱.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
*/
// 发送邮箱验证码
router.post('/getMailCode', (req, res) => {
  let {
    mail
  } = req.body;
  // 产生随机验证码
  let code = parseInt(Math.random() * 10000);

  Mail.send(mail, code)
    .then(() => {
      // 将邮箱和对应的验证码保存到内存中
      codes[mail] = code;
      console.log(codes);
      res.send({
        err: 0,
        msg: '验证码发送成功！'
      });
    })
    .catch((err) => {
      res.send({
        err: -1,
        msg: '验证码发送失败'
      });
    })
})

module.exports = router;

/* 
nodemon 插件，可以自动更新代码，每次保存之后自动更新
安装：npm install nodemon -g
安装前运行：node server.js
安装后运行：nodemon server.js
*/