import { CONTACT_TYPE } from '@repo/shared-const-types';
import { z } from 'zod';

export const createBusinessSchema = z
	.object({
		name: z.string(),
		description: z.string().nullable(),
		ownerId: z.string().uuid(),
	})
	.required();

export const updateBusinessSchema = createBusinessSchema
	.partial()
	.omit({ ownerId: true });

export const createContactSchema = z
	.object({
		value: z.string(),
		type: z.enum([
			CONTACT_TYPE.ADDRESS,
			CONTACT_TYPE.EMAIL,
			CONTACT_TYPE.PHONE,
		]),
	})
	.required();

export const updateContactSchema = createContactSchema.partial();

export const setupBusinessSchema = z.object({
	business: createBusinessSchema.omit({ ownerId: true }),
	contacts: z.array(createContactSchema),
});

export type CreateBusinessDto = z.infer<typeof createBusinessSchema>;
export type UpdateBusinessDto = z.infer<typeof updateBusinessSchema>;

export type CreateContactDto = z.infer<typeof createContactSchema>;
export type UpdateContactDto = z.infer<typeof updateContactSchema>;

export type SetupBusinessDto = z.infer<typeof setupBusinessSchema>;
