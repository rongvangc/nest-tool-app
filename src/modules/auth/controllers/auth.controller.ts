import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from 'src/common/types';
import { Public } from '../../../decorators/public.decorator';
import { AuthCreateDto } from '../dtos/auth.dtos';
import { CreateUserResponse } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('signin')
  // async signIn(
  //   @Body() userData: AuthLoginDto,
  // ): Promise<ApiResponse<SigninResponse>> {
  //   return this.authService.signIn(userData);
  // }O

  @Post('create')
  async create(
    @Body() userData: AuthCreateDto,
  ): Promise<ApiResponse<CreateUserResponse>> {
    return this.authService.create(userData);
  }
}
