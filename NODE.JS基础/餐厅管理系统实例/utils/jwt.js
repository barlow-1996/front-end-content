const { rejects } = require('assert');
const jwt = require('jsonwebtoken');
const { resolve } = require('path');

const secret = 'ahfihsmfhoashf';


// 该方法接收一个 payload 来生成 token
function createToken(payload) { 
  payload.ctime = Date.now(); // 加个时间戳，表示创建时间
  return jwt.sign(payload, secret);
}

// 该方法接收一个 token 来验证这个 token
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, data) => {
      if(err) {
        reject('token 验证失败');
      } else {
        resolve(data);
      }
    })
  })
}

module.exports = {
  createToken, verifyToken
}