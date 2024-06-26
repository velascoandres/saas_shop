import { Injectable } from '@nestjs/common';

import { UsersService } from '@/users/services/users.service';

import { User } from '@/users/entities/user.entity';
import { ClerkAuthService } from './clerk-auth.service';
import type { AuthUser, OAuthProfile } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly clerkAuthService: ClerkAuthService,
  ) {}

  async createOrUpdateUser(sub: string): Promise<AuthUser> {
    const { user: userData } = await this.clerkAuthService.getUserInfo(sub);

    const profile: OAuthProfile = {
      email: userData.email,
      fullName: userData.fullName,
      picture: userData.pictureUrl,
      provider: 'oauth',
      providerId: sub,
    };

    const user = await this.userService.findUserByEmail(profile.email);
    const [firstname, lastname] = profile.fullName.trim().split(' ');

    if (!user) {
      const newUser = await this.userService.createUser({
        email: profile.email,
        firstname,
        lastname,
        picture: profile.picture,
      });

      return this.getAuthUser(newUser);
    }

    return this.getAuthUser(user);
  }

  private async getAuthUser(user: User): Promise<AuthUser> {
    const userRoles = await this.userService.getUserRoles(user.id);

    return {
      ...user,
      roles: userRoles.map((role) => role.name),
    };
  }
}
