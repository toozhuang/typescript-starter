import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TransferStockModule } from './transfer-stock/transferStock.module';
import { PhoneixEatModule } from './phoneix-eat/phoneix-eat.module';
import { PocketBookModule } from './pocket-book/pocketBook.module';
import { WebhookModule } from './webhook/webhook.module';
import { MoneyRecordModule } from './money-record/money-record.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // PhotoModule,
    UserModule,
    PocketBookModule,
    MoneyRecordModule,
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
