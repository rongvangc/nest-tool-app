import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClerkConfigService } from './services/clerk.service';
import { CloudConfigModule } from 'src/configs/cloud-config.module';

@Module({
  imports: [ConfigModule, CloudConfigModule],
  providers: [ClerkConfigService],
  exports: [ClerkConfigService],
})
export class ClerkConfigModule {}
