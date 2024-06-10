import { Controller, Post, Body } from '@nestjs/common';
import { LiveService } from '../services/live.service';

import { LiveSessionEndDto, LiveSessionStartDto } from '../dto/live.dtos';
import { ApiResponse } from 'src/common/types';
import { LiveSessionResponse } from '../interfaces/live.interface';

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @Post('start')
  createLiveSession(
    @Body() liveSessionData: LiveSessionStartDto,
  ): Promise<ApiResponse<LiveSessionResponse>> {
    return this.liveService.createLiveSession(liveSessionData);
  }

  @Post('stop')
  async stopLiveSession(
    @Body() liveSessionData: LiveSessionEndDto,
  ): Promise<ApiResponse<LiveSessionResponse>> {
    return this.liveService.stopLiveSession(liveSessionData);
  }
}
