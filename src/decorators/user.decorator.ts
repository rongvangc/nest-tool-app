import { ClerkClient, User } from '@clerk/clerk-sdk-node';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export type UserTokenType = User;

export const UserToken = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    const user = request['user'];
    const clerkClient: ClerkClient = request['clerk'];

    try {
      const userInfo = await clerkClient.users.getUser(user?.sub);

      return userInfo;
    } catch (error) {
      console.error('[Clerk Error: getUserInfo]', error);
      throw new UnauthorizedException(error ?? 'Invalid token');
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
