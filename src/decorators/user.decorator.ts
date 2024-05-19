import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/modules/auth/constants/jwtConstants';

export type UserTokenType = {
  _id: string;
  email: string;
  displayName: string;
};

export const UserToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const decodedToken = jwtService.verify(token, {
        secret: jwtConstants.secret,
      });

      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  },
);

function extractTokenFromRequest(request: any): string | null {
  const authHeader = request.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7); // Remove 'Bearer ' prefix
  }
  return null;
}

const jwtService = new JwtService(/* jwtService options here */);
