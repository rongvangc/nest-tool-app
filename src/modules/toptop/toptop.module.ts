import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Toptop, ToptopSchema } from './models/Toptop.model';
import { ToptopController } from './controllers/toptop.controller';
import { ToptopService } from './services/toptop.service';
import { SocketIOModule } from '../events/socket-io.module';
import { User, UserSchema } from '../users/models/user.model';

@Module({
  imports: [
    ConfigModule,
    SocketIOModule,
    MongooseModule.forFeature([{ name: Toptop.name, schema: ToptopSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [ToptopService],
  controllers: [ToptopController],
  exports: [ToptopService],
})
export class ToptopModule {}
