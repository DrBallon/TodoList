import express, { Request, Response, NextFunction } from 'express';
//express 中间件
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
//依赖
// import mongoose from 'mongoose';
import path from 'path';
import { db } from './models2/api';
import multer from 'multer';
//路由
import accountRouter from './routers/account';
import dataRouter from './routers/data';
import groupRouter from './routers/group';
import itemRouter from './routers/item';
import userRouter from './routers/user';

const app = express();
//静态文件托管
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'temp')));

db.connect()
  .then((val) => {
    console.log('数据库连接成功');
    // db.sequelize.sync({ force: true }).then(() => {
    //   console.log('数据库结构生成成功');
    // });
  })
  .catch((err) => {
    console.log('数据库连接失败:', err);
  });

// mongoose
//   .connect('mongodb://test:123456@localhost:27017/todolist', { useFindAndModify: false })
//   .then(() => {
//     console.log('数据库连接成功');
//   })
//   .catch((err) => {
//     console.log('数据库连接失败:', err);
//   });

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

let upload = multer({
  storage: multer.diskStorage({
    destination: function(req: Request, file: Express.Multer.File, cb: Function) {
      cb(null, path.resolve(__dirname, 'temp/'));
    },
    filename: function(req: Request, file: Express.Multer.File, cb: Function) {
      let changedName = new Date().getTime() + '.' + file.originalname.split('.')[1];
      cb(null, changedName);
    },
  }),
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.json({
    status: 200,
    msg: '上传成功',
    data: {
      src: 'http://localhost:3000/' + req.file.filename,
      filename: req.file.filename,
    },
  });
});
app.use(accountRouter);
app.use(dataRouter);
app.use(groupRouter);
app.use(itemRouter);
app.use(userRouter);

app.use((err) => {
  // console.log('[error]:', err);
});
app.listen(3000, () => {
  console.log('服务器开始');
});
