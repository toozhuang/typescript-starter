import { Column, Entity, ManyToOne, ObjectIdColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('money')
export class PocketRecordEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  note_name: string;

  @Column()
  creator: string;

  @Column()
  transaction_type: string;

  @Column()
  type: string;
  @Column()
  sub_type: string;
  @Column()
  account: string;
  @Column()
  currency: string;
  @Column()
  amount: string;
  @Column()
  member: string;
  @Column()
  merchant: string;
  @Column()
  note: string;
  @Column({ type: 'date' })
  t_date: Date;
}
