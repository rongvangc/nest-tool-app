// import { SaveComment } from './../save-comment/models/save-comment.models';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketEvent } from 'src/utils/socketEvent';
import { WebcastPushConnection } from 'tiktok-live-connector';
// import { SaveCommentService } from '../save-comment/services/save-comment.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketIOGateway {
  @WebSocketServer()
  server: Server;
  // constructor(private readonly saveCommentService: SaveCommentService) {}

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
        const tiktokLiveConnection = new WebcastPushConnection(idUserLive);
        console.log('tiktokLiveConnection', tiktokLiveConnection);
        try {
          tiktokLiveConnection
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
          tiktokLiveConnection.disconnect();
          throw err;
        }
        // Listen for chat messages
        tiktokLiveConnection.on(
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
            // this.saveCommentService.create({
            //   comment,
            //   user_id: userId,
            //   post_id: uniqueId,
            //   nickname,
            //   createdTime: createTime,
            // });

            this.server
              .to(userId) // Send the event to the specific user
              .emit(SocketEvent.GET_LIVE_TOPTOP_COMMENT, data);
          },
        );
      });

    // Wait for the socket event and connection to be established
    await Promise.all([socketPromise]);
  }
}
