const User = require('../models/user')
const md5 = require('blueimp-md5')


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

module.exports = register