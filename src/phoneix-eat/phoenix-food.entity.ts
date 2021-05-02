/* eslint-disable */
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { PhoenixFoodCommentEntity } from './phoenix-food-comment.entity';

@Entity('lunch')
export class PhoenixFoodEntity {
  @PrimaryColumn({ type: 'datetime' })
  menuDate: Date;
  @Column()
  weekOfDay: string;
  @Column()
  menuA: string;
  @Column()
  menuB: string;
  @Column()
  menuC: string;
  @Column()
  menuAll: string;
  @OneToMany(type => PhoenixFoodCommentEntity, foodCommentEntity => foodCommentEntity.phoenixFoodEntity)
    // type指定User  第二個引數是function預設傳入第一個引數的type，這邊需要設定inverse屬性，user entity裡的dep屬性，這個屬性不會存到資料庫
  comments: PhoenixFoodCommentEntity[];

  // @OneToMany(
  //   (type) => PhoenixFoodCommentEntity,
  //   // @ts-ignore
  //   (comment) => PhoenixFoodCommentEntity.lunchDate,
  // )
  // // 指定本表中的外键（JoinColumn只存在于多端，因为外键只会存在于多端）
  // @JoinColumn({ name: 'comment' })
  // comment: PhoenixFoodCommentEntity;
}
