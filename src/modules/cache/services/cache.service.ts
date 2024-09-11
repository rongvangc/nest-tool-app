import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Retrieves a cached value for the given key. If the value is not cached, calls
   * the provided function to retrieve the value and caches the result.
   *
   * @param key The key to retrieve from the cache
   * @param apiCall A function that returns a promise of the value to cache.
   * @returns A promise that resolves to the cached or retrieved value.
   */
  async getCachedData<T>(key: string, apiCall: () => Promise<T>): Promise<T> {
    // Check if the value is cached
    const cachedValue = await this.cacheManager.get<T>(key);
    if (cachedValue) {
      // The value is cached, return it
      return cachedValue;
    }

    // The value is not cached, call the API to retrieve it
    const newValue = await apiCall();

    // Cache the retrieved value
    await this.cacheManager.set(key, newValue);

    // Return the retrieved value
    return newValue;
  }

  /**
   * Clear all cached values
   * @returns {Promise<void>} A promise that resolves when the cache is cleared
   */
  async clearAllCache(): Promise<void> {
    // Reset the cache manager
    await this.cacheManager.reset();
  }
}
