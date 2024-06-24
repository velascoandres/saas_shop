import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import type { CreateUserDto, UpdateUserDto } from '@repo/validation-schemas';
import { Role } from '../entities/role.entity';
import { UserRole } from '../entities/user-role.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: EntityRepository<UserRole>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
    });

    await this.em.persistAndFlush(user);

    return user;
  }

  countUsers(): Promise<number> {
    return this.userRepository.count();
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email: email.toLowerCase() });
  }

  findUserById(userId: number): Promise<User | null> {
    return this.userRepository.findOne({ id: userId });
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDto): Promise<User> {
    const user = this.userRepository.findOneOrFail({ id });

    wrap(user).assign({
      ...updateUserDTO,
    });

    await this.em.flush();

    return user;
  }

  async getUserRoles(
    userId: string,
  ): Promise<Omit<Role, 'createdAt' | 'updatedAt' | 'userRoles'>[]> {
    const qb = this.userRoleRepository
      .createQueryBuilder('userRole')
      .select('*')
      .innerJoinAndSelect('userRole.role', 'role')
      .where({ user: { id: userId } });

    const userRoles = await qb.getResultList();

    return userRoles.map((userRole) => ({
      id: userRole.role.id,
      name: userRole.role.name,
    }));
  }
}
