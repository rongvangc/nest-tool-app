import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserModelDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true, trim: true })
  clerkUserId: string;

  @Prop({ trim: true })
  tiktokLiveID: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
