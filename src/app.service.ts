import { Injectable, OnModuleInit, UseInterceptors } from '@nestjs/common';
import { VaultConfigService } from './modules/vault/services/vault.service';
import { HttpCacheInterceptor } from './interceptors.ts/http-cache.interceptor';
import { CacheKey } from '@nestjs/cache-manager';
import { RedisCacheService } from './modules/cache/services/cache.service';
import { CacheAppKey } from './common/cache-key';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private vaultConfigService: VaultConfigService,
    private redisCacheService: RedisCacheService,
  ) {}

  @CacheKey(CacheAppKey.VAULT_CONFIG)
  @UseInterceptors(HttpCacheInterceptor)
  async onModuleInit() {
    const secrets = await this.redisCacheService.getCachedData(
      CacheAppKey.VAULT_CONFIG,
      async () => await this.vaultConfigService.readSecrets(),
    );
    // console.log('[SECRETS FROM VAULT]:', secrets);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
