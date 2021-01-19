import {Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Photo {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  filename: string;

  @Column()
  isPublished: boolean;
}
