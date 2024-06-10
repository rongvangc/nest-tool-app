import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { LiveService } from './services/live.service';
import { LiveController } from './controllers/live.controller';
import { LiveSession, LiveSessionSchema } from './models/liveSession.model';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: LiveSession.name, schema: LiveSessionSchema },
    ]),
  ],
  controllers: [LiveController],
  providers: [LiveService],
  exports: [LiveService],
})
export class LiveModule {}
