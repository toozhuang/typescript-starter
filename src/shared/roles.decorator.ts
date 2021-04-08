import { SetMetadata } from '@nestjs/common';

/***
 * 传入的是 roles， 但是在方法这里
 * 把roles 变成了 数组的结构
 * 这个使用的就是 ES6 的特性了
 * @param roles
 * @constructor
 */
export const Roles = (...roles: string[]) => {
  return SetMetadata('roles', roles);
};
