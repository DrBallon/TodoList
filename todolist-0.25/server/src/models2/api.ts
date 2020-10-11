import { Sequelize } from 'sequelize';

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
    });
  }
  connect() {
    return this.sequelize.authenticate();
  }
}
const db = new DB();
export default db;
