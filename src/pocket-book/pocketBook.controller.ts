import { Body, Controller, Get, Post } from '@nestjs/common';
import { PocketBookService } from './pocket-book.service';
import { CreatePocketbookDto } from './dto/create-pocketbook-dto';
import { UserDecorator } from '../user/user.decorator';

@Controller('pocket')
export class PocketBookController {
  constructor(private readonly pocketBookService: PocketBookService) {
  }

  @Get('list-my-pocket-book')
  async listMyPocketBooks(pocketBookIds: string[]) {
    return this.pocketBookService.listMyPocketBooks(pocketBookIds);
  }

  /**
   *  创建一个 pocketBook
   * @param pocketBook
   */
  @Post('create')
  async createPocketBook(@Body() pocketBook: CreatePocketbookDto, @UserDecorator('email') creator: string) {
    const userPocketBook = {
      ...pocketBook,
      creator,
    };
    return this.pocketBookService.createPocketBook(userPocketBook);
  }
}
