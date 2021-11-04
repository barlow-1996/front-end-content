const qs = require('querystring');

// parse：该方法将query字符串变成query对象

let string = 'name=byl&pass=123&sex=0';
let obj = qs.parse(string);
console.log(obj); // { name: 'byl', pass: '123', sex: '0' }
// parse 除了第一个字符串参数后，还有两个参数
// 第一个是键值对分割标识
// 第二个是切分键和值的标识
let otherString = 'name-byl#pass-123#sex-0';
let otherObj = qs.parse(otherString, '#', '-');
console.log(otherObj); // { name: 'byl', pass: '123', sex: '0' }

// stringify:该方法将query对象变成query字符串

let objToString = {
  name: 'byl',
  pass: '123',
  sex: '0'
};
let stringify = qs.stringify(objToString);
console.log(stringify); // name=byl&pass=123&sex=0
// stringify也能自己指定切分的标识
let stringify01 = qs.stringify(objToString, '^', '?')
console.log(stringify01); // name?byl^pass?123^sex?0

// escape:对字符串内容做编码操作

let stringec = 'w=你好&foo=bar';
let result01 = qs.escape(stringec);
console.log(result01); // w%3D%E4%BD%A0%E5%A5%BD%26foo%3Dbar

// unescape:对字符串内容做解码操作
let stringuec = 'w%3D%E4%BD%A0%E5%A5%BD%26foo%3Dbar';
let result02 = qs.unescape(stringuec);
console.log(result02); // w=你好&foo=bar