import { User as ClerkUser, SignInToken } from '@clerk/clerk-sdk-node';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from 'src/common/types';
import { UserToken, UserTokenType } from 'src/decorators/user.decorator';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getCurrentUser(@UserToken() user: UserTokenType): Promise<ClerkUser> {
    return this.userService.getCurrentUser(user.id);
  }

  @Get('get-clerk-token/:id')
  async getClerkToken(
    @Param('id') id: string,
  ): Promise<ApiResponse<SignInToken>> {
    return this.userService.getClerkToken({ userId: id });
  }
}
