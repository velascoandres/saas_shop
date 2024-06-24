import { Injectable } from '@nestjs/common';

import { UsersService } from '@/users/services/users.service';

import { ClerkAuthService } from './clerk-auth.service';
import type { OAuthProfile } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly clerkAuthService: ClerkAuthService,
  ) {}

  async createOrUpdateUser(sub: string) {
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
      return this.userService.createUser({
        email: profile.email,
        firstname,
        lastname,
        picture: profile.picture,
      });
    }

    return this.userService.updateUser(user.id, {
      firstname,
      lastname,
      picture: profile.picture,
    });
  }
}
