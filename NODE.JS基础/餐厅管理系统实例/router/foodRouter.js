const express = require('express');
const router = express.Router();
const Food = require('../db/model/foodModel');
const { route } = require('./userRouter');

/**
 * @api {post} /food/add 添加菜品
 * @apiName 添加菜品
 * @apiGroup Food
 *
 * @apiParam {String} name 菜名.
 * @apiParam {String} price 价格.
 * @apiParam {String} desc 菜品描述.
 * @apiParam {String} typename 菜品类名.
 * @apiParam {Number} typeid 类名编号.
 * @apiParam {String} img 菜品图.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
*/
// 添加菜品
router.post('/add', (req, res) => {
  // let data = {
  //   name: '鱼香肉丝',
  //   price: '999',
  //   desc: '超好吃',
  //   typename: '凉菜',
  //   typeid: 1,
  //   img: '/public/image/img1.jpg'
  // }
  let {name, price, desc, typename, typeid, img} = req.body;
  // 判断参数是否正确
  
  // 插入数据
  Food.insertMany({name, price, desc, typename, typeid, img})
  .then((data) => {
    res.send({err: 0, msg: '添加成功'})
  })
  .catch((err) => {
    res.send({err: -1, msg: '添加失败'})
  })
})

/**
 * @api {post} /food/getInfoByType 分类查询
 * @apiName 分类查询
 * @apiGroup Food
 *
 * @apiParam {Number} typeid 类名编号.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
*/
// 分类查询菜品
router.post('/getInfoByType', (req, res) => {
  let {typeid} = req.body;
  Food.find({typeid})
  .then((data) => {
    if (data.length) {
      res.send({err: 0, msg: '查询成功', list: data});
    } else {
      throw new Error('nothing');
    }
  })
  .catch((err) => {
    res.send({err: -1, msg: '查询失败'});
  })
})

/**
 * @api {post} /food/getInfoByKw 关键字查询
 * @apiName 关键字查询
 * @apiGroup Food
 *
 * @apiParam {String} kw 关键字.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
*/
// 关键字查询菜品
router.post('/getInfoByKw', (req, res) => {
  let {kw} = req.body;
  let reg = new RegExp(kw) // 创建一个正则表达式来匹配关键字
  Food.find({$or: [{name: {$regex: reg}}, {desc: {$regex: reg}}]}) // 名字或描述正则匹配
  .then((data) => {
    if (data.length) {
      res.send({err: 0, msg: '查询成功', list: data});
    } else {
      throw new Error('nothing');
    }
  })
  .catch((err) => {
    res.send({err: -1, msg: '查询失败'});
  })
})

/**
 * @api {post} /food/del 删除菜品
 * @apiName 删除菜品
 * @apiGroup Food
 *
 * @apiParam {String} _id 菜品编号.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
*/
// 删除菜品
router.post('/del', (req, res) => {
  let {_id} = req.body;
  Food.remove({_id})
  .then((data) => {
    res.send({err: 0, msg: '删除成功'});
  })
  .catch((err) => {
    res.send({err: -1, msg: '删除失败'});
  })
})

/**
 * @api {post} /food/update 修改菜品
 * @apiName 修改菜品
 * @apiGroup Food
 *
 * @apiParam {String} name 菜名.
 * @apiParam {String} price 价格.
 * @apiParam {String} desc 菜品描述.
 * @apiParam {String} typename 菜品类名.
 * @apiParam {Number} typeid 类名编号.
 * @apiParam {String} img 菜品图.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
*/
// 修改菜品
router.post('/update', (req, res) => {
  let {name, price, desc, typename, typeid, img, _id} = req.body;
  Food.updateOne({_id}, {name, price, desc, typename, typeid, img})
  .then((data) => {
    res.send({err: 0, msg: '修改成功'});
  })
  .catch((err) => {
    res.send({err: -1, msg: '修改失败'});
  })
})

/**
 * @api {post} /food/getInfoByPage 分页
 * @apiName 分页
 * @apiGroup Food
 *
 * @apiParam {Number} pageSize 每页数据条数.
 * @apiParam {Number} page 页数.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
*/
// 分页
router.post('/getInfoByPage', (req, res) => {
  let pageSize = req.body.pageSize || 2; // 设置默认值
  let page = req.body.page || 1;
  let count = 0;
  Food.find().then((list) => {
    // console.log(list.length);
    count = list.length // 获取总的数据条数

    return Food.find().limit(Number(pageSize)).skip(Number((page - 1) * pageSize))
  })
  .then((data) => {
    let allpage = Math.ceil(count / pageSize)
    res.send({err: 0, msg: '查询成功', info: {list: data, count: count, allpage: allpage}});
  })
  .catch((err) => {
    res.send({err: -1, msg: '查询失败'});
  })
})

module.exports = router;

/* 
nodemon 插件，可以自动更新代码，每次保存之后自动更新
安装：npm install nodemon -g
安装前运行：node server.js
安装后运行：nodemon server.js
*/