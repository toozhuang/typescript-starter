import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransferStockService } from './transferStock.service';
import { TransferDto } from './dto/transfer.dto';
import { RolesGuard } from '../shared/roles.guard';
import { Roles } from '../shared/roles.decorator';

@Controller('transfer_stock')
@UseGuards(RolesGuard)
export class TransferStockController {
  constructor(private readonly transferStockService: TransferStockService) {
  }

  /**
   * 获取所有的交易信息（目前只有小米，而且也Only聚焦小米）
   */
  @Get('list')
  async listStockList() {
    return this.transferStockService.listStockList();
  }

  /***
   * 添加一个 transfer record
   * @param transfer
   */
  @Post('add')
  @Roles('admin') // 只有 admin 角色的人才能今天添加操作
  async addATransfer(@Body('transfer') transfer: TransferDto) {
    return this.transferStockService.addTransaction(transfer);
  }
}
