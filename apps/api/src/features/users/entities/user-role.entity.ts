import { BaseEntity } from '@/utils/base-entity';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { Role } from './role.entity';
import { User } from './user.entity';

@Unique({ properties: ['user', 'role'] })
@Entity()
export class UserRole extends BaseEntity {
  @ManyToOne()
  user: User;

  @ManyToOne()
  role: Role;
}
