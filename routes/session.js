// 用户管理规则
const User = require('../models/user')
// 新增文章规则
const Article = require('../models/article')
const md5 = require('blueimp-md5')
const jwt = require('jsonwebtoken')
const KEY = require('./key')


// 注册请求
const register = async (req, res, next) => {
  let body = req.body.params
  try {
    // 邮箱被注册
    let email = await User.findOne({ email: body.email })
    if (email) {
      return res.status(200).json({
        err_code: 1,
        msg: '邮箱已注册'
      })
    }
    // 昵称被注册
    let nickname = await User.findOne({ nickname: body.nickname })
    if (nickname) {
      return res.status(200).json({
        err_code: 1,
        msg: '昵称已注册'
      })
    }
     // 对密码进行 md5 重复加密
     body.password = md5(md5(body.password))

    // 创建用户执行注册
    const addUser = new User({
      nickname: body.nickname,
      password: body.password,
      email: body.password
    })
    const result = await addUser.save()
    console.log(result)
    res.status(200).json({
      err_code: 0,
      msg: '创建成功'
    })
  } catch (error) {
    res.status(500).json({
      err_code: 500,
      msg: 'error.message'
    })
  }

}


// 登陆请求
const login = async (req, res, next) => {
  let body = req.body.params
  try {
    // 邮箱错误
    let email = await User.findOne({ email: body.email })
    if (!email) {
      return res.status(200).json({
        err_code: 1,
        msg: '邮箱或密码错误'
      })
    }

    // 密码错误
    // 对密码进行 md5 重复加密再对比
    body.password = md5(md5(body.password))
    let password = await User.findOne( {password: body.password} )
    if (!password) {
      return res.status(200).json({
        err_code: 1,
        msg: '邮箱或密码错误'
      })
    }

    // 登陆成功
    //jwt.sign()方法可生成token，第一个参数写的用户信息进去（可以写其他的），第二个是秘钥，第三个是过期时间
    let token = jwt.sign({email:body.email},KEY,{expiresIn:60*60})
    res.status(200).json({
      err_code: 0,
      msg: '登陆成功',
      token:token
    })
  } catch (error) {
    res.status(500).json({
      err_code: 500,
      msg: 'error.message'
    })
  }
}


// 实现文章添加功能的路由
const articleAdd = async (req,res,next) => {
  let body = req.body.params
  console.log(body);
  const addArticle = new Article({
    
  })

}

// 导出
module.exports = {
  register,
  login,
  articleAdd
}