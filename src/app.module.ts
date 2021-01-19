import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
