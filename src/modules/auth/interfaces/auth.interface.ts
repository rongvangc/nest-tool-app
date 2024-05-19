import { Types } from 'mongoose';

export type SigninResponse = {
  _id: Types.ObjectId;
  access_token: string;
};

export type CreateUserResponse = {
  message: string;
};
