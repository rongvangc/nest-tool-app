import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { HydratedDocument, Types } from 'mongoose';

export type LiveSessionModelDocument = HydratedDocument<LiveSession>;
export type BillDocument = HydratedDocument<Bill>;

@Schema()
export class Bill {
  @Prop({ required: true })
  session: string;
  @Prop({ required: true })
  comment: string;
  @Prop({ required: true })
  idUserLive: string;
  @Prop({ required: true })
  post_id: string;
  @Prop({ required: true })
  nickname: string;
  @Prop({ default: Date.now })
  createdTime: string;
  @Prop({ default: 1 })
  printCount: number;
}

@Schema()
export class LiveSession {
  @Prop({ unique: true })
  sessionId: UUID;
  @Prop()
  idUserLive: string;
  @Prop({ default: Date.now })
  startTime: Date;
  @Prop()
  stopTime: Date;
  @Prop({ type: [Types.ObjectId], ref: Bill.name })
  bills: Bill[];
}

export const LiveSessionSchema = SchemaFactory.createForClass(LiveSession);
export const BillSchema = SchemaFactory.createForClass(Bill);
