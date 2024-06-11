import { Module, forwardRef } from '@nestjs/common';
import { SocketIOGateway } from './socket-io.gateway';
import { LiveModule } from '../live/live.module';

@Module({
  imports: [forwardRef(() => LiveModule)],
  providers: [SocketIOGateway],
  exports: [SocketIOGateway],
})
export class SocketIOModule {}
