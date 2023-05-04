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

export default router;
