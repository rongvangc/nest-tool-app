import { Injectable } from '@nestjs/common';
import { CacheAppKey } from 'src/common/cache-key';
import { RedisCacheService } from 'src/modules/cache/services/cache.service';
import { VaultSecretNames } from 'src/modules/vault/interfaces/vault.interface';
import { VaultConfigService } from 'src/modules/vault/services/vault.service';

@Injectable()
export class CloudConfigService {
  constructor(
    private readonly redisCacheService: RedisCacheService,
    private readonly vaultConfigService: VaultConfigService,
  ) {}

  async getConfig(key: VaultSecretNames) {
    try {
      const secrets = await this.redisCacheService.getCachedData(
        CacheAppKey.VAULT_CONFIG,
        async () => await this.vaultConfigService.readSecrets(),
      );

      const valueBykey = secrets?.find((secret) => secret.name === key);

      return valueBykey;
    } catch (error) {
      console.error('Error fetching config:', error);
      throw new Error('Could not fetch configuration'); // Hoặc xử lý lỗi khác tùy ý
    }
  }
}
