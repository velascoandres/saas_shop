import { UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { ActiveUserGuard } from '../guards/active-user.guard'

export function AccountVerified() {
  return applyDecorators(UseGuards(AuthGuard('jwt'), ActiveUserGuard))
}
