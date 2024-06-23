import type { Request } from 'express'
import type { AuthUser } from './auth-user'

export interface AuthRequest extends Request {
  user: AuthUser
}
