import express, { NextFunction, Request, Response } from "express";

import errorHandler from "./error/errorHandler";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use("/api", routes);
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  errorHandler(err, res);
});

export default app;
  