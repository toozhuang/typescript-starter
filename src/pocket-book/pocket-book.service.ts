import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePocketbookDto } from './dto/create-pocketbook-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PocketBookEntity } from './pocketBook.entity';
import { getMongoRepository, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

const loadsh = require('lodash');

@Injectable()
export class PocketBookService {
  constructor(
    @InjectRepository(PocketBookEntity)
    private readonly pocketBookRepository: Repository<PocketBookEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  listMyPocketBooks(creator: string) {
    // todo: 后面再写
    return this.pocketBookRepository.find({ creator });
  }

  async createPocketBook(pocketBook: CreatePocketbookDto) {
    const { note_name, creator } = pocketBook;
    console.log(pocketBook);
    //  先判断是否具有该 pocket
    const hasPocketBook = await getMongoRepository(PocketBookEntity).find({
      where: { $and: [{ creator: creator }, { note_name: note_name }] },
    });
    if (hasPocketBook.length !== 0) {
      throw new HttpException(
        { errors: '该账本名称已经存在' },
        HttpStatus.BAD_REQUEST,
      );
    }
    // 继续创建该账本
    // 注意这个时候要更新两个表, 一个是本表, 一个是用户的表, 用户的表就是我们那个 one to many 的关系
    // 更新用户表是 添加一个对应的 pocket 到用户信息字段

    const newPocketBook = new PocketBookEntity();
    newPocketBook.note_name = note_name;
    newPocketBook.creator = creator;
    try {
      const pocketResult = await this.pocketBookRepository.save(newPocketBook);
      // 先获取 user
      const user = await this.userRepository.findOne({
        where: { email: creator },
      });

      let exist_pocketBooks = user.pocket_books;

      exist_pocketBooks.push(note_name);

      exist_pocketBooks = loadsh.uniq(exist_pocketBooks);

      await this.userRepository.update(
        { email: creator },
        { pocket_books: exist_pocketBooks },
      );

      return {
        message: ' 成功了',
      };
    } catch (e) {
      throw new HttpException({ errors: e }, HttpStatus.BAD_REQUEST);
    }
  }
}
