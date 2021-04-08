import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  // 引入反射， 从 metaData中取值
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.includes(userRole);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      // 不传递 roles 过来
      // 就代表这个router 没有 guard 不需要关注
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // 因为在这个前面有一个 auth middleware 的保护
    // 所以只要能进来 肯定就是有这个user 对象的了
    const user = request.user;

    if (!this.matchRoles(roles, user.roles)) {
      throw new UnauthorizedException({
        statusCode: 403,
        message: '该用户权限不足',
      });
    }
    return true;
  }
}
