// biome-ignore lint/style/useImportType: use constant
import { ROLES } from '../constants';

export interface Business {
	id: string;
	name: string;
	logo: string;
}

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	isActive: boolean;
	business?: Business;
	roles: string[];
}

export type RoleType = (typeof ROLES)[keyof typeof ROLES];
