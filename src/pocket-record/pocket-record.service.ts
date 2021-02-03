import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PocketRecordEntity } from './pocket-record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PocketRecordService {
  constructor(
    @InjectRepository(PocketRecordEntity)
    private readonly pocketRecordReponsitory: Repository<PocketRecordEntity>,
  ) {
  }

  async listRecord(pageSize = 10, currentPage = 1, sortKey, sortType) {
    const take = pageSize;
    const skip = pageSize * (currentPage - 1);
    let order = {};
    if (sortKey && sortType) {
      order = {
        [sortKey]: sortType === 'ascending' ? 'ASC' : 'DESC',
      };
    }

    const [result, total] = await this.pocketRecordReponsitory.findAndCount({
      order,
      take,
      skip,
    });
    return {
      data: result,
      count: total,
    };
  }
}
