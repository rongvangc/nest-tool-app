import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse, GeneralStatus } from 'src/common/types';
import { ClerkConfigService } from 'src/modules/clerk/services/clerk.service';
import {
  GetUserResponse,
  UpdateTiktokIDResponse,
} from '../interfaces/user.interface';
import { User, UserModelDocument } from '../models/user.model';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModelDocument>,
    private clerkConfigService: ClerkConfigService,
  ) {}

  async getCurrentUser(id: string): Promise<ApiResponse<GetUserResponse>> {
    const userList = await this.clerkConfigService
      .getClerkClient()
      .users.getUser(id);

    const existingUser = await this.userModel
      .findOne({ clerkUserId: id })
      .exec();

    if (!existingUser) {
      const createUser = new this.userModel({
        clerkUserId: id,
        tiktokLiveID: '',
      });

      await createUser.save();
    }

    return {
      data: {
        ...userList,
        clerkUserId: id,
        tiktokLiveID: existingUser?.tiktokLiveID ?? '',
        primaryEmailAddress: userList.primaryEmailAddress,
        primaryPhoneNumber: userList.primaryPhoneNumber,
        primaryWeb3Wallet: userList.primaryWeb3Wallet,
        fullName: userList.fullName,
      },
    };
  }

  async updateTiktokLiveID({
    id,
    tiktokLiveID,
  }: {
    id: string;
    tiktokLiveID: string;
  }): Promise<ApiResponse<UpdateTiktokIDResponse>> {
    const existingUser = await this.userModel.findOneAndUpdate(
      { clerkUserId: id },
      {
        tiktokLiveID,
      },
      { runOnce: true, new: true },
    );

    if (!existingUser) {
      return {
        data: {
          status: GeneralStatus.Success,
        },
      };
    }

    return {
      data: {
        status: GeneralStatus.Success,
      },
    };
  }
}
