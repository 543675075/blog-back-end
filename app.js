const express = require('express')
const path = require('path')
const cors = require("cors")
// var bodyParser = require('body-parser')
// var session = require('express-session')
const router = require('./routes/index')

const app = express()

app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST'],
    alloweHeaders:['Conten-Type', 'Authorization']
}));

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// 在 Node 中，有很多第三方模板引擎都可以使用，不是只有 art-template
// ejs、jade（pug）、handlebars、nunjucks
//    <%%>
//    {{}}
//    h1
//    div
//      h1
// app.engine('html', require('express-art-template'))
// app.set('views', path.join(__dirname, './views/')) // 默认就是 ./views 目录

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件：express-session 来解决
// 1. npm install express-session
// 2. 配置 (一定要在 app.use(router) 之前)
// 3. 使用
//    当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了
//    添加 Session 数据：req.session.foo = 'bar'
//    访问 Session 数据：req.session.foo

// app.use(session({
//   // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
//   // 目的是为了增加安全性，防止客户端恶意伪造
//   secret: 'itcast',
//   resave: false,
//   saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
// }))
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// 把路由挂载到 app 中
app.use(router)

app.listen(5000, function () {
  console.log('running...')
})
