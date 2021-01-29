import { Body, Controller, Get, Post } from '@nestjs/common';
import { PocketBookService } from './pocket-book.service';
import { CreatePocketbookDto } from './dto/create-pocketbook-dto';
import { UserDecorator } from '../user/user.decorator';

@Controller('pocket_book')
export class PocketBookController {
  constructor(private readonly pocketBookService: PocketBookService) {}

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
}
