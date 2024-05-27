import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true })
  comment: string;
  @Prop({ required: true })
  user_id: string;
  @Prop({ required: true })
  post_id: string;
  @Prop({ required: true })
  nickname: string;
  // @Prop({ required: true })
  // createdTime: string;
}

export const CommentDocumentSchema = SchemaFactory.createForClass(Comment);
