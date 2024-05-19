import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/common/types';
import { User, UserModelDocument } from 'src/modules/users/models/user.model';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { AuthCreateDto, AuthLoginDto } from '../dtos/auth.dtos';
import {
  CreateUserResponse,
  SigninResponse,
} from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModelDocument>,
    private jwtService: JwtService,
  ) {}

  async create({
    email,
    password,
    displayName,
    photoURL,
  }: AuthCreateDto): Promise<ApiResponse<CreateUserResponse>> {
    const existingUser = await this.userModel.findOne({ email }).exec();

    if (existingUser) {
      throw new ConflictException(
        'User exited, please using another email to register',
      );
    }

    const hash = encodePassword(password);

    const createUser = new this.userModel({
      email,
      hash,
      displayName,
      photoURL,
    });

    await createUser.save();

    return {
      data: {
        message: 'create user success',
      },
    };
  }

  async signIn({
    email,
    password,
  }: AuthLoginDto): Promise<ApiResponse<SigninResponse>> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException(`Can't find user`, HttpStatus.NOT_FOUND);
    }

    const isMatchPassword = comparePassword(password, user.hash);

    if (!isMatchPassword) {
      throw new UnauthorizedException();
    }

    const payload = {
      _id: user.id,
      email: user.email,
      displayName: user.displayName,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      data: {
        _id: user.id,
        access_token,
      },
    };
  }
}
