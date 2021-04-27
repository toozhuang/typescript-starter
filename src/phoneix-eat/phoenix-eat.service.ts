import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoenixFoodEntity } from './phoenix-food.entity';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { PhoenixFoodDto } from './dto/phoenix-food.dto';

import * as dayjs from 'dayjs';

@Injectable()
export class PhoenixEatService {
  constructor(
    @InjectRepository(PhoenixFoodEntity)
    private readonly foodEntity: Repository<PhoenixFoodEntity>,
  ) {
  }

  async listAllLunch(selectedDate): Promise<PhoenixFoodDto[] | any> {
    if (selectedDate) {
      // 在 pipe 中已经把 date 的格式格式化为 yyyy-mm-dd， 这里直接比对就好了
      const selectedOriginLunch = await this.foodEntity.find({
        menuDate: selectedDate,
      });

      // 要返回的当天的午饭
      const selectedLunch: PhoenixFoodDto = selectedOriginLunch.map((item) => {
        return {
          menuDate: item.menuDate,
          weekOfDay: item.weekOfDay,
          menuA: item.menuA.trim(),
          menuB: item.menuB.trim(),
          menuC: item.menuC.trim(),
          menuAll: item.menuAll.trim(),
        };
      })[0];

      const selectedOriginWeekLunches = await this.foodEntity.find({
        where: [
          {
            menuDate: Between(
              dayjs(dayjs(selectedDate).add(1, 'day')).format('YYYY-MM-DD') +
              ' 00:00:00',
              dayjs(dayjs(selectedDate).add(7, 'day')).format('YYYY-MM-DD') +
              ' 00:00:00',
            ),
          },
        ],
      });

      const selectedWeekLunches: PhoenixFoodDto[] = selectedOriginWeekLunches.map(
        (item) => {
          return {
            menuDate: item.menuDate,
            weekOfDay: item.weekOfDay,
            menuA: item.menuA.trim(),
            menuB: item.menuB.trim(),
            menuC: item.menuC.trim(),
            menuAll: item.menuAll.trim(),
          };
        },
      );

      return {
        selectedLunch: selectedLunch,
        selectedWeekLunches: selectedWeekLunches,
      };
    } else {
      const lunchList = await this.foodEntity.find();
      const formatList: PhoenixFoodDto[] = lunchList.map((item) => {
        return {
          menuDate: item.menuDate,
          weekOfDay: item.weekOfDay,
          menuA: item.menuA.trim(),
          menuB: item.menuB.trim(),
          menuC: item.menuC.trim(),
          menuAll: item.menuAll.trim(),
        };
      });
      return {
        lunches: formatList,
      };
    }
  }
}
