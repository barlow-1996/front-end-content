const cheerio = require('cheerio');

let $ = cheerio.load('<div><p>你好</p><img src="http://www.baidu.com"><img src="https://www.douyu.com"></div>')
// 将一组 html 格式字符串转换成类 dom 之后可以通过 jq 的语法选中其中元素
console.log($('img').attr('src')); // http://www.baidu.com
console.log($('p').text()); // 你好

// 将两个 src 属性值全部拿出来
$('img').each((index, value) => {
  console.log($(value).attr('src'));
}); // http://www.baidu.com
    // https://www.douyu.com