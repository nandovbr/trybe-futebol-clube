import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init({ // id sendo PK + AI acho que não precisa do allowNull.
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});
