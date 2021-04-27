/**
 * @author 2Zhuan9
 * @date 26/4/2021
 * @Description: 随手记账单返回的 service
 * 会根据前端的需求返回需要的数据
 * 也可以根据前端的需求返回统一的数据，然后在前端组装
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoneyRecordEntity } from './money-record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoneyRecordService {
  constructor(
    @InjectRepository(MoneyRecordEntity)
    private readonly pocketRecordReponsitory: Repository<MoneyRecordEntity>,
  ) {}

  async listAllRecord() {
    return this.pocketRecordReponsitory.find();
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

  async returnPieRecords() {
    console.log('来是来了');
    const groupByList =  await this.pocketRecordReponsitory
      .createQueryBuilder()
      .groupBy("type").getMany()

    return groupByList.map(item=>{
      return {
        amount: item.amount,
        type: item.type
      }
    })

  }
}
