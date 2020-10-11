/// <reference path="../main.d.ts" />
/// <reference path="../condition.d.ts" />
import { DataTypes } from 'sequelize';
import db from './api';
import chalk from 'chalk';

import { toJson } from '../api/util';
const User = db.sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    curMode: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: 0 },
    avatar: { type: DataTypes.STRING, allowNull: true, defaultValue: '1.png' },
  },
  {
    // tableName: 'users',
    timestamps: false,
  }
);

type FindUser = {
  username: string;
  password?: string;
};

class UserDao {
  static add = async (username: string, password: string) => {
    let ret = await User.create({ username, password, curMode: 0, avatar: '1.png' });
    return toJson(ret);
  };

  static findById = async (id: number) => {
    let ret = await User.findAll({ where: { id } });
    return toJson(ret[0]);
  };
  static findOne = async (condition: FindUser) => {
    let ret = await User.findAll({ where: condition });
    if (ret.length == 0) {
      return false;
    } else {
      return toJson(ret[0]);
    }
  };
  static setMode = async (id: number, mode: number) => {
    let ret = await User.update({ curMode: mode }, { where: { id } });
    return ret[0];
  };
}
export { UserDao };
