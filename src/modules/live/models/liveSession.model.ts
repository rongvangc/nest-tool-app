import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LiveSessionDocument = HydratedDocument<LiveSession>;

@Schema()
export class LiveSession {
  @Prop({ required: true })
  idLiveUser: string;
  @Prop({ required: true })
  userId: string;
  @Prop({ default: Date.now })
  startTime: Date;
  @Prop()
  endTime: string;
  @Prop()
  isLive: boolean;
  @Prop()
  session: number;
}

export const LiveSessionSchema = SchemaFactory.createForClass(LiveSession);
