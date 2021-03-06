import { DataTypes, Model, Optional } from "sequelize";
import db from "../../db";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  salt: string;
  isAdmin?: boolean;
}
export type UserRequestEdit = {
  name?: string;
  email?: string;
  password?: string;
};
export type UserDBEdit = {
  name?: string;
  email?: string;
  password?: string;
  salt?: string;
};
export type UserElement = "email" | "name" | "password";
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
  isAdmin!: boolean;
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
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  { sequelize, modelName: "user" }
);

export default User;
