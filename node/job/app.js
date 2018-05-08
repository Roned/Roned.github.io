var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var comments=require('./routes/comments');
var session = require("express-session");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(logger('dev'));   // logger 打印日志  dev  开发环境
app.use(bodyParser.json());  // ajax post 请求 $.ajax(url,postData,{params})
app.use(bodyParser.urlencoded({ extended: false }));  // urlencoded url 编程  extended 扩展   form表单的post 方法提交post 数据 
app.use(cookieParser());    // 设置cookies 中间键
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret:"recommend 128 bytes random string",
  cookie:{maxAge:1000*60*20},   // session 存在时长
  resave:true,  // 自动保存
  saveUninitialized:true
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', comments);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
