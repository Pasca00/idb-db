import {Router} from "express";
import PostController from "../controller/post.controller";

const router = Router();
//Create a new post
router.post("/create", PostController.create);

//Get post
router.get("/get/:by/:id", PostController.get);

//Update an post
router.post("/update", PostController.update);

//Delete an post by id
router.post("/delete/:id", PostController.delete);

export default router;
