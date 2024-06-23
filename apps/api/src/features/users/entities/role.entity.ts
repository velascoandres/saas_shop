import { BaseEntity } from '@/utils/base-entity'
import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core'
import { UserRole } from './user-role.entity'

@Entity()
export class Role extends BaseEntity {
  @Property()
  @Unique()
  name: string

  @OneToMany(
    () => UserRole,
    (userRole) => userRole.role,
  )
  userRoles = new Collection<UserRole>(this)
}
