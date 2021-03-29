import { Injectable } from '@nestjs/common';
import { Mi_transfer_stockEntity } from './mi_transfer_stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransferStockService {
  constructor(
    @InjectRepository(Mi_transfer_stockEntity)
    private readonly miEntity: Repository<Mi_transfer_stockEntity>,
  ) {}

  listStockList() {
    return this.miEntity.find();
  }
}
