import { DataTypes } from 'sequelize';
import db from './api';
import { toJson } from '../api/util';
const Group = db.sequelize.define(
  'Group',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'groups',
    timestamps: false,
  }
);
class GroupDao {
  static add = async (userId: number, title: string) => {
    let ret = await Group.create({ id: 0, user_id: userId, title });
    return toJson(ret);
  };
  static del = async (id: number): Promise<number> => {
    let ret = await Group.destroy({ where: { id } });
    return ret;
  };
  static findByUserId = async (userId: number) => {
    let ret = await Group.findAll({ where: { user_id: userId } });
    return toJson(ret);
  };
}

export { GroupDao };
