import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/models/user.model';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { ClerkConfigModule } from '../clerk/clerk.module';

@Module({
  imports: [
    ConfigModule,
    ClerkConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
