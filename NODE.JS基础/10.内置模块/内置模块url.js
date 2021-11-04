const url = require ('url');

let urlString = 'https://www.baidu.com/recommend/hot/hehe?us=123&pw=456#nihao'

let urlObj = url.parse(urlString); // 该方法是把字符串转换成对象
console.log(urlObj);
// Url {
//   protocol: 'https:',
//   slashes: true,
//   auth: null,
//   host: 'www.baidu.com',
//   port: null,
//   hostname: 'www.baidu.com',
//   hash: '#nihao',
//   search: '?us=123&pw=456',
//   query: 'us=123&pw=456',
//   pathname: '/recommend/hot/hehe',
//   path: '/recommend/hot/hehe?us=123&pw=456',
//   href:
//    'https://www.baidu.com/recommend/hot/hehe?us=123&pw=456#nihao' }

let string = url.format(urlObj); // 该方法是把对象转换成字符串
console.log(string); // https://www.baidu.com/recommend/hot/hehe?us=123&pw=456#nihao