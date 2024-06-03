import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { ConfigModule } from '@nestjs/config';
import { SocketIOModule } from '../events/socket-io.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommenBillSchema, CommentBill } from './models/commentBill.model';

@Module({
  imports: [
    ConfigModule,
    SocketIOModule,
    MongooseModule.forFeature([
      { name: CommentBill.name, schema: CommenBillSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
