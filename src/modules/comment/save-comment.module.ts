import { Module } from '@nestjs/common';
import { SaveCommentService } from './services/comment.service';
import { SaveCommentController } from './controllers/comment.controller';
import { ConfigModule } from '@nestjs/config';
import { SocketIOModule } from '../events/socket-io.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SaveComment,
  SaveCommentDocumentSchema,
} from './models/comment.models';

@Module({
  imports: [
    ConfigModule,
    SocketIOModule,
    MongooseModule.forFeature([
      { name: SaveComment.name, schema: SaveCommentDocumentSchema },
    ]),
  ],
  controllers: [SaveCommentController],
  providers: [SaveCommentService],
  exports: [SaveCommentService],
})
export class SaveCommentModule {}
