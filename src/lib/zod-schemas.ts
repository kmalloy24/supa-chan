// THIS FILE DEFINES GLOBAL ZOD SCHEMAS
import { z } from 'zod';

// prettier-ignore
export const postSchema = z.object({
	content: z.string()
			.max(140, 'Must be 140 characters or less')
			.min(1, 'Cannot be empty'),
});
