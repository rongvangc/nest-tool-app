import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserModelDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true, trim: true })
  email: string;

  @Prop({ unique: true, trim: true })
  phone: string;

  @Prop({ required: true, trim: true })
  displayName: string;

  @Prop({ required: true, trim: true })
  photoURL: string;

  @Prop({ required: true, trim: true })
  hash: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
