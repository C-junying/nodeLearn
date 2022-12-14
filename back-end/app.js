var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser")
const expressjwt = require('express-jwt');
const cors = require('cors');

// 自定义模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var menuRouter = require('./routes/menu');
var roleRouter = require('./routes/roles');
var goodsRouter = require('./routes/goods');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//将静态资源托管，这样才能在浏览器上直接访问预览图片或则html页面
app.use(express.static(path.join(__dirname, './public')));


//后端解决跨域问题：跨域设置
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");//value = * 所有都可以
  res.header("Access-Control-Allow-Headers", "*");//auth...
  res.header("Access-Control-Allow-Methods", "*");//get post head delete 
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method.toLowerCase() === "option") {
    res.send(200);
  } else {
    next();
  }
});


//注意添加位置
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//token验证 - 需要在所有路由前添加，否则直接进路由不进验证
app.use(expressjwt({
  secret: 'david',  // 签名的密钥 或 PublicKey => req.user
  algorithms: ['HS256']
}).unless({
  path: ['/user/login', '/user/register', '/goods/upload', /^\/images\/.*/]  // 指定路径不经过 Token 解析
}))

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/menu', menuRouter);
app.use('/role', roleRouter);
app.use('/goods', goodsRouter);
app.use('/images', express.static(path.join(__dirname, './public/uploads')));

//404 错误
app.use(function (req, res, next) {
  res.status(404).json({ code: 404, msg: '页面不存在！' });
});
// 其他错误处理
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ code: 401, msg: err.message });
  } else {
    res.status(err.status || 500).json({ code: err.status || 500, msg: err.message });
  }
});



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//error handler
// app.use(function(err, req, res, next) {
//set locals, only providing error in development
// res.locals.message = err.message;
// res.locals.error = req.app.get('env') === 'development' ? err : {};

//  render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
module.exports = app;
