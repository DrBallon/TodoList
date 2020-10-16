import { DataTypes } from 'sequelize';
import { db, toJson } from './api';
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
  static update = async (id: number, values: { done?: boolean; content?: string; group?: number }) => {
    let ret = await Item.update(values, { where: { id } });
    if (ret[0] == 0) return null;
    let item = await Item.findOne({ where: { id } });
    return item ? toJson(item) : null;
  };
  static resetGroup = async (userId: number, groupId: number) => {
    let ret = await Item.update({ group: -1 }, { where: { user_id: userId, group: groupId } });
    return ret[0] == 0 ? null : (toJson(ret[1]) as QueryItem[]);
  };
  static findById = async (id: number) => {
    let ret = await Item.findAll({ where: { id } });
    return toJson(ret) as QueryUser[];
  };
  static state = async (id: number, state: boolean) => {
    let ret = await Item.update({ done: state }, { where: { id } });
    return ret[0] == 0 ? false : true;
  };
  static group = async (id: number, group: number) => {
    let ret = await Item.update({ group }, { where: { id } });
    return ret[0] == 0 ? false : true;
  };

  static content = async (id: number, content: string) => {
    let ret = await Item.update({ content }, { where: { id } });
    return ret[0] == 0 ? false : true;
  };
  static del = async (id: number) => {
    let ret = await Item.destroy({ where: { id } });
    return !!ret;
  };
  static findByUserId = async (userId: number) => {
    let ret = await Item.findAll({ where: { user_id: userId } });
    return toJson(ret) as QueryItem[];
  };
  static add = async (userId: number, content: string) => {
    let ret = await Item.create({ content, user_id: userId });
    return toJson(ret) as QueryItem;
  };
  static clear = async (userId: number) => {
    let ret = await Item.destroy({ where: { user_id: userId } });
    return !!ret;
  };
}
export { ItemDao };
