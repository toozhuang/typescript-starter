/** 19/1/2021
 *   作者: Wang
 *   功能: 最 basic 的 validate tool, 目前使用的地方是用户注册
 */

import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParamPathCheckPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value) {
      if (metadata.type === 'param') {
        //  如果传入的是 param 那么就要进行各种判断了
        if (value !== metadata.data) {
          throw new HttpException({ error: '路径参数不正确，请检查' }, HttpStatus.BAD_REQUEST);
        }
      }
    }

    return value;
  }
}
