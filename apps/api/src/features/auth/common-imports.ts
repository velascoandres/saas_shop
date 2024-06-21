import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';

export default [UsersModule, JwtModule.register({}), PassportModule];
