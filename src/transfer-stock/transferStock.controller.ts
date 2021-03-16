import { Controller, Get } from '@nestjs/common';
import { TransferStockService } from './transferStock.service';

@Controller('transfer_stock')
export class TransferStockController {

  constructor(private readonly transferStockService: TransferStockService) {
  }
  @Get('list')
  async listStockList() {
    return this.transferStockService.listStockList();
  }
}
