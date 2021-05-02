import { Sequelize } from "sequelize";

const { NODE_ENV, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const sequelize = new Sequelize(
  POSTGRES_DB!,
  POSTGRES_USER!,
  POSTGRES_PASSWORD!,
  {
    host: NODE_ENV === "test" ? "db-test" : "db",
    dialect: "postgres",
    port: 5432,
    logging: false,
  }
);

const checkConnection = async (sequelize: Sequelize) => {
  try {
    console.log(NODE_ENV, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB);

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export default { sequelize, checkConnection };
