import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudConfigModule } from './configs/cloud-config.module';
import { CloudConfigService } from './configs/cloud-config.service';
import configuration from './configs/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { jwtConstants } from './modules/auth/constants/jwtConstants';
import { RedisCacheModule } from './modules/cache/cache.module';
import { CacheConfigService } from './modules/cache/services/cache-config.service';
import { CommentModule } from './modules/comment/comment.module';
import { SocketIOModule } from './modules/events/socket-io.module';
import { LiveModule } from './modules/live/live.module';
import { ToptopModule } from './modules/toptop/toptop.module';
import { UserModule } from './modules/users/user.module';
import { VaultSecretNames } from './modules/vault/interfaces/vault.interface';
import { VaultConfigService } from './modules/vault/services/vault.service';
import { VaultConfigModule } from './modules/vault/vault.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [VaultConfigModule],
      useClass: CacheConfigService,
      inject: [VaultConfigService],
    }),
    PassportModule.register({ session: true }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forRootAsync({
      imports: [CloudConfigModule],
      useFactory: async (cloudConfigService: CloudConfigService) => ({
        uri: (await cloudConfigService.getConfig(VaultSecretNames.MONGODB_URI))
          ?.version?.value,
      }),
      inject: [CloudConfigService],
    }),
    SocketIOModule,
    AuthModule,
    UserModule,
    SocketIOModule,
    ToptopModule,
    CommentModule,
    LiveModule,
    RedisCacheModule,
    CloudConfigModule,
    VaultConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
