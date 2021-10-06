import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('pocket-book')
export class PocketBookEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  note_name: string;

  @Column()
  creator: string;

  @Column()
  cover: string;

  @Column({ nullable: true })
  description: string;
}
