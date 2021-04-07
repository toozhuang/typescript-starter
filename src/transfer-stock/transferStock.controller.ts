import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransferStockService } from './transferStock.service';
import { TransferDto } from './dto/transfer.dto';

@Controller('transfer_stock')
export class TransferStockController {
  constructor(private readonly transferStockService: TransferStockService) {}

  @Get('list')
  async listStockList() {
    return this.transferStockService.listStockList();
  }

  @Post('add')
  async addATransfer(@Body('transfer') transfer: TransferDto) {
    return this.transferStockService.addTransaction(transfer);
  }
}
