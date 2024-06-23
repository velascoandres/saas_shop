import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'
import { CreateUserDTO } from '../dtos/create-user.dto'
import { UpdateUserDTO } from '../dtos/update-user.dto'
import { Role } from '../entities/role.entity'
import { UserRole } from '../entities/user-role.entity'
import { User } from '../entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: EntityRepository<UserRole>,
  ) {}

  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    return this.userRepository.create({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
    })
  }

  countUsers(): Promise<number> {
    return this.userRepository.count()
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email: email.toLowerCase() })
  }

  findUserById(userId: number): Promise<User | null> {
    return this.userRepository.findOne({ id: userId })
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    await this.userRepository.nativeUpdate({ id }, updateUserDTO)

    return this.userRepository.findOne({ id })
  }

  async getUserRoles(
    userId: string,
  ): Promise<Omit<Role, 'createdAt' | 'updatedAt' | 'userRoles'>[]> {
    const qb = this.userRoleRepository
      .createQueryBuilder('userRole')
      .select('*')
      .innerJoinAndSelect('userRole.role', 'role')
      .where({ user: { id: userId } })

    const userRoles = await qb.getResultList()

    return userRoles.map((userRole) => ({
      id: userRole.role.id,
      name: userRole.role.name,
    }))
  }
}
