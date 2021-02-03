import { Controller, Get } from '@nestjs/common';
import { PocketRecordService } from './pocket-record.service';

@Controller('pocket_record')
export class PocketRecordController {
  constructor(private readonly pocketRecordService: PocketRecordService) {}

  @Get('list')
  async listRecords() {
    return this.pocketRecordService.listRecord();
  }
}
