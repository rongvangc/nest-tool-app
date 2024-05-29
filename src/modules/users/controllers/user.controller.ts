import { PaginatedResourceResponse } from './../../../../node_modules/@clerk/backend/dist/api/resources/Deserializer.d';
import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from 'src/common/types';
import { UserToken, UserTokenType } from 'src/decorators/user.decorator';
import { GetUserResponse } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { User } from '@clerk/clerk-sdk-node';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('currentUser')
  async getUser(
    @UserToken() user: UserTokenType,
  ): Promise<ApiResponse<GetUserResponse>> {
    return this.userService.getUser(user?._id);
  }

  @Get()
  async getAllUser(): Promise<PaginatedResourceResponse<User[]>> {
    return this.userService.getAllUser();
  }
}
