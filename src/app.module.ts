import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TransferStockModule } from './transfer-stock/transferStock.module';
import { PhoneixEatModule } from './phoneix-eat/phoneix-eat.module';
import { PocketBookModule } from './pocket-book/pocketBook.module';
import { PocketRecordModule } from './pocket-record/pocket-record.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // PhotoModule,
    UserModule,
    PocketBookModule,
    PocketRecordModule,
    TransferStockModule,
    PhoneixEatModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('invoke app module constructor');
  }
}
