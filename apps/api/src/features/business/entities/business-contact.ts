import { BaseEntity } from '@/utils/base-entity';
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { CONTACT_TYPE, type ContactType } from '@repo/shared-const-types';
import { Business } from './business';

@Entity()
export class BusinessContact extends BaseEntity {
  @Enum(() => CONTACT_TYPE)
  type!: ContactType;

  @Property()
  value!: string;

  @ManyToOne(() => Business)
  business!: Business;
}
