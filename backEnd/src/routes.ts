import { Router } from "express";
import userRoutes from "./user/userRoutes";

const routes = Router();

routes.use("/users", userRoutes);

export default routes;
