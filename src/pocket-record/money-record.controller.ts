import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoneyRecordService } from './money-record.service';
import { query } from 'express';

@Controller('pocket_record')
export class MoneyRecordController {
  constructor(private readonly moneyRecordService: MoneyRecordService) {
  }

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
  async listAllRecords(){
    return this.moneyRecordService.listAllRecord()
  }

  /**
   * 前端会需要组成 Pie 图的值
   * 这里就根据这个需求来返回对应需要的数据
   */
  @Get('list-pie')
  async listRecordsPie(){
      return this.moneyRecordService.returnPieRecords()
  }
}
