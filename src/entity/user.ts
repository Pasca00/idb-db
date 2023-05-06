import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";
import {classToPlain} from "class-transformer";

@Entity()
@Unique(["username"])
export class User {

  static from(json: any) {
    return Object.assign(new User(), json);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  // @Exclude({ toPlainOnly: true })
  password!: string;

  @Column()
  role!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  birthDate!: Date;

  @Column()
  email!: string;

  @Column()
  imageString!: string;

  @Column()
  profilePic!: string;

  hashPassword() {
      // this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {

    return unencryptedPassword == this.password;
    // return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
