import { Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { SocketEvent } from 'src/utils/socketEvent';
import { WebcastPushConnection } from 'tiktok-live-connector';
import { User, UserModelDocument } from '../users/models/user.model';
import { LiveService } from './../live/live.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketIOGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(forwardRef(() => LiveService))
    @InjectModel(User.name)
    private userModel: Model<UserModelDocument>,
    private liveService: LiveService,
  ) {}

  private tiktokLiveConnections: WebcastPushConnection;

  @WebSocketServer() server: Server;

  afterInit() {
    console.log('Initialized');
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const { sockets } = this.server.sockets;

    console.log(`Client id: ${client.id} connected`);
    console.log(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage(SocketEvent.START_LIVE)
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { tiktokLiveID, userClerkId },
  ) {
    client.join(userClerkId);

    this.tiktokLiveConnections = new WebcastPushConnection(tiktokLiveID, {
      processInitialData: false,
      enableExtendedGiftInfo: true,
      enableWebsocketUpgrade: true,
      requestPollingIntervalMs: 2000,
      clientParams: {},
      requestOptions: {
        timeout: 10000,
      },
      websocketOptions: {
        timeout: 10000,
      },
      signProviderOptions: {
        host: 'https://tiktok-sign.toandev.space/',
      },
    });

    this.tiktokLiveConnections
      .connect()
      .then((state) => {
        console.info(`Connected to roomId ${state.roomId}`);

        this.liveService.saveLiveSession(userClerkId, new Date(Date.now()));
      })
      .catch((err) => {
        console.error('Failed to connect', err);
        this.server.to(userClerkId).emit(SocketEvent.STOP_LIVE, true);
        this.tiktokLiveConnections.disconnect();
      });

    this.tiktokLiveConnections.on(
      'chat',
      ({
        comment,
        userId,
        nickname,
        uniqueId,
        profilePictureUrl,
        createTime,
      }) => {
        // Log the received chat message
        console.log(`----cmt from ID - ${nickname}-${comment}-${createTime}`);

        const data = {
          comment,
          userId,
          uniqueId,
          nickname,
          profilePictureUrl,
          createTime,
        };

        this.server.to(userClerkId).emit(SocketEvent.SEND_COMMENT, data);
      },
    );
  }

  @SubscribeMessage(SocketEvent.STOP_LIVE)
  handleStopLive() {
    this.tiktokLiveConnections.disconnect();
  }
}
