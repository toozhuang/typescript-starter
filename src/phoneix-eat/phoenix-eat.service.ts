import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoenixFoodEntity } from './phoenix-food.entity';
import {
  Between,
  Connection,
  createQueryBuilder,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';
import { PhoenixFoodDto } from './dto/phoenix-food.dto';

import * as dayjs from 'dayjs';
import { PhoenixFoodCommentEntity } from './phoenix-food-comment.entity';
import { PhoenixFoodCommentDtoDto } from './dto/phoenix-food-comment.dto';

@Injectable()
export class PhoenixEatService {
  constructor(
    @InjectRepository(PhoenixFoodEntity)
    private readonly foodEntity: Repository<PhoenixFoodEntity>,
    @InjectRepository(PhoenixFoodCommentEntity)
    private readonly foodCommentEntity: Repository<PhoenixFoodCommentEntity>,
    private readonly connection: Connection,
  ) {}

  async listAllLunch(selectedDate): Promise<PhoenixFoodDto[] | any> {
    if (selectedDate) {
      // todo: 还没有在这里获取所有的包含comment的信息
      // 在 pipe 中已经把 date 的格式格式化为 yyyy-mm-dd， 这里直接比对就好了
      const selectedOriginLunch = await this.foodEntity.find({
        menuDate: selectedDate,
      });

      // 返回的当天的午饭
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
      // this.connection
      //   .getRepository(PhoenixFoodEntity)
      const lunchList = await this.foodEntity.find({ relations: ['comments'] });

      const formatList: PhoenixFoodDto[] = lunchList.map((item) => {
        return {
          menuDate: item.menuDate,
          weekOfDay: item.weekOfDay,
          menuA: item.menuA.trim(),
          menuB: item.menuB.trim(),
          menuC: item.menuC.trim(),
          menuAll: item.menuAll.trim(),
          comments: item.comments,
        };
      });
      return {
        lunches: formatList,
      };
    }
  }

  async editComment(comment: PhoenixFoodCommentDtoDto) {
    // console.log(comment);
    // Note: 可以看出来
    // 当我们尝试更新一个表中的外键的时候，
    // 并不能简单的更改该外键的值，
    // 而是需要找到我需要改的值对应的entity
    // 比如要从 A 改成 B
    // 那么 外键B 在对应的表里肯定有对应的entity （find 找到
    // 然后更新 update 我们这个 comment 表的时候
    // 就要把 B 对应的一整个 entity 拿到， 然后
    // 放到这个 comment eneity 里面去
    // 就是下面这个样子才可以
    const commentEntity = new PhoenixFoodCommentEntity();
    const lunchEntity = await this.foodEntity.find({
      menuDate: comment.lunchDate,
    });
    console.log(lunchEntity);
    commentEntity.comment = comment.comment;
    commentEntity.phoenixFoodEntity = lunchEntity[0];
    commentEntity.commentId = comment.commentId;
    if (comment.commentId) {
      return await this.foodCommentEntity.update(
        comment.commentId,
        commentEntity,
      );

      // return await this.foodCommentEntity.save(commentEntity);
    }
    return Promise.resolve(undefined);
  }
}
