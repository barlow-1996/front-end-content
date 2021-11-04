// 爬虫案例
// 第一步：获取目标网站  http/https.get
// 第二步：分析网站内容  第三方模块 cheerio(可以使用jq里的选择器)
// 第三步：获取有效信息，并进行下载或其他操作

const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');

let url = 'https://cn.vuejs.org/';
let json = 'http://nodejs.cn/api/https.html'
https.get(url, (res) => {
  // 1. 安全判断
  const {statusCode} = res; // 状态码
  const contentType = res.headers['content-type']; // 文件类型
  console.log(statusCode, contentType);

  let err = null;
  if(statusCode !== 200) {
    err = new Error('请求状态错误');
  }else if(!/^text\/html/.test(contentType)) {
    // 格式类型是网页
    err = new Error('请求类型错误');
  }

  // err 为真，则上面两个有一个错误
  if(err) {
    console.log(err);
    res.resume(); // 清空缓存
    return false;
  }

  // 2. 数据处理
  // 数据分段，只要接收到数据就会触发该事件；chunk 为每次接收的数据片段
  let rawData = ''; // 该变量负责接收合并后的完整数据
  res.on('data', (chunk) => {
    rawData += chunk;
    // console.log(rawData);
  })

  // 数据流传输完毕触发该事件
  res.on('end', () => {
    // 将请求的数据保存到本地
    // fs.writeFileSync('./vuejs.html', rawData);

    console.log('数据传输完毕');

    // 通过 cheerio 分析
    let $ = cheerio.load(rawData); // 将请求的网页信息进行转化
    $('img').each((index, value) => {
      console.log($(value).attr('src')); 
    })
  })
}).on('error', (err) => {
  console.log('请求错误', err.message);
})