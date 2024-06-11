import { LiveService } from './../live/live.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketEvent } from 'src/utils/socketEvent';
import { WebcastPushConnection } from 'tiktok-live-connector';
import { Inject, forwardRef } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketIOGateway {
  constructor(
    @Inject(forwardRef(() => LiveService))
    private liveService: LiveService,
  ) {}
  private tiktokLiveConnections: WebcastPushConnection;

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(SocketEvent.GET_LIVE_TOPTOP_COMMENT)
  /**
   * Handles the GET_LIVE_TOPTOP_COMMENT event and emits a socket event
   * to update the count of new comments on the room. Also connects to the
   * TikTok live connection and listens for chat messages.
   *
   * @param {Object} messageBody - The message body containing userId and idUserLive.
   * @param {string} messageBody.userId - The user ID.
   * @param {string} messageBody.idUserLive - The ID of the user's live.
   * @return {Promise<void>} A promise that resolves when the socket event and connection are established.
   */
  async onGetLiveTiktokComments(
    @MessageBody()
    { userId, idUserLive },
  ) {
    // Emit socket event for update new count on room
    const socketPromise = this.server
      .to(userId) // Send the event to the specific user
      .emit(SocketEvent.GET_LIVE_TOPTOP_COMMENT, async () => {
        // Connect to the TikTok live connection
        this.tiktokLiveConnections = new WebcastPushConnection(idUserLive);

        try {
          this.tiktokLiveConnections
            .connect()
            .then((state) => {
              console.info(`Connected to roomId ${state.roomId}`);
            })
            .catch((err) => {
              console.error('Failed to connect', err);
            });
        } catch (err) {
          // Log error message if connection fails
          console.error('Failed to connect', err);
          this.tiktokLiveConnections.disconnect();
          throw err;
        }
        const res = await this.liveService.saveLiveSession(
          idUserLive,
          new Date(Date.now()),
        );
        console.log(res);
        // Listen for chat messages
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
            console.log(
              `----cmt from ID 🏷: ${idUserLive} - 📨 - ${nickname}-${comment}-${createTime}`,
            );

            const data = {
              comment,
              userId,
              uniqueId,
              nickname,
              profilePictureUrl,
              createTime,
            };

            this.server
              .to(userId) // Send the event to the specific user
              .emit(SocketEvent.GET_LIVE_TOPTOP_COMMENT, data);
          },
        );
      });

    // Wait for the socket event and connection to be established
    await Promise.all([socketPromise]);
  }

  async disconnectGetLiveTiktok({ userId, idUserLive, sessionId }) {
    if (this.tiktokLiveConnections != undefined) {
      await this.liveService.stopLiveSession(
        idUserLive,
        sessionId,
        new Date(Date.now()),
      );
      this.tiktokLiveConnections.disconnect();
      this.server.disconnectSockets(userId);

      return {
        message: 'Stop live success',
      };
    } else {
      return {
        message:
          'There anre no live on this user, please check the idUserLive and SessionId',
      };
    }
  }
}
