import { BadRequestException, Injectable } from '@nestjs/common';
import { LiveSession, LiveSessionDocument } from '../models/liveSession.model';
import { LiveSessionEndDto, LiveSessionStartDto } from '../dto/live.dtos';
import { LiveSessionResponse } from '../interfaces/live.interface';
import { ApiResponse } from 'src/common/types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LiveService {
  constructor(
    @InjectModel(LiveSession.name)
    private liveSessionModel: Model<LiveSessionDocument>,
  ) {}

  async createLiveSession(
    liveSessionData: LiveSessionStartDto,
  ): Promise<ApiResponse<LiveSessionResponse>> {
    const { idLiveUser, userId } = liveSessionData;

    const currentLive = await this.liveSessionModel
      .findOne({ idLiveUser, userId, isLive: true })
      .exec();

    if (currentLive) {
      throw new BadRequestException('This user is already live');
    }

    if (!idLiveUser) {
      throw new BadRequestException('idLiveUser must be provided');
    }

    const liveSession = new this.liveSessionModel({
      idLiveUser,
      userId,
      isLive: true,
    });

    const savedata = await liveSession.save();

    return {
      data: {
        message: 'Live session start',
        data: savedata,
      },
    };
  }

  async stopLiveSession(
    liveSessionData: LiveSessionEndDto,
  ): Promise<ApiResponse<LiveSessionResponse>> {
    const { idLiveUser, userId, endTime } = liveSessionData;

    const currentLive = await this.liveSessionModel
      .findOne({ idLiveUser, userId, isLive: true })
      .exec();

    if (!currentLive) {
      throw new BadRequestException('This user is not live');
    }

    currentLive.endTime = endTime;
    currentLive.isLive = false;
    await currentLive.save();

    return {
      data: {
        message: 'Live session end',
        data: currentLive,
      },
    };
  }
}
