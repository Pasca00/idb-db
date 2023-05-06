import {Router} from "express";
import UserController from "../controller/user.controller";

const router = Router();
//Create a new user
router.post("/create", UserController.create);

//Get user
router.get("/get/:by/:id", UserController.get);

//Update an user
router.post("/update", UserController.update);

//Delete an user by id
router.post("/delete/:id", UserController.delete);

//FindOneOrFail
router.get("/findOneOrFail", UserController.findOneOrFail);

export default router;
