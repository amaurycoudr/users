import { Sequelize } from "sequelize";

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_TEST_HOST,
  NODE_ENV,
} = process.env;

const sequelize = new Sequelize(
  POSTGRES_DB!,
  POSTGRES_USER!,
  POSTGRES_PASSWORD!,
  {
    dialect: "postgres",
    host: NODE_ENV === "test" ? POSTGRES_TEST_HOST : POSTGRES_HOST,
    port: NODE_ENV === "test" ? 5430 : 5432,
    logging: NODE_ENV === "test" ? false : false,
  }
);

const checkConnection = async (sequelize: Sequelize) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export default { sequelize, checkConnection };
