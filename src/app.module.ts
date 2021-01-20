import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './photo/photo.module';
import { UserModule } from './user/user.module';
import { PocketBookModule } from './pocket-book/pocketBook.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PhotoModule, UserModule, PocketBookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
