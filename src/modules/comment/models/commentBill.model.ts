import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommenBillDocument = HydratedDocument<CommentBill>;

@Schema()
export class CommentBill {
  @Prop({ required: true })
  session: string;
  @Prop({ required: true })
  comment: string;
  @Prop({ required: true })
  user_id: string;
  @Prop({ required: true })
  post_id: string;
  @Prop({ required: true })
  nickname: string;
  @Prop({ default: Date.now })
  createdTime: string;
  @Prop({ default: 1 })
  printCount: number;
}

export const CommenBillSchema = SchemaFactory.createForClass(CommentBill);
