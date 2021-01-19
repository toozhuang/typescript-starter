/** 19/1/2021
 *   作者: Wang
 *   功能: 用户服务, 提供 注册, 修改,登录 等
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface';
import { getMongoRepository, getRepository, Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
const SECRET = 'shiwoma';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  async create(dto: CreateUserDto): Promise<User> {
    const { email, username, password } = dto;
    //  创建前先判断是否具有该user
    // const queryUserResult = getRepository(UserEntity)
    //   .createQueryBuilder('user')
    //   .where('user.username = :username', { username })
    //   .orWhere('user.email=:email', { email }).then(value=>{
    //     console.log('wawwa: ', value);
    //   });

    const hasUser = await getMongoRepository(UserEntity)
      .find({ where: { username: username } })
      .then((value) => {
        console.log(value);
        return value == [];
      });

    console.log('hasUser:: ', hasUser);
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
    };

    return { user: goodUser };
  }
}
