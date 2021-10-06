import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as serveStatic from 'serve-static';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
const path = require('path');

async function bootstrap() {
  const bb = new AppModule();
  console.log('app module comes: ', bb);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors();

  console.log('path: ', __dirname);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    '/public',
    serveStatic(path.join(__dirname, '../public'), {
      maxAge: '1d',
      extensions: ['jpg', 'jpeg', 'png', 'gif'],
    }),
  );

  // app.useStaticAssets(path.join(__dirname, '../public/'))

  // 设置本地端口号
  await app.listen(2579);
  // app.useStaticAssets('/public');
}

bootstrap();
