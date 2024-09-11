import { Controller, Post } from '@nestjs/common';
import { Public } from '../../../decorators/public.decorator';
import { RedisCacheService } from '../services/cache.service';
@Public()
@Controller('cache')
export class CacheController {
  constructor(private redisCacheService: RedisCacheService) {}

  @Post('clear')
  async clearCache() {
    await this.redisCacheService.clearAllCache();
    return { message: 'Cache cleared successfully' };
  }
}
