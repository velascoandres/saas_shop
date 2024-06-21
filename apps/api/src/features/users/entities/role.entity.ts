import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { UserRole } from './user-role.entity';
import { BaseEntity } from '@/utils/base-entity';

@Entity()
export class Role extends BaseEntity {
  @Property()
  @Unique()
  name: string;

  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles = new Collection<UserRole>(this);
}
