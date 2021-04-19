import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isDateString } from 'class-validator';

@Injectable()
export class DataPhrasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value && !isDateString(value, { strict: false })) {
      if (metadata.type === 'param') {
        throw new HttpException(
          { error: '请输入正确的日期格式, YYYY-MM-DD' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (value !== undefined) {
      return value + ' 00:00:00';
    }
    // 如果没有传入 对应的日期， 那么就直接返回false， 不走固定日期的查询
    return false;
  }
}
