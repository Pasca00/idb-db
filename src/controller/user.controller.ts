import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";

import {User} from "../entity/user";
// import config from "../config/config";
import * as HttpStatus from 'http-status';
import {FileController} from "./file.controller";

class UserController {

  static create = async (req: Request, res: Response) => {

    let response = null as any;
    try {
      console.log(req.body);
      var response_str = "";

      var req_user = User.from(req.body);

      const userRepository = getRepository(User);
      await userRepository.save(req_user);
      
      response_str = "User created!";

      response = {success: response_str}
      res.status(HttpStatus.OK).send(response);
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  };

  static get = async (req: Request, res: Response) => {

    let response = null as any;
    try {

      const userRepository = getRepository(User);
      
      console.log(req.params.id)
      if (req.params.by == "email") {
        let email = req.params.id
        response = await userRepository.findOneOrFail({ where: { email } });
      } else if (req.params.by == "username") {
        let username = req.params.id
        response = await userRepository.findOneOrFail({ where: { username } });
      } else if (req.params.by == "id") {
        let id = req.params.id
        response = await userRepository.findOneOrFail({ where: { id } });
      }

      res.status(HttpStatus.OK).send(response);
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  };

  static update = async (req: Request, res: Response) => {

    let response = null as any;
    try {
      var response_str = "";

      console.log(req);

      var req_user = User.from(req.body);

      const userRepository = getRepository(User);
      await userRepository.save(req_user);
      
      response_str = "User " + req_user.id + " updated!";

      response = {success: response_str}
      res.status(HttpStatus.OK).send(response);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  };

  static delete = async (req: Request, res: Response) => {
    let response = null as any;
    try {
      let id = req.params.id;
      var response_str = "";

      const userRepository = getRepository(User);
      await userRepository.delete(id);
      
      response_str = "User " + id + " deleted!";

      response = {success: response_str}
      res.status(HttpStatus.OK).send(response);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  };

  static save = async (req: Request, res: Response) => {
    const user: User = req.body;
    console.log(user)
    const userRepository = getRepository(User);
    const temp = user.profilePic;

    // Upload photo if exists
    if (!user.profilePic.includes("src")) {
      user.profilePic = `src/asset/user/${user.id}.png`;
      await Promise.resolve(FileController.uploadPhoto(temp, user.profilePic));
    }

    //Try to save, if fails, that means username already in use
    try {
      await userRepository.update(user.id, user);
    } catch (e) {
      res.status(HttpStatus.CONFLICT).send("username already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(HttpStatus.NO_CONTENT).send();
  }

  static findOneOrFail = async (req: Request, res: Response) => {

    try {
      const userRepository = getRepository(User);
      
      const user = await userRepository.findOneOrFail(req.body);
      console.log(user);
      res.status(HttpStatus.OK).send(user);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  };
}

export default UserController;
