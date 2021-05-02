import { Sequelize } from "sequelize";
import db from "../../db";
const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_TEST_HOST,
  NODE_ENV,
} = process.env;
const userTestSetUp = () => {
  let sequelize: Sequelize;
  beforeAll(async () => {
    sequelize = db.sequelize;
    console.log(NODE_ENV);

    await db.checkConnection(sequelize);
  });
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });
};

export default userTestSetUp;
