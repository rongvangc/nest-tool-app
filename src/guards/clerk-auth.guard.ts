import { clerkClient } from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { VaultConfigService } from 'src/modules/vault/services/vault.service';
import { RedisCacheService } from 'src/modules/cache/services/cache.service';
import { CloudConfigService } from 'src/configs/cloud-config.service';
import { VaultSecretNames } from 'src/modules/vault/interfaces/vault.interface';

@Injectable()
export class ClerkAuth implements CanActivate {
  constructor(
    private reflector: Reflector,
    private cloudConfigService: CloudConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('------token', token);

    try {
      const payload = await clerkClient.verifyToken(token, {
        secretKey: (
          await this.cloudConfigService.getConfig(
            VaultSecretNames.CLERK_SECRET_KEY,
          )
        )?.version?.value,
        clockSkewInMs: 10000,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
