export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  isActive: boolean;
  roles: string[];
}
