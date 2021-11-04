const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/local', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection; // 数据库的连接对象

// 连接失败回调
db.on('error', console.error.bind(console, 'connection error:'));

// 连接成功回调
db.once('open', function () {
  console.log('db ok');
});


// 创建一个和集合相关的 schema 对象（类似表头）
// mongoose 对数据库的操作都是通过这个对象进行操作的
// 获取 schema 对象
var userSchema = new mongoose.Schema({
  us: {type: String, required: true}, // 第二个参数为是否必需
  pw: {type: String, required: true},
  age: Number,
  sex: {type: Number, default: 0},
  hobby: String
});

// 将 schema 对象转化为数据模型(model)
// 该数据对象和集合关联，第一个参数为集合名，第二个参数为 schema 对象。（'集合名'，schema对象）
var User = mongoose.model('users', userSchema); 

// 操作数据库

// 插入数据
// User.insertMany({us: 'byl', pw: 'b2175112', age: 20})
// .then(
//   data => {
//     console.log(data);
//     console.log('插入成功！');
//   }
// ).catch(
//   err => {
//     console.log(err.message);
//     console.log('插入失败！');
//   }
// )

// 查询数据
// User.find() // 括号里可以加参数，参数为查询条件。不写参数则查询所有
// .then(
//   data => {
//     console.log(data);
//     console.log('查询成功！');
//   }
// ).catch(
//   err => {
//     console.log(err.message);
//     console.log('查询失败！');
//   }
// )

// 删除数据
User.remove()
.then(
  data => {
    console.log(data);
    console.log('删除成功！');
  }
).catch(
  err => {
    console.log(err.message);
    console.log('删除失败！');
  }
)