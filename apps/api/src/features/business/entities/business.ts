import { BusinessContact } from '@/business/entities/business-contact';
import { UserRole } from '@/users/entities/user-role.entity';
import { User } from '@/users/entities/user.entity';
import { BaseUUIEntity } from '@/utils/base-entity';
import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Property,
  t,
} from '@mikro-orm/core';

@Entity()
export class Business extends BaseUUIEntity {
  @Property({ type: t.text })
  name!: string;
  @Property({ type: t.text })
  description = '';
  @Property({ type: t.text, nullable: true })
  logo?: string;

  @OneToOne(
    () => User,
    (user) => user.business,
    { orphanRemoval: true },
  )
  owner!: User;

  @OneToMany(
    () => BusinessContact,
    (bc) => bc.business,
  )
  contacts = new Collection<UserRole>(this);
}
