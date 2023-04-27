import {Router} from "express";
import db from "./db.routes";

const routes = Router();

routes.use("/db", db);
export default routes;
