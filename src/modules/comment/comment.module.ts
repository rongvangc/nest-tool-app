import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { ConfigModule } from '@nestjs/config';
import { SocketIOModule } from '../events/socket-io.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentDocumentSchema } from './models/comment.models';

@Module({
  imports: [
    ConfigModule,
    SocketIOModule,
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentDocumentSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
