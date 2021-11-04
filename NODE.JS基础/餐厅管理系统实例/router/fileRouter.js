const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 指定文件存放路径
    cb(null, './static/image');
  },
  filename: function (req, file, cb) {
    // console.log(file);
    // fieldname: 'hehe', // 文件名
    // originalname: 'icon_warning_2.png', // 原始文件名
    // encoding: '7bit', // 编码格式
    // mimetype: 'image/png' // 文件类型
    // 指定存放文件名
    let ext = file.originalname.split('.');
    ext = ext[ext.length - 1];
    let tmpname = (new Date()).getTime() + parseInt(Math.random() * 9999);
    cb(null, `${tmpname}.${ext}`);
  }
});

var upload = multer({
  storage: storage
});

router.post('/upload', upload.single('hehe'), (req, res) => {
  // hehe:要上传图片数据的 key 值
  // upload.single 表示上传单张图片，若要上传多张图片用 array 方法：
  // upload.array('hehe', 2)    后面的数字表示可以接受多少张照片

  // console.log(req.file);
  // fieldname: 'hehe', // 文件名
  // originalname: 'p1_ver4.png', // 原始文件名
  // encoding: '7bit', // 编码格式
  // mimetype: 'image/png', // 文件类型
  // destination: './uploads', // 相对路径地址
  // filename: 'aaa.jpg', // 上传成功后的文件名
  // path: 'uploads\\aaa.jpg', // 上传成功后的地址
  // size: 815186 // 文件大小，字节数
  
  let {size, mimetype, path} = req.file;
  let types = ['jpg', 'jpeg', 'png', 'gif'] // 允许上传的数据类型
  let temType = mimetype.split('/')[1];
  if(size > 500000) {  // 如果图片大于 500K
    return res.send({err: -1, msg: '尺寸过大！'});
  } else if (types.indexOf(temType) == -1) {
    return res.send({err: -2, msg: '媒体类型错误！'});
  } else {
    let url = `/public/image/${req.file.filename}`
    res.send({err: 0, msg: '上传成功！', img: url});
  }
})

module.exports = router;