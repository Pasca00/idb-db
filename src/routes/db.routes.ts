import {Router} from "express";
import DBController from "../controller/db.controller";

const router = Router();
//Create a new entity
router.post("/create/:entity", DBController.create);

//Get entity
router.get("/get/:entity/:by/:id", DBController.get);

//Update an entity
router.post("/update/:entity", DBController.update);

//Delete an entity by id
router.post("/delete/:entity/:id", DBController.delete);

export default router;
