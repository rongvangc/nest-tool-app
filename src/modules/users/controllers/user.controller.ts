import { SignInToken } from '@clerk/clerk-sdk-node';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from 'src/common/types';
import { UserToken, UserTokenType } from 'src/decorators/user.decorator';
import { UserService } from '../services/user.service';
import {
  GetUserResponse,
  UpdateTiktokIDResponse,
} from '../interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getCurrentUser(
    @UserToken() user: UserTokenType,
  ): Promise<ApiResponse<GetUserResponse>> {
    return this.userService.getCurrentUser(user.id);
  }

  @Post('update-tiktok-live-id')
  async updateTiktokLiveID(
    @UserToken() user: UserTokenType,
    @Body() { tiktokLiveID },
  ): Promise<ApiResponse<UpdateTiktokIDResponse>> {
    return this.userService.updateTiktokLiveID({ id: user?.id, tiktokLiveID });
  }

  @Get('get-clerk-token/:id')
  async getClerkToken(
    @Param('id') id: string,
  ): Promise<ApiResponse<SignInToken>> {
    return this.userService.getClerkToken({ userId: id });
  }
}
