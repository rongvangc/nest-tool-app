import { Types } from 'mongoose';

export type GetUserResponse = {
  _id: Types.ObjectId;
  displayName: string;
  photoURL: string;
  email: string;
};

export type GetUsersResponse = {
  _id: Types.ObjectId;
  displayName: string;
  photoURL: string;
  email: string;
}[];
