import { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { LiveSession, LiveSessionModelDocument } from './models/live.model';
import { Model } from 'mongoose';
import { GeneralStatus } from 'src/common/types';

@Injectable()
export class LiveService {
  @InjectModel(LiveSession.name)
  private liveSessionModel: Model<LiveSessionModelDocument>;

  async saveLiveSession(idUserLive: string, startTime: Date): Promise<any> {
    const id = uuidv4();
    const liveSession = new this.liveSessionModel({
      sessionId: id,
      idUserLive,
      startTime,
    });
    await liveSession.save();
    return {
      data: {
        status: GeneralStatus.Success,
        id: id,
      },
    };
  }

  async stopLiveSession(
    idUserLive: string,
    sessionId: UUID,
    stopTime: Date,
  ): Promise<any> {
    const currentLiveSession = await this.liveSessionModel.findOne({
      idUserLive,
      sessionId,
    });
    console.log(currentLiveSession);
    if (currentLiveSession) {
      await this.liveSessionModel.updateOne(
        { sessionId },
        { $set: { stopTime: stopTime } },
      );
      return;
    } else {
      return {
        data: {
          status: GeneralStatus.Fail,
        },
      };
    }
  }

  async addBillToSession(sessionId: UUID, bill: any): Promise<any> {
    await this.liveSessionModel.updateOne(
      { sessionId: sessionId },
      { $push: { bills: bill } },
    );

    return {
      data: {
        status: GeneralStatus.Success,
      },
    };
  }

  async getLiveSession(idUserLive: string) {
    const liveSession = await this.liveSessionModel.find({ idUserLive });

    return {
      data: {
        status: GeneralStatus.Success,
        liveSession,
      },
    };
  }
}
