import { clerkClient } from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CloudConfigService } from 'src/configs/cloud-config.service';
import { VaultSecretNames } from 'src/modules/vault/interfaces/vault.interface';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ClerkConfigService } from 'src/modules/clerk/services/clerk.service';

@Injectable()
export class ClerkAuth implements CanActivate {
  constructor(
    private reflector: Reflector,
    private cloudConfigService: CloudConfigService,
    private clerkConfigService: ClerkConfigService,
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

    try {
      const payload = await clerkClient.verifyToken(token, {
        secretKey: (
          await this.cloudConfigService.getConfig(
            VaultSecretNames.CLERK_SECRET_KEY,
          )
        )?.version?.value,
        clockSkewInMs: 10000,
      });

      console.log('------payload', payload);

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      request['clerk'] = this.clerkConfigService.getClerkClient();
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
