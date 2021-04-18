import mongoose from "mongoose";
import userDB from "../userDB";

const userTestSetUp = () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://mongo:27017/JestDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });
  afterEach(async () => {
    await userDB.User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
};

export default userTestSetUp;
