// src/cache/cache-config.service.ts
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { VaultSecretNames } from '../../vault/interfaces/vault.interface';
import { VaultConfigService } from '../../vault/services/vault.service';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly vaultConfigService: VaultConfigService) {}

  /**
   * Creates the cache module options by retrieving the Redis configuration
   * from HashiCorp Vault.
   *
   * @returns {Promise<CacheModuleOptions>} The cache module options.
   */
  async createCacheOptions(): Promise<CacheModuleOptions> {
    // First, retrieve the secrets from HashiCorp Vault using the Redis cache service.
    const secrets = await this.vaultConfigService.readSecrets();

    // Create a function to get the value of a secret by name.
    const getSecretValue = (name: VaultSecretNames) =>
      // If the secrets are not null, find the secret with the given name
      // and return its value. If no secret is found, return an empty string.
      secrets?.find((secret) => secret.name === name)?.version?.value ?? '';

    // Retrieve the Redis configuration values from the secrets.
    const redisPassword = getSecretValue(VaultSecretNames.REDIS_PASSWORD);
    const redisUsername = getSecretValue(VaultSecretNames.REDIS_USERNAME);
    const [redisHost, redisPort] = getSecretValue(
      VaultSecretNames.REDIS_URL,
    )?.split(':');

    // Return the cache module options with the Redis configuration.
    return {
      // Make the cache global.
      isGlobal: true,
      // Use the Redis store.
      store: redisStore,
      // Set the Redis host to the value from the secret.
      host: redisHost,
      // Set the Redis port to redisPort.
      port: redisPort,
      // Set the Redis username to the value from the secret.
      username: redisUsername,
      // Set the Redis password to the value from the secret.
      password: redisPassword,
      // Set the TTL to 1 day.
      ttl: 60 * 60 * 24,
    };
  }
}
