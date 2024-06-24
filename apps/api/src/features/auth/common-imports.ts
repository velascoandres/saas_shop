import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConfigModule } from '@nestjs/config';

export default [JwtModule.register({}), PassportModule, ConfigModule];
