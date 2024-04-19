<script lang="ts">
	// IMPORTS
	// skeleton
	import { ConicGradient, getToastStore } from '@skeletonlabs/skeleton';
	import type { ConicStop, ToastSettings } from '@skeletonlabs/skeleton';
	// local components
	import GradientText from '$lib/components/GradientText.svelte';
	// svelte
	import { onMount, onDestroy } from 'svelte';
	// timestamp helpers
	import { fromUnixTime, formatDistanceToNow } from 'date-fns';
	// superforms
	import { superForm } from 'sveltekit-superforms/client';

	// VARIABLES
	let posts: any = [];
	let channel: any;
	let loading = true;

	// PAGE DATA
	export let data;

	// DATA FETCHING
	// load sb data and session
	$: ({ session, supabase } = data);

	// fetch posts
	async function fetchPosts() {
		const { data, error } = await supabase
			.from('posts')
			.select('*')
			.order('created_at', { ascending: false })
			.range(0, 999); //replace with infinite scroll
		if (error) {
			console.error('Error fetching posts:', error);
		} else {
			posts = data;
		}
		loading = false;
	}

	// realtime subscription
	function subscribeToPostsChanges() {
		channel = supabase
			.channel('posts-changes')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'posts'
				},
				(payload) => {
					console.log('Change received!', payload);
					if (payload.eventType === 'INSERT') {
						posts = [payload.new, ...posts];
						// show new message toast when any user posts
						toastStore.trigger(success);
					} else if (payload.eventType === 'UPDATE') {
						posts = posts.map((post: any) => (post.id === payload.new.id ? payload.new : post));
					} else if (payload.eventType === 'DELETE') {
						posts = posts.filter((post: any) => post.id !== payload.old.id);
					}
				}
			)
			.subscribe();
	}

	//LIFECYCLE
	onMount(async () => {
		loading = true;
		await fetchPosts();
		subscribeToPostsChanges();
	});

	onDestroy(() => {
		if (channel) {
			supabase.removeChannel(channel);
		}
	});

	// UI
	// loading spinner
	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];

	// formatting helpers
	function trimUserId(userId: string): string {
		return userId.slice(-5);
	}

	function timeSince(timestamp: string): string {
		const date = fromUnixTime(Date.parse(timestamp) / 1000);
		return formatDistanceToNow(date, { addSuffix: true });
	}

	// toasts
	const toastStore = getToastStore();

	const success: ToastSettings = {
		message: '📨 New post!',
		background: 'variant-filled-primary',
		hideDismiss: true,
		timeout: 2000 // ms -> 5 sec
	};

	const error: ToastSettings = {
		message: '⚠️ Error',
		background: 'variant-filled-error',
		hideDismiss: true,
		timeout: 2000 // ms -> 5 sec
	};

	const failure: ToastSettings = {
		message: '🤔 ...something went wrong',
		background: 'variant-filled-error',
		hideDismiss: true,
		timeout: 2000 // ms -> 5 sec
	};

	//FORMS
	const { form, errors, enhance } = superForm(data.form, {
		onResult: ({ result }) => {
			switch (result.type) {
				case 'error':
					toastStore.trigger(error);
					break;
				case 'failure':
					toastStore.trigger(failure);
					break;
				default:
					return;
			}
			return;
		}
	});
</script>

<!-- CREATE POSTS -->
<div class="container mx-auto flex justify-center items-center my-8">
	<div class="space-y-10 text-center flex flex-col items-center">
		<!-- heading -->
		<h1 class="h1 font-bold text-primary-500">/s</h1>
		<!-- user ID -->
		<span class="text-xl"
			>Your user ID is <p class="text-4xl font-bold ml-2">
				<GradientText
					>{session?.user?.id ? trimUserId(session.user.id) : 'Not logged in'}</GradientText
				>
			</p></span
		>
		<!-- post text form -->
		<form method="POST" use:enhance>
			<span class="flex justify-start mb-2 text-lg">Write a post!</span>
			<span class="flex gap-x-2">
				<label class="label" for="content">
					<textarea
						name="content"
						bind:value={$form.content}
						class="textarea md:w-96 w-72"
						rows="2"
						placeholder="140 characters max."
					/>
				</label>

				<button type="submit" class="btn h-16 variant-ghost-primary hover:variant-filled-primary"
					><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M20 4v9a4 4 0 0 1-4 4H6.914l2.5 2.5L8 20.914L3.086 16L8 11.086L9.414 12.5l-2.5 2.5H16a2 2 0 0 0 2-2V4z"
						/></svg
					>
				</button>
			</span>
			{#if $errors.content}
				<span class="block text-error-500">{$errors.content}</span>
			{/if}
		</form>
	</div>
</div>

<hr class="!border-t-2 !border-primary-500 mx-24" />

<!-- VIEW POSTS -->
<div class="mx-auto my-8 gap-y-8 flex flex-col">
	<!-- loading spinner -->
	{#if loading}
		<ConicGradient stops={conicStops} spin width="w-12"></ConicGradient>
	{:else}
		<!-- post cards -->
		{#each posts as post (post.id)}
			<div class="card mx-4">
				<header class="card-header text-gray-500">
					{timeSince(post.created_at)}
				</header>
				<section class="p-4">
					{post.content}
				</section>
				<footer class="card-footer flex justify-end">
					{#if session && post.user_id == session.user.id}
						<p class="text-xl font-bold">
							<GradientText>{trimUserId(post.user_id)}</GradientText>
						</p>
					{:else}
						<p class="text-primary-500 text-xl">{trimUserId(post.user_id)}</p>
					{/if}
				</footer>
			</div>
		{/each}
	{/if}
</div>
