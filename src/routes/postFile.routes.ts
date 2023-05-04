import {Router} from "express";
import PostFileController from "../controller/postFile.controller";

const router = Router();
//Create a new postFile
router.post("/create", PostFileController.create);

//Get postFile
router.get("/get/:by/:id", PostFileController.get);

//Update an postFile
router.post("/update", PostFileController.update);

//Delete an postFile by id
router.post("/delete/:id", PostFileController.delete);

export default router;
