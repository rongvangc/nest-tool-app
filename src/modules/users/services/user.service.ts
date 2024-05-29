import { PaginatedResourceResponse } from './../../../../node_modules/@clerk/backend/dist/api/resources/Deserializer.d';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/common/types';
import { GetUserResponse } from '../interfaces/user.interface';
import { User, UserModelDocument } from '../models/user.model';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { User as ClerkUser } from '@clerk/clerk-sdk-node';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModelDocument>,
  ) {}

  async getUser(id: string): Promise<ApiResponse<GetUserResponse>> {
    console.log('id', id);
    const user = await this.userModel.findById(id);
    return {
      data: {
        _id: user?._id,
        email: user?.email,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
      },
    };
  }

  async getAllUser(): Promise<PaginatedResourceResponse<ClerkUser[]>> {
    const userList = await clerkClient.users.getUserList();
    return userList;
  }
}
