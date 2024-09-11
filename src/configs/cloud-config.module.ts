import { Module } from '@nestjs/common';
import { CloudConfigService } from './cloud-config.service';
import { RedisCacheModule } from 'src/modules/cache/cache.module';
import { VaultConfigModule } from 'src/modules/vault/vault.module';

@Module({
  imports: [RedisCacheModule, VaultConfigModule],
  providers: [CloudConfigService],
  exports: [CloudConfigService],
})
export class CloudConfigModule {}
