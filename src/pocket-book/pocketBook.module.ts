import { TypeOrmModule } from '@nestjs/typeorm';
import { PocketBookEntity } from './pocketBook.entity';
import { Controller, Module } from '@nestjs/common';
import { PocketBookService } from './pocket-book.service';
import { PocketBookController } from './pocketBook.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PocketBookEntity])],
  controllers: [PocketBookController],
  providers: [PocketBookService],
})
export class PocketBookModule {
}
