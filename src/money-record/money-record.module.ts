import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoneyEntity } from './money.entity';
import { MoneyRecordController } from './money-record.controller';
import { MoneyRecordService } from './money-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([MoneyEntity])],
  controllers: [MoneyRecordController],
  providers: [MoneyRecordService],
})
export class MoneyRecordModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {}
}
