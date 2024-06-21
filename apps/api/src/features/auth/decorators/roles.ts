import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RolesEnum } from '@/users/enums/roles.enum';

import { ActiveUserGuard } from '../guards/active-user.guard';
import { RoleGuard } from '../guards/role.guard';

export function Roles(...roles: RolesEnum[]) {
  SetMetadata('roles', roles);
  return applyDecorators(
    UseGuards(AuthGuard('jwt'), ActiveUserGuard, RoleGuard),
  );
}
