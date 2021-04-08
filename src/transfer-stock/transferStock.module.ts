import { TypeOrmModule } from '@nestjs/typeorm';
import { Mi_transfer_stockEntity } from './mi_transfer_stock.entity';
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

import { TransferStockService } from './transferStock.service';
import { AutoIdGenerateMiddleware } from '../shared/auto-id-generate.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Mi_transfer_stockEntity, UserEntity])],
  controllers: [TransferStockController],
  providers: [TransferStockService, UserService],
})
export class TransferStockModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // 所有的入口添加 AuthMiddleware
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'transfer_stock/*',
        method: RequestMethod.POST,
      },
      {
        path: 'transfer_stock/*',
        method: RequestMethod.GET,
      },
    );
    // 添加新record的时候需要 auth 验证
    consumer.apply(AutoIdGenerateMiddleware).forRoutes({
      path: 'transfer_stock/add',
      method: RequestMethod.POST,
    });
  }
}
