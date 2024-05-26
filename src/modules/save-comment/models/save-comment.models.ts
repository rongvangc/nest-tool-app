import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SaveCommentDocument = HydratedDocument<SaveComment>;

@Schema()
export class SaveComment {
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

export const SaveCommentDocumentSchema =
  SchemaFactory.createForClass(SaveComment);
