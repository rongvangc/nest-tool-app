import { Body, Controller, Get } from '@nestjs/common';
import { UserToken, UserTokenType } from 'src/decorators/user.decorator';
import { ToptopDto } from '../dtos/toptop.dtos';
import { ToptopService } from '../services/toptop.service';

@Controller('toptop')
export class ToptopController {
  constructor(private toptopService: ToptopService) {}

  @Get()
  async getLiveComments(
    @Body() toptopData: ToptopDto,
    @UserToken() user: UserTokenType,
  ): Promise<void> {
    return this.toptopService.getLiveComments(
      user?._id,
      toptopData?.idLiveUser,
    );
  }
}
