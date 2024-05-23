import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from 'src/common/types';
import { UserToken, UserTokenType } from 'src/decorators/user.decorator';
import { GetUserResponse } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(
    @UserToken() user: UserTokenType,
  ): Promise<ApiResponse<GetUserResponse>> {
    return this.userService.getUser(user?._id);
  }
}
