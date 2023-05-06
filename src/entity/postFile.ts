import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./post";
import {classToPlain, Exclude} from "class-transformer";

@Entity()
export class PostFile {

    static from(json: any) {
        return Object.assign(new PostFile(), json);
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fileName!: string;

    @ManyToOne(() => Post, post => post.postFiles)
    @JoinColumn()
    post!: Post;

    toJSON() {
        return classToPlain(this);
    }
}
