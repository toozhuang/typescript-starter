/** 20/1/2021
 *   作者: Wang
 *   功能: 验证流程 中间层
 *   确保用户的api请求都包含了 token
 *   这个 token 反向可以获取到用户的信息, 解密后
 */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config/config';
import { IGetUserAuthInfoRequest } from '../global_interface/i.get.user.auth.info.request';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[0]) {
      const token = (authHeaders as string).split(' ')[0];
      const decoded = jwt.verify(token, SECRET);
      const user = await this.userService.findById(decoded.id);
      if (!user) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }

      req.user = user;
      next();
    } else {
      throw new HttpException(
        { errors: '没有授权, 请检查是否登录' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
