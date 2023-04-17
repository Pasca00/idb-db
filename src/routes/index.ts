import {Router} from "express";
import db from "./db.routes";
// import user from "./user.routes";
// import feed from "./feed.router";
// import group from "./group.routes";
// import post from "./post.routes";
// import chat from "./chat.routes";
// import comment from "./comment.routes"

const routes = Router();

routes.use("/db", db);
// routes.use("/user", user);
// routes.use("/feed", feed);
// routes.use("/group", group);
// routes.use("/post", post);
// routes.use("/chat", chat);
// routes.use("/comment", comment);

export default routes;
