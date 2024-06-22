import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt.strategy';
import { EmailAvailableConstraint } from './validations/email-available';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClerkAuthService } from './clerk-auth.service';
import commonImports from './common-imports';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ...commonImports,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    EmailAvailableConstraint,
    ClerkAuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
