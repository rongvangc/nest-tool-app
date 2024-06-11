import { LiveService } from './../live.service';

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UUID } from 'crypto';

@Controller('live')
export class LiveController {
  constructor(private liveService: LiveService) {}

  @Post(':sessionId')
  async addBillToSession(
    @Param('sessionId') sessionId: UUID,
    @Body() bill: any,
  ) {
    return this.liveService.addBillToSession(sessionId, bill);
  }

  @Get(':idUserLive')
  async getLiveSession(@Param('idUserLive') idUserLive: string): Promise<any> {
    return this.liveService.getLiveSession(idUserLive);
  }
}
