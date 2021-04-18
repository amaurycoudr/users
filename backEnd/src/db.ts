import mongoose from "mongoose";

mongoose.connect("mongodb://mongo:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});
