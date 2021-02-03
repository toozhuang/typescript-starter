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
import { awsToken } from '../config/aws.token';

const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const multer = require('multer');

aws.config.update(awsToken);

const s3 = new aws.S3();

const uploadType = {
  localStorage: multer.diskStorage({
    destination: './public/cover',
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  cloudStorage: multerS3({
    s3: s3,
    bucket: 'demoofergou', // bucket name
    key: function(req, file, cb) {
      console.log(file);
      cb(null, file.originalname); //use Date.now() for unique file keys
    },
  }),
};

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
      storage: uploadType.cloudStorage,
    }),
  )
  async addPocketBookCover(@UploadedFile() file) {
    console.log('来了吗:::: ', file);
    // TODO: 在这里把 发过来的 file 存储到 github 上去, 然后返回 url 地址
    // Note: 目前是存储图片到当前的项目中; 更方便
    return { path: file.location, code: 200 };
  }
}
