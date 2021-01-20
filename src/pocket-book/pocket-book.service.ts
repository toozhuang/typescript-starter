import { Injectable } from '@nestjs/common';
import { CreatePocketbookDto } from './dto/create-pocketbook-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PocketBookEntity } from './pocketBook.entity';
import { getMongoRepository, Repository } from 'typeorm';

@Injectable()
export class PocketBookService {
  constructor(
    @InjectRepository(PocketBookEntity)
    private readonly pocketBookRepository: Repository<PocketBookEntity>,
  ) {}

  listMyPocketBooks(pocketBookIds: string[]) {
    // todo: 后面再写
    return Promise.resolve(undefined);
  }

  async createPocketBook(pocketBook: CreatePocketbookDto) {
    const { note_name } = pocketBook;
    //  先判断是否具有该 pocket
    const hasPocketBook = await getMongoRepository(PocketBookEntity).find({
      where: { note_name: note_name },
    });

    console.log('是否有: ', hasPocketBook);
  }
}
