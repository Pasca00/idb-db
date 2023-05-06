import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
import { User } from "../entity/user";
import { Group } from "../entity/group";
import {Post} from "../entity/post"
// import config from "../config/config";
import * as HttpStatus from 'http-status';
import { PostFile } from "../entity/postFile";
import { FileController } from "./file.controller";

class PostController {

  static create = async (req: Request, res: Response) => {

    let response = null as any;
    try {
      console.log(req.body);
      var response_str = "";

        var req_post = Post.from(req.body);

        const postRepository = getRepository(Post);
        await postRepository.save(req_post);
        
        response_str = "Post created!";

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

        const postRepository = getRepository(Post);
        
        let id = req.params.id
        response = await postRepository.findOneOrFail({ where: { id } });

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

        var req_post = Post.from(req.body);

        const postRepository = getRepository(Post);
        await postRepository.save(req_post);
        
        response_str = "Post " + req_post.id + " updated!";

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

        const postRepository = getRepository(Post);
        await postRepository.delete(id);
        
        response_str = "Post " + id + " deleted!";

      response = {success: response_str}
      res.status(HttpStatus.OK).send(response);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  };

  static createPost = async (req: Request, res: Response) => {
    let {title, body, userId, groupId} = req.body;

    try {
        let postRepository = getRepository(Post);
        let userRepository = getRepository(User);
        let groupRepository = getRepository(Group);

        let author = await userRepository.findOneOrFail({ where: { id: userId } });
        let group = await groupRepository.findOneOrFail({ where: { id: groupId } });

        let post = new Post();
        post.title = title;
        post.bodyText = body;
        post.author = author;
        post.group = group;

        if (req.body.hasOwnProperty("files")) {
            if (req.body.files.size > 4) {
                res.status(HttpStatus.CONFLICT).send("Too many files!");
            }

            /* Required because we need the post's id to name the files.
            * Id is generated when entity is saved.               
            */
            post = await postRepository.save(post);

            const postFileRepository = getRepository(PostFile);
            let fileIndex = 0;
            for (let file of req.body.files) {
                let postFile = new PostFile();
                postFile.fileName = `src/asset/post/p_${post.id}_${fileIndex}.png`;

                if (post.postFiles == null) {
                    post.postFiles = [];
                }

                post.postFiles.push(postFile);
                await postFileRepository.save(postFile);

                await Promise.resolve(FileController.uploadPhoto(file, postFile.fileName));
                fileIndex++;
            }
        }

        await postRepository.save(post);

        res.status(HttpStatus.CREATED).send();
        } catch (e) {
            console.log(e);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }

    static getPhoto = async (req: Request, res: Response) => {
        const image = req.body.image;
        try {
          
          const photo = await FileController.getPhoto(image);
          res.status(HttpStatus.OK).send({imageString: photo});
        } catch (e) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
      };
}

export default PostController;
