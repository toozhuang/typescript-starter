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
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';

// import { PocketBookEntity } from '../pocket-book/pocketBook.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: false })
  roles: string;

  // password 插入之前要加密一下
  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
