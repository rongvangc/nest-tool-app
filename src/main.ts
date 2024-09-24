import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './exceptions/mongo.exception';
import { ClerkAuth } from './guards/clerk-auth.guard';
import { ConfigService } from '@nestjs/config';
import { CloudConfigService } from './configs/cloud-config.service';
import { ClerkConfigService } from './modules/clerk/services/clerk.service';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);
  const cloudConfigService = app.get(CloudConfigService);
  const clerkConfigService = app.get(ClerkConfigService);
  const PORT = configService.get<number>('PORT', 4000) as number;

  const reflector = app.get(Reflector);

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.enableCors();
  app.useGlobalGuards(
    new ClerkAuth(reflector, cloudConfigService, clerkConfigService),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.setGlobalPrefix('api');

  await app.listen(PORT);
}
bootstrap();
