import { type User } from '@/users/entities/user.entity';

export interface AuthUser extends User {
  id: string;
  roles: string[];
}
