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
    console.log('my date: ', isDateString(value));
    // 对 Date 进行转换， 主要是抓换成 天， 日期就可以了

    if (value && !isDateString(value)) {
      if (metadata.type === 'param') {
        throw new HttpException(
          { error: '请输入正确的日期格式' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return value;
  }
}
