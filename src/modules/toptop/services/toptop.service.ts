import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocketIOGateway } from 'src/modules/events/socket-io.gateway';
import { UserModelDocument, User } from 'src/modules/users/models/user.model';

@Injectable()
export class ToptopService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModelDocument>,
    private readonly socketIOGateway: SocketIOGateway,
  ) {}

  // async getLiveComments(id: string): Promise<void> {
  //   const existingUser = await this.userModel
  //     .findOne({ clerkUserId: id })
  //     .exec();

  //   this.socketIOGateway.onGetLiveTiktokComments({
  //     userClerkId: id,
  //     idUserLive: existingUser?.tiktokLiveID,
  //   });
  // }

  // async stopLiveComments(id: string): Promise<void> {
  //   const userData = await this.userModel.findOne({ clerkUserId: id }).exec();

  //   this.socketIOGateway.disconnectGetLiveTiktok({
  //     userClerkId: id,
  //     idUserLive: userData?.tiktokLiveID,
  //   });
  // }
}
