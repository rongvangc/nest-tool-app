import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ToptopModelDocument = HydratedDocument<Toptop>;

@Schema()
export class Toptop {
  @Prop({ unique: true, trim: true })
  email: string;

  @Prop({ trim: true })
  displayName: string;

  @Prop({ trim: true })
  photoURL: string;

  @Prop({ trim: true })
  hash: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const ToptopSchema = SchemaFactory.createForClass(Toptop);
