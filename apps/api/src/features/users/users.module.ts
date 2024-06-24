import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [MikroOrmModule.forFeature([User, UserRole, Role])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
