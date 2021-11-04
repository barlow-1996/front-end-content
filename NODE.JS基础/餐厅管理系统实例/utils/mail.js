// 通过该 nodemailer 可以实现发邮件

// npm 官网[npmjs.com] 下载第三方模块
// npm install nodemailer

"use strict";
const {
  rejects
} = require("assert");
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
    pass: 'tddlmdoqjmbubfdh', // smtp 验证码(登进自己的邮箱，在设置中打开smtp选项即可拿到验证码)
  },
});

function send(mail, code) {
  // 邮箱信息
  let mailObj = {
    from: '"Fred Foo 👻" <869198950@qq.com>', // sender address
    to: mail, // list of receivers
    subject: "邮箱验证码", // Subject line
    text: `您的验证码是：${code}，有效期五分钟。`, // plain text body
  }
  return new Promise((resolve, reject) => {
    // 发送邮件
    transporter.sendMail(mailObj, (err, data) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  })

}

module.exports = {
  send
}