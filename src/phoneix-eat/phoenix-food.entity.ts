import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
