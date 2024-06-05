import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './exceptions/mongo.exception';
import { ClerkAuth } from './guards/clerk-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);

  app.enableCors();

  app.useGlobalGuards(new ClerkAuth(reflector));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
}
bootstrap();
