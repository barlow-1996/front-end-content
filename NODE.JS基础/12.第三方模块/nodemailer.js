// 通过该 nodemailer 可以实现发邮件

// npm 官网[npmjs.com] 下载第三方模块
// npm install nodemailer

"use strict";
const nodemailer = require("nodemailer");

// 创建发送邮箱的对象
let transporter = nodemailer.createTransport({
  // 通过 lib/well-known/services.json查找相关邮箱信息
  // "QQ": {
  //   "domains": ["qq.com"],
  //   "host": "smtp.qq.com",
  //   "port": 465,
  //   "secure": true
  // },
  host: "smtp.qq.com", // 发送方的邮箱(qq,网易邮箱等)
  port: 465, // 端口号
  secure: true, // 为true的端口号为465，为false则端口号为其他
  auth: {
    user: '869198950@qq.com', // 发送方的邮箱地址
    pass: 'svelykddxyypbcha', // smtp 验证码(登进自己的邮箱，在设置中打开smtp选项即可拿到验证码)
  },
});

// 邮件信息
let mailobj = {
  from: '"Fred Foo 👻" <869198950@qq.com>', // sender address
  to: "13345453697@163.com", // list of receivers
  subject: "邮箱验证码", // Subject line
  text: "您的验证码是：759486，有效期五分钟。", // plain text body
  // html: "<b>Hello world?</b>", // html body
}

// 发送邮件
transporter.sendMail(mailobj, (err, data) => {
  console.log(err);
  console.log(data);
});