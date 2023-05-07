import {Router} from "express";
import PostController from "../controller/post.controller";

const router = Router();
//Create a new post
router.post("/create", PostController.create);

//Get post
router.get("/get/:id", PostController.get);

//Update an post
router.post("/update", PostController.update);

//Delete an post by id
router.post("/delete/:id", PostController.delete);

//CreatePost
router.post("/createPost", PostController.createPost);

//GetPhoto
router.post("/getPhoto", PostController.getPhoto);

//FindOneOrFail
router.post("/findOneOrFail", PostController.findOneOrFail);

export default router;
