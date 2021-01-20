import { Body, Controller, Get, Post } from '@nestjs/common';
import { PocketBookService } from './pocket-book.service';
import { CreatePocketbookDto } from './dto/create-pocketbook-dto';

@Controller('pocket')
export class PocketBookController {
  constructor(private readonly pocketBookService: PocketBookService) {}

  @Get('list-my-pocket-book')
  async listMyPocketBooks(pocketBookIds: string[]) {
    return this.pocketBookService.listMyPocketBooks(pocketBookIds);
  }

  @Post()
  async createPocketBook(@Body() pocketBook: CreatePocketbookDto) {
    return this.pocketBookService.createPocketBook(pocketBook);
  }
}
