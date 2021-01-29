/** 20/1/2021
 *   作者: Wang
 *   功能: 创建一个 参数的 Decorator
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config/config';

/**
 * 在整个应用程序中拿取值, 而不依靠我们 传入的值
 * 这个就相当于一个独立的中间层, 用来给我们的 handler 配置值.
 * 并且由于我们在这个 handler(controller 之前就已经做了一个 auth layer 的操作,
 * 所以我们能保证 我们的 req 里面肯定有值 或者 我们一定有 token
 */
export const UserDecorator = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest(); // 获取我当前handler的request

    // 如果当前的 request 中有user
    if (!!req.user) {
      // 返回我这个装饰传入参数作为key对应的value
      return !!data ? req.user[data] : req.user;
    }

    //  如果这个地方传入的没有 req中user的信息, 那么我们就通过header中的token来解锁获取user的信息
    const tokenGet = req.headers.authorization || req.query.token;
    const token = tokenGet ? (tokenGet as string).split(' ') : null;
    if (token && token[0]) {
      const decoded = jwt.verify(token[0], SECRET);
      return !!data ? decoded[data] : decoded;
    }
  },
);
