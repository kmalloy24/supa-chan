<script lang="ts">
	import GradientText from '$lib/components/GradientText.svelte';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h1 class="h1 font-bold"><GradientText>SUPAchan</GradientText></h1>
		<img src="/supa-chan.png" alt="logo" class="w-24" />

		<p>
			Log in with Supabase Auth as <a
				class="anchor"
				href="https://supabase.com/docs/guides/auth/auth-anonymous">an anonymous user</a
			> to create and view posts in realtime.
		</p>
		<button class="btn variant-outline-primary hover:variant-filled-primary">Log in as anon</button>
	</div>
</div>
