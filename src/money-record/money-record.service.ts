/**
 * @author 2Zhuan9
 * @date 26/4/2021
 * @Description: 随手记账单返回的 service
 * 会根据前端的需求返回需要的数据
 * 也可以根据前端的需求返回统一的数据，然后在前端组装
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoneyEntity } from './money.entity';
import { Repository, Connection } from 'typeorm';
import {
  MoneyRecordPie,
  MoneyRecordPieInterface,
} from './interface/money-record.pie.interface';

@Injectable()
export class MoneyRecordService {
  constructor(
    @InjectRepository(MoneyEntity)
    private readonly pocketRecordReponsitory: Repository<MoneyEntity>,
    private readonly connection: Connection,
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

  async returnPieRecords(startDate, endDate) {
    const responsePie: MoneyRecordPieInterface = new MoneyRecordPie();

    const betweenDateQuery = await this.connection
      .getRepository(MoneyEntity)
      .createQueryBuilder('money')
      .select('*')
      .where('transaction_type = :transaction_type', {
        transaction_type: '支出',
      })
      .andWhere('t_date BETWEEN :lastMonth AND :nextMonth', {
        lastMonth: startDate,
        nextMonth: endDate,
      });

    const groupByList = await this.connection
      .createQueryBuilder()
      .select(['type', 'note_name', 't_date'])
      .select('type,transaction_type,id,SUM(amount) AS total')
      .groupBy('type')
      .from('(' + betweenDateQuery.getQuery() + ')', 'money')
      .setParameters(betweenDateQuery.getParameters())
      .getRawMany();

    responsePie.outlst = [];
    responsePie.maxO = 0;
    responsePie.outAmount = 0;
    groupByList.map((item: any) => {
      // 赋值最大花费
      if (Number.parseInt(item.total) > responsePie.maxO) {
        responsePie.maxO = Number.parseInt(item.total);
      }
      // 赋值 花费 list
      responsePie.outlst.push({
        total: Number.parseInt(item.total),
        name: item.type,
        id: item.id,
        transaction_type: item.transaction_type,
      });
      // 赋值 总花费
      responsePie.outAmount += Number.parseInt(item.total);

      responsePie.symbol = item.currency;
    });

    return responsePie;
  }
}
