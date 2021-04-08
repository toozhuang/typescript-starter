import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Mi_transfer_stockEntity } from './mi_transfer_stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferDto } from './dto/transfer.dto';

@Injectable()
export class TransferStockService {
  constructor(
    @InjectRepository(Mi_transfer_stockEntity)
    private readonly miEntity: Repository<Mi_transfer_stockEntity>,
  ) {}

  listStockList() {
    return this.miEntity.find();
  }

  addTransaction(transfer: TransferDto) {
    try {
      const transferEntity = new Mi_transfer_stockEntity();
      transferEntity.name = transfer.name;
      transferEntity.mi_id = transfer.mi_id;
      transferEntity.name_code = transfer.name;
      transferEntity.transaction_date = transfer.transaction_date;
      transferEntity.transaction_price = transfer.transaction_price;
      transferEntity.transaction_type = transfer.transaction_type;
      transferEntity.amount = transfer.amount;
      transferEntity.success_amount = transfer.success_amount;
      transferEntity.status = transfer.status;

      const responseEntity = this.miEntity.save(transferEntity);

      return responseEntity;
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },

        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
