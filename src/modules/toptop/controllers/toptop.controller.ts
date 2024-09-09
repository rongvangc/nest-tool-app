import { Controller, Get } from '@nestjs/common';
import { UserToken, UserTokenType } from 'src/decorators/user.decorator';
import { ToptopService } from '../services/toptop.service';
import { ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Controller('toptop')
export class ToptopController {
  constructor(private toptopService: ToptopService) {}

  @Get('start')
  async getLiveComments(
    @UserToken() user: UserTokenType,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log(client.id);
    // return this.toptopService.getLiveComments(user?.id);
  }
}
