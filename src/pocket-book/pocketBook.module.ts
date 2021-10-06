import { TypeOrmModule } from '@nestjs/typeorm';
import { PocketBookEntity } from './pocketBook.entity';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PocketBookService } from './pocket-book.service';
import { PocketBookController } from './pocketBook.controller';
import { UserService } from '../user/user.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserEntity } from '../user/user.entity';
import { AutoIdGenerateMiddleware } from '../shared/auto-id-generate.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([PocketBookEntity, UserEntity])],
  controllers: [PocketBookController],
  providers: [PocketBookService, UserService],
})
export class PocketBookModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'pocket_book/create',
      method: RequestMethod.POST,
    });
    // 用户创建账本的时候， 会自动生成 id
    consumer.apply(AutoIdGenerateMiddleware).forRoutes({
      path: 'pocket_book/create',
      method: RequestMethod.POST,
    });
  }
}
