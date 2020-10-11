import { DataTypes } from 'sequelize';
import { Json } from 'sequelize/types/lib/utils';
import { db, toJson } from './api';
import { ItemDao } from './Item';
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
interface Group {
  id: number;
  user_id: number;
  title: string;
}
class GroupDao {
  static add = async (userId: number, title: string) => {
    let ret = await Group.create({ id: 0, user_id: userId, title });
    return toJson(ret);
  };
  static del = async (userId: number, id: number): Promise<boolean> => {
    let ret = await Group.destroy({ where: { id } });
    let ret1 = await ItemDao.resetGroup(userId, id);
    console.log(`ret:${ret},ret1:${ret1}`);
    return !!ret && !!ret1;
  };
  static findByUserId = async (userId: number) => {
    let ret = await Group.findAll({ where: { user_id: userId } });
    return toJson(ret);
  };
}

export { GroupDao };
