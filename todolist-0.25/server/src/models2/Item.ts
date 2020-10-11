import { DataTypes, Model } from 'sequelize';
import db from './api';
import { toJson } from '../api/util';
const Item = db.sequelize.define(
  'Item',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    done: { type: DataTypes.BOOLEAN, defaultValue: false },
    group: { type: DataTypes.INTEGER, defaultValue: -1 },
  },
  {
    tableName: 'items',
    timestamps: false,
  }
);

class ItemDao {
  static resetGroup = (userId: number, groupId: number) => {
    return Item.update({ group: -1 }, { where: { user_id: userId, group: groupId } });
  };
  static findById = async (id: number) => {
    let ret = await Item.findAll({ where: { id } });
    return toJson(ret);
  };
  static state = async (id: number, state: boolean) => {
    return await Item.update({ done: state }, { where: { id } });
  };
  static group = async (id: number, group: number) => {
    return await Item.update({ group }, { where: { id } });
  };

  static content = async (id: number, content: string) => {
    return await Item.update({ content }, { where: { id } });
  };
  static del = async (id: number) => {
    return await Item.destroy({ where: { id } });
  };
  static findByUserId = async (userId: number) => {
    let ret = await Item.findAll({ where: { user_id: userId } });
    return toJson(ret);
  };
  static add = async (userId: number, content: string) => {
    let ret = await Item.create({ content, user_id: userId });
    return toJson(ret);
  };
  static clear = async (userId: number) => {
    return await Item.destroy({ where: { user_id: userId } });
  };
}
export { ItemDao };
