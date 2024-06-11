import { StopLiveDto } from './../dtos/toptop.dtos';
import { Body, Controller, Get } from '@nestjs/common';
import { UserToken, UserTokenType } from 'src/decorators/user.decorator';
import { ToptopDto } from '../dtos/toptop.dtos';
import { ToptopService } from '../services/toptop.service';

@Controller('toptop')
export class ToptopController {
  constructor(private toptopService: ToptopService) {}

  @Get('/start-live-comments')
  async getLiveComments(
    @Body() toptopData: ToptopDto,
    @UserToken() user: UserTokenType,
  ): Promise<void> {
    return this.toptopService.getLiveComments(
      user?._id,
      toptopData?.idUserLive,
    );
  }

  @Get('/stop-live-comments')
  async stopLiveComments(
    @Body() toptopData: StopLiveDto,
    @UserToken() user: UserTokenType,
  ): Promise<void> {
    const { idUserLive, sessionId } = toptopData;
    return this.toptopService.stopLiveComments(
      user?._id,
      idUserLive,
      sessionId,
    );
  }
}
