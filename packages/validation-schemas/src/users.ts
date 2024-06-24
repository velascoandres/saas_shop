import { z } from 'zod';

export const createUserSchema = z
	.object({
		email: z.string().email(),
		firstname: z.string(),
		lastname: z.string(),
		picture: z.string().optional(),
	})
	.required();

export const updateUserSchema = createUserSchema.partial();

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
