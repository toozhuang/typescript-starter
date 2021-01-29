import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PocketRecordEntity } from './pocket-record.entity';
import { PocketRecordController } from './pocket-record.controller';
import { PocketRecordService } from './pocket-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([PocketRecordEntity])],
  controllers: [PocketRecordController],
  providers: [PocketRecordService],
})
export class PocketRecordModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {}
}
