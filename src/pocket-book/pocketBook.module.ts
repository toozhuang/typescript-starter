import { TypeOrmModule } from '@nestjs/typeorm';
import { PocketBookEntity } from './pocketBook.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([PocketBookEntity])],
})
export class PocketBookModule {}
