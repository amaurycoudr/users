import { DataTypes, Model, Optional } from "sequelize";
import db from "../../db";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  salt: string;
  token: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

const sequelize = db.sequelize;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  salt!: string;
  token!: string;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,

      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    salt: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "user" }
);

export default User;
