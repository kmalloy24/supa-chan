// THIS FILE DEFINES GLOBAL ZOD SCHEMAS
import { z } from 'zod';

// prettier-ignore
export const postSchema = z.object({
    id: z.number(),
    created_at: z.string(),
    user_id: z.string(),
	content: z.string()
			.max(140, 'Must be 140 characters or less')
			.min(1, 'Cannot be empty'),
});
export type PostSchema = typeof postSchema;
