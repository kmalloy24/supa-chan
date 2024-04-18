<script lang="ts">
	import GradientText from '$lib/components/GradientText.svelte';
</script>

<div class="container mx-auto flex justify-center items-center my-8">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h1 class="h1 font-bold text-primary-500">/s</h1>

		<span class="flex items-center text-xl"
			>Your user ID is <p class="text-4xl font-bold">
				<GradientText>12345</GradientText>
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
	<div class="card mx-4">
		<section class="p-4">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales.
			Nullam mattis fermentum libero, non volutpat.
		</section>
		<footer class="card-footer flex justify-end">
			<p class="text-2xl font-bold">
				<GradientText>c2296</GradientText>
			</p>
		</footer>
	</div>
</div>
