import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VaultConfigService } from './services/vault.service';

@Module({
  imports: [ConfigModule],
  providers: [VaultConfigService],
  exports: [VaultConfigService],
})
export class VaultConfigModule {}
