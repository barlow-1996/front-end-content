const jwt = require('jsonwebtoken');

let secret = 'abfkjabfpihsipf'; // 设置 token 的私钥
let payload = { // 这里存放传递的数据，注意这里面不能放隐秘数据(账号和密码)
  us: 123,
  pw: 456
}

// 产生一个 token (将设置的私钥和payload数据传入)
let token = jwt.sign(payload, secret); // 默认用的是 HS256 算法进行加密
console.log(token); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cyI6MTIzLCJwdyI6NDU2LCJpYXQiOjE2MDY4NzEyNz
// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cyI6MTIzLCJwdyI6NDU2LCJpYXQiOjE2MDY4NzEyNz'
// 如果向上面这样胡乱写 token，在下面验证的时候会报错
// 产生 token 后会将 token 传给前端

// 验证 token 的合法性(该方法是同步的，可以用Promise封装成异步)
// 封装成异步见 /餐厅管理/utils/jwt.js
jwt.verify(token, secret, (err, data) => {
  console.log(err); // null
  console.log(data); // { us: 123, pw: 456, iat: 1606872146 }
})