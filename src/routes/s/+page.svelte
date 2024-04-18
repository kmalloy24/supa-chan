<script lang="ts">
	import GradientText from '$lib/components/GradientText.svelte';
	import { onMount, onDestroy } from 'svelte';

	export let data;
	$: ({ session, supabase } = data);

	let posts = [];
	let channel;

	async function fetchPosts() {
		const { data, error } = await supabase.from('posts').select('*');

		if (error) {
			console.error('Error fetching posts:', error);
		} else {
			posts = data;
		}
	}

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
						posts = [...posts, payload.new];
					} else if (payload.eventType === 'UPDATE') {
						posts = posts.map((post) => (post.id === payload.new.id ? payload.new : post));
					} else if (payload.eventType === 'DELETE') {
						posts = posts.filter((post) => post.id !== payload.old.id);
					}
				}
			)
			.subscribe();
	}

	onMount(async () => {
		await fetchPosts();
		subscribeToPostsChanges();
	});

	onDestroy(() => {
		if (channel) {
			supabase.removeChannel(channel);
		}
	});

	// HELPERS
	function trimUserId(userId: string): string {
		return userId.slice(-5);
	}

	function timeSince(timestamp: string): string {
		const now = new Date();
		const inputDate = new Date(timestamp);

		const seconds = Math.floor((inputDate.getTime() - now.getTime()) / 1000);

		const intervals = [
			{ label: 'year', seconds: 31536000 },
			{ label: 'month', seconds: 2592000 },
			{ label: 'week', seconds: 604800 },
			{ label: 'day', seconds: 86400 },
			{ label: 'hour', seconds: 3600 },
			{ label: 'minute', seconds: 60 },
			{ label: 'second', seconds: 1 }
		];

		if (seconds < 0) {
			return 'just now';
		}

		for (const { label, seconds: intervalSeconds } of intervals) {
			const interval = Math.floor(seconds / intervalSeconds);
			if (interval >= 1) {
				return `in ${interval} ${label}${interval === 1 ? '' : 's'}`;
			}
		}

		return 'just now';
	}
</script>

<div class="container mx-auto flex justify-center items-center my-8">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h1 class="h1 font-bold text-primary-500">/s</h1>

		<span class="text-xl"
			>Your user ID is <p class="text-4xl font-bold ml-2">
				<GradientText>{trimUserId(session.user.id)}</GradientText>
			</p></span
		>
		<form>
			<span class="flex justify-between">
				<textarea class="textarea w-96" rows="2" placeholder="Enter some long form content." />
				<button type="submit" class="btn variant-ghost-primary hover:variant-filled-primary"
					><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M20 4v9a4 4 0 0 1-4 4H6.914l2.5 2.5L8 20.914L3.086 16L8 11.086L9.414 12.5l-2.5 2.5H16a2 2 0 0 0 2-2V4z"
						/></svg
					>
				</button>
			</span>
		</form>
	</div>
</div>

<hr class="!border-t-2 !border-primary-500 mx-24" />

<div class="mx-auto my-8 gap-y-8 flex flex-col">
	{#each posts as post (post.id)}
		<div class="card mx-4">
			<header class="card-header text-gray-500">
				{timeSince(post.created_at)}
			</header>
			<section class="p-4">
				{post.content}
			</section>
			<footer class="card-footer flex justify-end">
				<p class="text-2xl font-bold">
					<GradientText>{trimUserId(post.user_id)}</GradientText>
				</p>
			</footer>
		</div>
	{/each}
</div>
