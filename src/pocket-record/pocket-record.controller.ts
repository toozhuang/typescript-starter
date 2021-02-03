import { Controller, Get, Param, Query } from '@nestjs/common';
import { PocketRecordService } from './pocket-record.service';
import { query } from 'express';

@Controller('pocket_record')
export class PocketRecordController {
  constructor(private readonly pocketRecordService: PocketRecordService) {
  }

  @Get('list')
  async listRecords(
    @Query('currentPage') currentPage = '1',
    @Query('pageSize') pageSize = '14',
    @Query('sortKey') sortKey = 't_date',
    @Query('sortType') sortType = 'DESC',
  ) {
    return this.pocketRecordService.listRecord(
      parseInt(pageSize, 10),
      parseInt(currentPage, 10),
      sortKey,
      sortType,
    );
  }
}
