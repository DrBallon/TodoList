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
import Token from './api/token';
//路由
import userRouter from './routers/user';
import dataRouter from './routers/data';
import groupRouter from './routers/group';
import itemRouter from './routers/item';

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

//设置允许跨域访问该服务.
// app.all('', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
//   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
//   next();
// });

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
// const zoos = [
//   { title: 'aaa' },
//   { title: 'bbb' },
//   { title: 'ccc' },
//   { title: 'ddd' },
//   { title: 'eee' },
//   { title: 'fff' },
//   { title: 'ggg' },
//   { title: 'hhh' },
//   { title: 'iii' },
//   { title: 'jjj' },
//   { title: 'kkk' },
// ];

// app.patch('/zoos/:id', (req: Request, res: Response, next: NextFunction) => {
//   // console.log(object);
//   const id = (req.params.id as unknown) as number;
//   const title = req.body.title;
//   console.log('patch-patch-patch-patch-patch-patch-patch-patch-patch');
//   res.send({
//     status: 0,
//     msg: 'id:' + req.params.id,
//     data: {
//       zoo: zoos[id],
//     },
//   });
// });
// app.put('/zoos/:id', (req: Request, res: Response, next: NextFunction) => {
//   // console.log(object);
//   const id = (req.params.id as unknown) as number;
//   const title = req.body.title;
//   console.log(title);
//   res.send({
//     status: 0,
//     msg: 'id:' + req.params.id,
//     data: {
//       zoo: zoos[id],
//     },
//   });
// });
// app.delete('/zoos/:id', (req: Request, res: Response, next: NextFunction) => {
//   // console.log(object);
//   const id = (req.params.id as unknown) as number;
//   console.log('删除:', zoos[id]);
//   res.send({
//     status: 0,
//     msg: 'id:' + req.params.id,
//     data: {
//       zoo: zoos[id],
//     },
//   });
// });
// app.get('/zoos/:id', (req: Request, res: Response, next: NextFunction) => {
//   // console.log(object);
//   const id = (req.params.id as unknown) as number;
//   res.send({
//     status: 0,
//     msg: 'id:' + req.params.id,
//     data: {
//       zoo: zoos[id],
//     },
//   });
// });
// app.get('/zoos', (req: Request, res: Response, next: NextFunction) => {
//   // let { limit, offset, page, per_page, sortby, order } = req.params;
//   const { limit } = req.query;
//   console.log(limit);
//   if (limit) {
//     let limit2 = parseInt(limit as string);
//     res.send({
//       status: 0,
//       msg: '',
//       data: zoos.slice(0, limit2),
//     });
//   } else {
//     res.send({
//       status: 0,
//       msg: '',
//       data: {
//         zoos,
//       },
//     });
//   }
// });
// app.post('/zoos', (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.body.name);
//   // console.log(object);
//   res.send({
//     status: 0,
//     msg: '新建成功',
//   });
// });

app.use(Token.auth);

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
app.use(userRouter);
app.use(dataRouter);
app.use(groupRouter);
app.use(itemRouter);

app.use((err) => {
  // console.log('[error]:', err);
});
app.listen(3000, () => {
  console.log('服务器开始');
});
