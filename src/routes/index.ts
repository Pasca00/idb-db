import {Router} from "express";
import user from "./user.routes";
import group from "./group.routes";
import post from "./post.routes";
import postfile from "./postFile.routes";

const routes = Router();

routes.use("/user", user);
routes.use("/group", group);
routes.use("/post", post);
routes.use("/postfile", postfile);

export default routes;
