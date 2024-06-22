import { Entity, Index, Property, Unique } from '@mikro-orm/core';
import { BaseUUIEntity } from '@/utils/base-entity';

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

	@Property({ name: 'fullName' })
	getFullName() {
		return `${this.firstName} ${this.lastName}`;
	}
}
