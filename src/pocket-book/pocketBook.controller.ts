import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PocketBookService } from './pocket-book.service';
import { CreatePocketbookDto } from './dto/create-pocketbook-dto';
import { UserDecorator } from '../user/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

const multer = require('multer');

@Controller('pocket_book')
export class PocketBookController {
  constructor(private readonly pocketBookService: PocketBookService) {
  }

  //
  // async listRecordsByType(pocketBook,type){
  //   const allRecords = this.recordService.get
  // }

  /**
   * 获取用户的账本 all
   * @param creator
   */
  @Get('list')
  async listMyPocketBooks(@UserDecorator('email') creator: string) {
    return this.pocketBookService.listMyPocketBooks(creator);
  }

  /**
   *  创建一个 pocketBook
   * @param pocketBook
   */
  @Post('create')
  async createPocketBook(
    @Body() pocketBook: CreatePocketbookDto,
    @UserDecorator('email') creator: string,
  ) {
    const userPocketBook = {
      ...pocketBook,
      creator,
    };
    return this.pocketBookService.createPocketBook(userPocketBook);
  }

  /**
   * Pocket book 的封面
   * @param file
   */
  @Post('cover')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './public/cover',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async addPocketBookCover(@UploadedFile() file) {
    // TODO: 在这里把 发过来的 file 存储到 github 上去, 然后返回 url 地址
    // Note: 目前是存储图片到当前的项目中; 更方便
    return { path: file.path, code: 200 };
  }
}
