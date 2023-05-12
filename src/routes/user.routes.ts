import {Router} from "express";
import UserController from "../controller/user.controller";

const router = Router();
//Create a new user
router.post("/create", UserController.create);

//Get user
router.get("/get/:by/:id", UserController.get);

//Update a user
router.post("/update", UserController.update);

// Edit user
router.patch("/:id", UserController.save);

//Delete a user by id
router.post("/delete/:id", UserController.delete);

//FindOneOrFail
router.post("/findOneOrFail", UserController.findOneOrFail);

export default router;
