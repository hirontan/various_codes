import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // Classバリデーション
import { Request } from 'express';
import * as cookieParser from 'cookie-parser'; // Cookie取り出す
import * as csurf from 'csurf'; // csrfトークンを使う
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'],
  });
  app.use(cookieParser());
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'none',
        secure: false,
      },
      value: (req: Request) => {
        return req.header('csrf-token');
      },
    }),
  );
  await app.listen(process.env.PORT || 3300);
}
bootstrap();
