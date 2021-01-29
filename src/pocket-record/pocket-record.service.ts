import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PocketRecordEntity } from './pocket-record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PocketRecordService {
  constructor(
    @InjectRepository(PocketRecordEntity) private readonly pocketRecordReponsitory:
                Repository<PocketRecordEntity>) {
  }

  listRecord(){
    return this.pocketRecordReponsitory.find();
  }
}
