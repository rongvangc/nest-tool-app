import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocketIOGateway } from 'src/modules/events/socket-io.gateway';
import { Toptop, ToptopModelDocument } from '../models/toptop.model';

@Injectable()
export class ToptopService {
  constructor(
    @InjectModel(Toptop.name) private toptopModel: Model<ToptopModelDocument>,
    private readonly socketIOGateway: SocketIOGateway,
  ) {}

  async getLiveComments(id: string, idUserLive: string): Promise<void> {
    return this.socketIOGateway.onGetLiveTiktokComments({
      userId: id,
      idUserLive,
    });
  }

  async stopLiveComments(id: string, idUserLive: string): Promise<void> {
    return this.socketIOGateway.disconnectGetLiveTiktok({
      userId: id,
      idUserLive,
    });
  }
}
