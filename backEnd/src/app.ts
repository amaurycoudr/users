import express, { NextFunction, Request, Response } from "express";

import errorHandler from "./error/errorHandler";
import routes from "./routes";
import bearerToken from "express-bearer-token";
const app = express();

app.use(express.json());
app.use(bearerToken());
app.use("/api", routes);
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  errorHandler(err, res);
});

export default app;
