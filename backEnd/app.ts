import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./src/error/errorHandler";
import routes from "./src/routes";
const app = express();
app.use(express.json());

require("./src/db");

app.get("/", async (req, res) => {
  res.send("user");
});
app.use("/api", routes);
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  errorHandler(err, res);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("on est la watson"));
