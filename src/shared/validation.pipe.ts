/** 19/1/2021
 *   作者: Wang
 *   功能: 最 basic 的 validate tool, 目前使用的地方是用户注册
 */

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
