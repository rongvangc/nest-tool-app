import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './exceptions/mongo.exception';
import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);

  app.enableCors();

  app.useGlobalGuards(new AuthGuard(jwtService, reflector));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
}
bootstrap();
