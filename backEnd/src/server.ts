import http2 from "http";
import fs from "fs";
import app from "./app";

const options = {
  key: fs.readFileSync(__dirname + "/https/key.pem"),
  cert: fs.readFileSync(__dirname + "/https/cert.pem"),
};

const port = process.env.PORT;

http2.createServer(app).listen(port);
