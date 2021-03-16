import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferStockEntity } from './transfer-stock.entity';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UserService } from '../user/user.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserEntity } from '../user/user.entity';
import { TransferStockController } from './transferStock.controller';
import { PocketBookEntity } from '../pocket-book/pocketBook.entity';
import { TransferStockService } from './transferStock.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransferStockEntity,
      PocketBookEntity,
      UserEntity,
    ]),
  ],
  controllers: [TransferStockController],
  providers: [TransferStockService, UserService],
})
export class TransferStockModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // 添加新record的时候需要 auth 验证
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'transfer_stock/add',
      method: RequestMethod.POST,
    });
  }
}
