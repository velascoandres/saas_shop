import { type ClerkClient, createClerkClient } from '@clerk/clerk-sdk-node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface UserInfo {
  email: string;
  pictureUrl: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class ClerkAuthService {
  private clerkClient: ClerkClient;

  constructor(configService: ConfigService) {
    this.clerkClient = createClerkClient({
      secretKey: configService.get('CLERK_SECRET_KEY'),
    });
  }

  async getUserInfo(sub: string): Promise<{ user: UserInfo }> {
    const user = await this.clerkClient.users.getUser(sub);

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        pictureUrl: user.imageUrl,
      },
    };
  }
}
