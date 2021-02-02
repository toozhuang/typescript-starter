/** 19/1/2021
 *   作者: Wang
 *   功能: 用户服务, 提供 注册, 修改,登录 等
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface';
import { getMongoRepository, getRepository, Repository } from 'typeorm';
import * as argon2 from 'argon2';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as jwt from 'jsonwebtoken';

import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { SECRET } from '../config/config';
import { PocketBookEntity } from '../pocket-book/pocketBook.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PocketBookEntity)
    private readonly pocketRepository: Repository<PocketBookEntity>,
  ) {
  }

  async findById(id: string): Promise<any> {
    const user = await this.userRepository.findOne(id);
    return this.buildUser(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    const pocketBook = await this.pocketRepository.findOne({
      where: { creator: email },
    });
    return { ...this.buildUser(user) };
  }

  async findOne(user: LoginUserDto): Promise<UserEntity> {
    const { username, password } = user;
    const userResult = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!userResult) {
      return null;
    }
    // 如果要找到user, 那么还要用 argon2 来verify, 因为存储到数据库的加密过的密码
    if (await argon2.verify(userResult.password, password)) {
      return userResult;
    }
    return null;
  }

  async create(dto: CreateUserDto): Promise<any> {
    const { email, username, password } = dto;
    //  创建前先判断是否具有该user
    // 规则是 email 和 username 要唯一
    const hasUser = await getMongoRepository(UserEntity)
      .find({ where: { $or: [{ username: username }, { email: email }] } })
      .then((value) => {
        console.log(value);
        return value.length !== 0;
      });

    if (hasUser) {
      const errors = { username: '用户名和邮件地址必须要唯一' };
      throw new HttpException(
        { message: '传入数据,验证失败', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.pocket_books = []; // 给一个空的books

    const savedUser = await this.userRepository.save(newUser);

    return this.buildUser(savedUser);
  }

  /**
   * 更具password 生成 token 供前端使用
   * @param user
   */
  public generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }

  private buildUser(user: UserEntity) {
    const goodUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      token: this.generateJWT(user),
      pocket_books: user.pocket_books,
    };

    return { ...goodUser };
  }
}
