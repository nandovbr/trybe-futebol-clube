import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Users extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string; // string porque pode conter caracteres especiais e letras
}

Users.init({ // id sendo PK + AI acho que não precisa do allowNull.
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});
