import http2 from "http";
import app from "./app";

const port = process.env.PORT;

http2.createServer(app).listen(port);
