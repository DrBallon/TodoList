import express from 'express';
//express 中间件
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
//依赖
import mongoose from 'mongoose';
import path from 'path';
//路由
import * as Group from './routers/group';
import * as Item from './routers/item';
import * as Data from './routers/data';
import * as User from './routers/user';
import * as Account from './routers/account';
//验证
import { getSession, isLogged } from './api/util';
const app = express();
//静态文件托管
app.use(express.static(path.join(__dirname, 'images')));

mongoose
  .connect('mongodb://test:123456@localhost:27017/todolist', { useFindAndModify: false })
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch((err) => {
    console.log('数据库连接失败:', err);
  });

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
  })
);

//设置允许跨域访问该服务.
// app.all('', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
//   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
//   next();
// });

app.post('/login', Account.login);
app.get('/logout', Account.logout);
app.post('/register', Account.register);

//判断登录状态
app.use((req, res, next) => {
  console.log('[method]:', req.method);
  if (isLogged(req, res)) {
    console.log('已登录');
    res.cookie('username', getSession(req).username, { maxAge: 60 * 1000, httpOnly: true });
    next();
  } else {
    res.send({
      status: 500,
      msg: '未登录',
      data: {},
    });
  }
});
app.get('/data', Data.getData);
app.post('/user/mode', User.setMode);
app.get('/user/avatar', User.getAvatar);

app.post('/group/add', Group.addGroup);
app.post('/group/del', Group.delGroup);

app.post('/item/add', Item.addItem);
app.post('/item/del', Item.delItem);
app.post('/item/content', Item.editContent);
app.post('/item/state', Item.changeState);
app.post('/item/group', Item.changGroup);
app.post('/item/clear', Item.clearItem);

app.use((err) => {
  // console.log('[error]:', err);
});
app.listen(3000, () => {
  console.log('服务器开始');
});
