import { AuthUser } from '@/auth/types';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as AuthUser;
});
