import { Module } from '@nestjs/common';
import { SaveCommentService } from './services/save-comment.service';
import { SaveCommentController } from './controllers/save-comment.controller';
import { ConfigModule } from '@nestjs/config';
import { SocketIOModule } from '../events/socket-io.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SaveComment,
  SaveCommentDocumentSchema,
} from './models/save-comment.models';

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
