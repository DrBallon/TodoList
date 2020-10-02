import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';
import * as Group from './routers/group';
import * as Item from './routers/item';
import * as Data from './routers/data';
import { User, UserDocument } from './models/User';

const app = express();
//静态文件托管
// app.use(express.static(path.join(__dirname, 'public/images')));
// app.use(express.static(path.join(__dirname, 'public/css')));

mongoose
  .connect('mongodb://test:123456@localhost:27017/todolist')
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch((err) => {
    console.log('数据库连接失败:', err);
  });

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method}-${req.body}`);
  next();
});
app.get('/data', Data.getData);

app.post('/group/add', Group.addGroup);
app.post('/group/del', Group.delGroup);

app.post('/item/add', Item.addItem);
app.post('/item/del', Item.delItem);
app.post('/item/content', Item.editContent);
app.post('/item/state', Item.changeState);
app.post('/item/group', Item.changGroup);

app.post('/mode/set', async (req, res, next) => {
  let userId: string = req.body.data.userId;
  let newMode: number = req.body.data.newMode;
  let retData = {
    status: 200,
    msg: '',
    data: {},
  };
  User.findByIdAndUpdate(userId, { mode: newMode }).exec((err) => {
    if (err) {
      retData.status = 500;
      retData.msg = '没有找到用户';
      next(err);
    }
    res.send(retData);
  });
});
app.use((err) => {
  console.log('[error]:', err);
});
app.listen(3000, () => {
  console.log('服务器开始');
});
