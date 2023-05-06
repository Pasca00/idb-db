import {Router} from "express";
import GroupController from "../controller/group.controller";

const router = Router();
//Create a new group
router.post("/create", GroupController.create);

//Get group
router.get("/get/:id", GroupController.get);

//Update an group
router.post("/update", GroupController.update);

//Delete an group by id
router.post("/delete/:id", GroupController.delete);

//Find group
router.post("/find", GroupController.find);

//FindOneOrFail
router.post("/findOneOrFail", GroupController.findOneOrFail);

// Returns a list of 10 posts from corresponding group, based on requested index
router.post('/getPosts', GroupController.getPosts);

export default router;
