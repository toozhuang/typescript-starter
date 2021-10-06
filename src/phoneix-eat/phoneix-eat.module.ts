import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoenixFoodEntity } from './phoenix-food.entity';
import { PhoenixEatController } from './phoenix-eat.controller';
import { PhoenixEatService } from './phoenix-eat.service';
import { PhoenixFoodCommentEntity } from './phoenix-food-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhoenixFoodEntity, PhoenixFoodCommentEntity]),
  ],
  controllers: [PhoenixEatController],
  providers: [PhoenixEatService],
})
export class PhoneixEatModule {}
