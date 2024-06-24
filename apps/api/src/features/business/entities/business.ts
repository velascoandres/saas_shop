import { User } from '@/users/entities/user.entity'
import { BaseUUIEntity } from '@/utils/base-entity'
import { Entity, OneToOne, Property, t } from '@mikro-orm/core'

@Entity()
export class Business extends BaseUUIEntity {
  @Property({ type: t.text })
  name!: string
  @Property({ type: t.text })
  description = ''
  @Property({ type: t.text, nullable: true })
  logo?: string

  @OneToOne(
    () => User,
    (user) => user.business,
    { orphanRemoval: true },
  )
  owner!: User
}
