import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/common/types';
import { GetUserResponse } from '../interfaces/user.interface';
import { User, UserModelDocument } from '../models/user.model';
import { SignInToken, clerkClient } from '@clerk/clerk-sdk-node';
import { User as ClerkUser } from '@clerk/clerk-sdk-node';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModelDocument>,
  ) {}

  async getUser(id: string): Promise<ApiResponse<GetUserResponse>> {
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

  async getCurrentUser(id: string): Promise<ClerkUser> {
    const userList = await clerkClient.users.getUser(id);

    return userList;
  }

  async getClerkToken({ userId }): Promise<ApiResponse<SignInToken>> {
    const token = await clerkClient.signInTokens.createSignInToken({
      userId,
      expiresInSeconds: 60 * 60 * 24 * 30,
    });

    return {
      data: token,
    };
  }
}
