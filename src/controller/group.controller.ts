import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
import {checkLikedPosts, getTimeCreated} from "../middleware/postUtils";
import {Group} from "../entity/group"
import { User } from "../entity/user";
import { Post } from "../entity/post";
// import config from "../config/config";
import * as HttpStatus from 'http-status';
import { PostFile } from "../entity/postFile";
import { FileController } from "./file.controller";

class GroupController {

  static create = async (req: Request, res: Response) => {

    let response = null as any;
    try {
      console.log(req.body);
      var response_str = "";

        var req_group = Group.from(req.body);

        const groupRepository = getRepository(Group);
        await groupRepository.save(req_group);
        
        response_str = "Group created!";

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

        const groupRepository = getRepository(Group);
        
        let id = req.params.id
        response = await groupRepository.findOneOrFail({ where: { id } });

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

        var req_group = Group.from(req.body);

        const groupRepository = getRepository(Group);
        await groupRepository.save(req_group);
        
        response_str = "Group " + req_group.id + " updated!";

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

        const groupRepository = getRepository(Group);
        await groupRepository.delete(id);
        
        response_str = "Group " + id + " deleted!";

      response = {success: response_str}
      res.status(HttpStatus.OK).send(response);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  };

  static find = async (req: Request, res: Response) => {
    let response = null as any;
    try {
        const groupRepository = getRepository(Group);
        const groups = await groupRepository.find(req.body);

        res.status(HttpStatus.OK).send(JSON.stringify(groups));
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  };

  static findOneOrFail = async (req: Request, res: Response) => {
    let response = null as any;
    try {
        const groupRepository = getRepository(Group);
        console.log(req.body);
        const group = await groupRepository.findOneOrFail(req.body);

      res.status(HttpStatus.OK).send(group);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  };

  static getPosts = async (req: Request, res: Response) => {
        let lastIndex = req.body.lastIndex;
        let userId = req.body.userId;
        let groupId = req.body.groupId;

        console.log(lastIndex, userId, groupId);

        try {
            let postRepository = await getRepository(Post);
            let user = await getRepository(User).findOneOrFail({ where: { id: userId } })
            let query = await getRepository(Post).createQueryBuilder("post")
                .where("post.groupId = :groupId", { groupId: groupId})
                .andWhere("post.id > :lastIndex", { lastIndex: lastIndex })
                .loadRelationCountAndMap("post.likeCount", "post.userLikes")
                .loadRelationIdAndMap("post.userLikesIds", "post.userLikes")
                .orderBy("post.id").limit(10);

            let posts: Post[] = await query.getMany();

            for (let i = 0; i < posts.length; i++) {
                let post = await postRepository.findOneOrFail({relations: ['postFiles'], where: { id: posts[i].id }});
                posts[i].imageString = await FileController.getPhoto(post.postFiles[0].fileName);
            }

            checkLikedPosts(user, posts);
            getTimeCreated(posts);

            console.log(posts);

            res.status(HttpStatus.OK).send(posts);
        } catch (e) {
            console.log(e);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }

}

export default GroupController;
