import { Sequelize, Model } from 'sequelize';

class DB {
  sequelize: Sequelize;
  constructor() {
    this.sequelize = new Sequelize({
      database: 'todolist',
      username: 'root',
      password: '123456',
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 30000,
      },
      logging: false,
    });
  }
  connect() {
    return this.sequelize.authenticate();
  }
}
const db = new DB();
function toJson<T extends Model>(data: T | T[]): ModelType | ModelType[] {
  if (Object.prototype.toString.call(data) === '[object Array]') {
    return (data as T[]).map((model) => JSON.parse(JSON.stringify(model)));
  } else {
    return JSON.parse(JSON.stringify(data as T));
  }
}

export { db, toJson };
