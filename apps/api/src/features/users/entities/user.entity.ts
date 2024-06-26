import { Business } from '@/features/business/entities/business';
import { BaseUUIEntity } from '@/utils/base-entity';
import { Entity, Index, OneToOne, Property, Unique } from '@mikro-orm/core';

@Entity()
@Unique({ properties: ['email'] })
export class User extends BaseUUIEntity {
  @Property({ hidden: true })
  firstName!: string;

  @Property({ hidden: true })
  lastName!: string;

  @Property()
  email: string;

  @Property()
  @Index()
  isActive = true;

  @OneToOne(() => Business, { nullable: true })
  business?: Business;
}
