import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";

import {PostFile} from "../entity/postFile"
// import config from "../config/config";
import * as HttpStatus from 'http-status';

class PostFileController {

  static create = async (req: Request, res: Response) => {

    let response = null as any;
    try {
      console.log(req.body);
      var response_str = "";

        var req_postFile = PostFile.from(req.body);

        const postFileRepository = getRepository(PostFile);
        await postFileRepository.save(req_postFile);
        
        response_str = "PostFile created!";

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

        const postFileRepository = getRepository(PostFile);
        
        let id = req.params.id
        response = await postFileRepository.findOneOrFail({ where: { id } });

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

        var req_postFile = PostFile.from(req.body);

        const postFileRepository = getRepository(PostFile);
        await postFileRepository.save(req_postFile);
        
        response_str = "PostFile " + req_postFile.id + " updated!";

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

        const postFileRepository = getRepository(PostFile);
        await postFileRepository.delete(id);
        
        response_str = "PostFile " + id + " deleted!";

      response = {success: response_str}
      res.status(HttpStatus.OK).send(response);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  };
}

export default PostFileController;
