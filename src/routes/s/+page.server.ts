// IMPORTS
// Svelte
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
// Superforms
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
// Zod Schema
import { postSchema } from '$lib/zod-schemas';

// LOAD FUNCTION
export const load: PageServerLoad = async (event) => {
	return {
		form: await superValidate(zod(postSchema))
	};
};

// FORM ACTIONS
export const actions: Actions = {
	default: async (event) => {
		const session = await event.locals.safeGetSession();
		if (!session) {
			error(401, 'Unauthorized');
		}

		const form = await superValidate(event, zod(postSchema));
		//client error handling
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// prettier-ignore
		const { data: newPost, error: newPostError } = await event.locals.supabase
		.from('posts')
		.insert({
			...form.data,
			user_id: session.user.id
		})
		.single();

		if (newPostError) {
			console.error('Error creating post:', newPostError);
			return message(form, 'Error creating post.');
		}

		console.log('New post created:', newPost);
	}
};
