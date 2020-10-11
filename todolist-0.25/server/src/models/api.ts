import mongoose from 'mongoose';

class DB {
  connect() {
    return mongoose.connect('mongodb://test:123456@localhost:27017/todolist', { useFindAndModify: false });
  }
}
const db = new DB();
export default db;
