import { Module } from '@nestjs/common';
import { SocketIOGateway } from './socket-io.gateway';

@Module({
  providers: [SocketIOGateway],
  exports: [SocketIOGateway],
})
export class SocketIOModule {}
