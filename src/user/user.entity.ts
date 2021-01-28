/** 19/1/2021
 *   作者: Wang
 *   功能: User Entity 和 数据库的一一对应
 */
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  ObjectIdColumn,
  OneToMany,
  PrimaryColumn, PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { PocketBookEntity } from '../pocket-book/pocketBook.entity';

@Entity('user')
export class UserEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  //  password 插入之前要加密一下
  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  // @OneToMany((type) => PocketBookEntity, (pocket) => pocket.note_name)
  @Column()
  pocket_books: string[];
}
