import http2 from "http";
import app from "./app";
import db from "./db";


const sequelize = db.sequelize;
sequelize.sync({ alter: true });
db.checkConnection(sequelize);

const port = process.env.PORT;
http2.createServer(app).listen(port);
