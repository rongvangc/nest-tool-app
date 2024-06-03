import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from 'src/common/types';
import { UserToken, UserTokenType } from 'src/decorators/user.decorator';
import { GetUserResponse } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { User as ClerkUser } from '@clerk/clerk-sdk-node';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('currentUser')
  async getUser(
    @UserToken() user: UserTokenType,
  ): Promise<ApiResponse<GetUserResponse>> {
    return this.userService.getUser(user?._id);
  }

  // This is for Admin
  @Get(':id')
  async getAllUser(@Param('id') id: string): Promise<ClerkUser> {
    return this.userService.getCurrentUser(id);
  }
}
