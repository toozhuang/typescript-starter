/* eslint-disable */
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, RelationId } from 'typeorm';
import { PhoenixFoodEntity } from './phoenix-food.entity';

@Entity('lunch_comment')
export class PhoenixFoodCommentEntity {

  @PrimaryColumn()
  commentId: String;

  @Column()
  comment: string;

  @ManyToOne(
    (type) => PhoenixFoodEntity,
    // @ts-ignore
      (food) => food.comments,
  )
  // 指定本表中的外键（JoinColumn只存在于多端，因为外键只会存在于多端）
  @JoinColumn({name:'lunchDate'})
  phoenixFoodEntity: PhoenixFoodEntity; // 这个定义的name 是变量的名字， 上面的name 是我们 Phoneix table 的名字
// //  实际上这里我要找的是一个外键的东西
//   这个地方会创建对应的 foreign key， 如果没有这个 RelationId 就不会创建对应的key
  // d但是并不影响使用
  // 并且有了这个以后， 会结合上面的 many to one 来创建一个外键
  // 这个外键的作用就是
  @RelationId((foodCommentEntity: PhoenixFoodCommentEntity) => foodCommentEntity.phoenixFoodEntity) //指定foreignkey，要設定inverse property
  lunchDate: string;

}
