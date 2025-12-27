import { z } from 'zod';

export const waitlistSchema = z.object({
	email: z
		.string()
		.min(1, 'email is required')
		.email('please enter a valid email address')
		.max(254, 'email is too long')
});

export type WaitlistSchema = typeof waitlistSchema;
