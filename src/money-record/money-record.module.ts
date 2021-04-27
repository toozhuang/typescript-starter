import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoneyRecordEntity } from './money-record.entity';
import { MoneyRecordController } from './money-record.controller';
import { MoneyRecordService } from './money-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([MoneyRecordEntity])],
  controllers: [MoneyRecordController],
  providers: [MoneyRecordService],
})
export class MoneyRecordModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {}
}
