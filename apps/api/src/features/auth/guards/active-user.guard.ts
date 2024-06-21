import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthRequest } from '../types/auth-request';

@Injectable()
export class ActiveUserGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: AuthRequest = context.switchToHttp().getRequest();


    if (!request.user) {
      throw new UnauthorizedException('User is not valid');
    }

    if (!request.user.isActive) {
      throw new UnauthorizedException('User is not active');
    }

    return true;
  }
}
