import { ROLES } from '../constants'

export type RoleType = (typeof ROLES)[keyof typeof ROLES]
