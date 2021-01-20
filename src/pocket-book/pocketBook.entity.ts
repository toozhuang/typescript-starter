import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn } from 'typeorm';

@Entity('pocket-book')
export class PocketBookEntity {
  @ObjectIdColumn()
  id: number;

  @ManyToOne((type) => UserEntity, (user) => user.pocket_books)
  note_name: UserEntity;
}
