import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudConfigModule } from './configs/cloud-config.module';
import { CloudConfigService } from './configs/cloud-config.service';
import configuration from './configs/configuration';
import { RedisCacheModule } from './modules/cache/cache.module';
import { CacheConfigService } from './modules/cache/services/cache-config.service';
import { ClerkConfigModule } from './modules/clerk/clerk.module';
import { CommentModule } from './modules/comment/comment.module';
import { SocketIOModule } from './modules/events/socket-io.module';
import { LiveModule } from './modules/live/live.module';
import { ToptopModule } from './modules/toptop/toptop.module';
import { UserModule } from './modules/users/user.module';
import { VaultSecretNames } from './modules/vault/interfaces/vault.interface';
import { VaultConfigService } from './modules/vault/services/vault.service';
import { VaultConfigModule } from './modules/vault/vault.module';
import { LoggerModule } from 'nestjs-pino';
import { single } from 'rxjs';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            singleLine: true,
          },
        },
      },
    }),
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
    MongooseModule.forRootAsync({
      imports: [CloudConfigModule],
      useFactory: async (cloudConfigService: CloudConfigService) => ({
        uri: (await cloudConfigService.getConfig(VaultSecretNames.MONGODB_URI))
          ?.version?.value,
      }),
      inject: [CloudConfigService],
    }),
    SocketIOModule,
    UserModule,
    SocketIOModule,
    ToptopModule,
    CommentModule,
    LiveModule,
    RedisCacheModule,
    CloudConfigModule,
    VaultConfigModule,
    ClerkConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
