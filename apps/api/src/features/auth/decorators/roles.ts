import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ActiveUserGuard } from '../guards/active-user.guard';
import { RoleGuard } from '../guards/role.guard';
import { RoleType } from '../types';

export function Roles(...roles: RoleType[]) {
  SetMetadata('roles', roles);
  return applyDecorators(
    UseGuards(AuthGuard('jwt'), ActiveUserGuard, RoleGuard),
  );
}
