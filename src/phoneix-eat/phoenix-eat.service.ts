import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoenixFoodEntity } from './phoenix-food.entity';
import { Repository } from 'typeorm';
import { PhoenixFoodDto } from './dto/phoenix-food.dto';

@Injectable()
export class PhoenixEatService {
  constructor(
    @InjectRepository(PhoenixFoodEntity)
    private readonly foodEntity: Repository<PhoenixFoodEntity>,
  ) {
  }

  async listAllLunch(): Promise<PhoenixFoodDto[]> {
    const lunchList = await this.foodEntity.find();
    const formartList: PhoenixFoodDto[] = lunchList.map((item) => {

      return {
        menuDate: item.menuDate,
        weekOfDay: item.weekOfDay,
        menuA: item.menuA,
        menuB: item.menuB,
        menuC: item.menuC,
        menuAll: item.menuAll,
      };
    });
    return formartList;
  }
}
