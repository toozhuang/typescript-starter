import { Injectable } from '@nestjs/common';
import { TransferStockEntity } from './transfer-stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransferStockService {
  constructor(
    @InjectRepository(TransferStockEntity)
    private readonly transferStockEntityRepository: Repository<
      TransferStockEntity
    >,
  ) {}

  listStockList() {
    return this.transferStockEntityRepository.find();
  }
}
