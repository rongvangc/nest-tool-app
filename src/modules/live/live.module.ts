import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { LiveService } from './live.service';
import { LiveSession, LiveSessionSchema } from './models/live.model';
import { SocketIOModule } from '../events/socket-io.module';
import { LiveController } from './controllers/live.constroller';

@Module({
  imports: [
    forwardRef(() => SocketIOModule),
    MongooseModule.forFeature([
      { name: LiveSession.name, schema: LiveSessionSchema },
    ]),
  ],
  controllers: [LiveController],
  exports: [LiveService],
  providers: [LiveService],
})
export class LiveModule {}
