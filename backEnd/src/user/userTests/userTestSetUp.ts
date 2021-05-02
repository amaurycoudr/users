import { Sequelize } from "sequelize";
import db from "../../db";

const userTestSetUp = () => {
  let sequelize: Sequelize;
  beforeAll(async () => {
    sequelize = db.sequelize;
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
