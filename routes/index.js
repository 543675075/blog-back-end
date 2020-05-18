// 加载模块
const express = require('express') 
const {register , login , articleAdd} = require('./session')

const router = express.Router()    //引用router
// 引用数据模块
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })
//下面就进行判断，（连接成功，连接失败，连接断开）
mongoose.connection.on('connected', function () {
  console.log("连接成功");
})
mongoose.connection.on('error', function () {
  console.log("连接失败");
})
mongoose.connection.on('disconnected', function () {
  console.log("断开连接");
})

// 注册路由
router.post('/register' , register)
// 登陆路由
router.post('/login' , login)
// 实现文章添加功能的路由
router.post('/article-add' , articleAdd)

module.exports = router;//暴露路由