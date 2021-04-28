import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoneyRecordService } from './money-record.service';
import * as dayjs from 'dayjs';

@Controller('money_record')
export class MoneyRecordController {
  constructor(private readonly moneyRecordService: MoneyRecordService) {}

  @Get('list')
  async listRecords(
    @Query('currentPage') currentPage = '1',
    @Query('pageSize') pageSize = '14',
    @Query('sortKey') sortKey = 't_date',
    @Query('sortType') sortType = 'DESC',
  ) {
    return this.moneyRecordService.listRecord(
      parseInt(pageSize, 10),
      parseInt(currentPage, 10),
      sortKey,
      sortType,
    );
  }

  @Get('list-all')
  async listAllRecords() {
    return this.moneyRecordService.listAllRecord();
  }

  /**
   * 前端会需要组成 Pie 图的值
   * 这里就根据这个需求来返回对应需要的数据
   */
  @Get('list-pie')
  async listRecordsPie(
    @Query('duration') duration = 1,
    @Query('date') date = dayjs().format('YYYY-MM-DD'),
    @Query('startDate') startDate: string,
  ) {
    console.log(duration, date);
    if (!startDate) {
      //  如果没有传 startDate 那么 默认的 filter 的范围就是 date  和 date -1 的month
      startDate = dayjs(dayjs(date).subtract(duration, 'month')).format(
        'YYYY-MM-DD',
      );
      console.log(startDate);
    }

    return this.moneyRecordService.returnPieRecords(startDate, date);
  }
}
